import { API_CONFIG } from "../constants/config";
import { sanitizeText, normalizeText, stripDosageForm, normalizeForFda, cleanText } from "../utils/textUtils";
import { MEDICINE_DATABASE } from "../data/medicineDatabase";
import { FDA_SYNONYMS } from "../data/fdaSynonyms";

const OCR_API_KEY = process.env.EXPO_PUBLIC_OCR_API_KEY;

export const scanMedicineImage = async (base64Image) => {
  try {
    const compressedBase64 = base64Image.substring(
      0,
      API_CONFIG.ocr.maxBase64Length,
    );

    const formData = new FormData();
    formData.append("apikey", OCR_API_KEY);
    formData.append(
      "base64Image",
      `data:image/jpeg;base64,${compressedBase64}`,
    );
    formData.append("language", API_CONFIG.ocr.language);
    formData.append("isOverlayRequired", "false");
    formData.append("detectOrientation", "true");
    formData.append("scale", "true");
    formData.append("OCREngine", API_CONFIG.ocr.ocrEngine);

    const response = await fetch(API_CONFIG.ocr.baseUrl, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.IsErroredOnProcessing) return null;

    const text = sanitizeText(result.ParsedResults?.[0]?.ParsedText || "");
    if (!text || text.trim().length === 0) return null;

    return extractMedicineName(text);
  } catch {
    return null;
  }
};

const findKnownMedicineLine = (line) => {
  const normalizedLine = normalizeText(line);
  const keys = [
    ...new Set([...Object.keys(MEDICINE_DATABASE), ...Object.keys(FDA_SYNONYMS)]),
  ];

  for (const key of keys) {
    const normalizedKey = key.toLowerCase().trim();
    if (!normalizedKey) continue;
    if (
      normalizedLine === normalizedKey ||
      normalizedLine.startsWith(`${normalizedKey} `) ||
      normalizedLine.endsWith(` ${normalizedKey}`) ||
      normalizedLine.includes(` ${normalizedKey} `) ||
      normalizedLine.includes(`${normalizedKey} `) ||
      normalizedLine.includes(` ${normalizedKey}`)
    ) {
      return line;
    }
  }
  return null;
};

const extractMedicineName = (text) => {
  if (!text) return null;

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 2);

  for (const line of lines) {
    const known = findKnownMedicineLine(line);
    if (known) return known;
  }

  const candidatePattern =
    /([A-Za-z& ]{3,}?)\s*(\d+(?:\.\d+)?\s*(mg|mcg|ml|g|iu)|tablet|tablets|capsule|capsules|syrup|suspension|injection)/i;
  for (const line of lines) {
    const match = line.match(candidatePattern);
    if (match && match[1]) {
      const candidate = stripDosageForm(match[1]);
      if (candidate.length > 3) return candidate;
    }
  }

  let bestLine = "";
  for (const line of lines) {
    const candidate = stripDosageForm(line);
    if (
      candidate.length > bestLine.length &&
      candidate.length > 3 &&
      /[A-Za-z]/.test(candidate) &&
      !/^(batch|mfg|exp|use|store|keep|date|lot|no|tab|ml|mg|syrup|suspension|tablet|capsule)/i.test(
        candidate,
      )
    ) {
      bestLine = candidate;
    }
  }
  return bestLine || null;
};

const buildQueries = (cleanName) => {
  const tokens = cleanName.split(" ").filter(Boolean);
  const primary = tokens.join(" ");
  const firstToken = tokens[0] || cleanName;

  return [
    `openfda.generic_name:"${primary}"`,
    `openfda.brand_name:"${primary}"`,
    `openfda.substance_name:"${primary}"`,
    `openfda.generic_name:"${firstToken}"`,
    `openfda.brand_name:"${firstToken}"`,
    `openfda.substance_name:"${firstToken}"`,
  ];
};

const getDefaultMedicineInfo = (name) => ({
  name,
  uses: "Please consult a doctor for proper usage",
  dosage: "Follow doctor prescription carefully",
  sideEffects: "Consult your doctor if you experience side effects",
  warnings: "Keep out of reach of children. Store in cool dry place.",
  category: "Medicine",
});

export const searchMedicineInfo = async (medicineName) => {
  try {
    const cleanName = normalizeForFda(medicineName, FDA_SYNONYMS);

    if (MEDICINE_DATABASE[cleanName]) {
      return { ...MEDICINE_DATABASE[cleanName], name: medicineName };
    }

    const queries = buildQueries(cleanName);

    for (const query of queries) {
      try {
        const response = await fetch(
          `${API_CONFIG.fda.baseUrl}?search=${encodeURIComponent(query)}&limit=${API_CONFIG.fda.limit}`,
        );

        if (!response.ok) continue;

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          return {
            name: medicineName,
            uses:
              cleanText(result.indications_and_usage?.[0]) ||
              "Used for treatment as prescribed",
            dosage:
              cleanText(result.dosage_and_administration?.[0]) ||
              "Follow doctor prescription",
            sideEffects:
              cleanText(result.adverse_reactions?.[0]) || "Consult doctor",
            warnings:
              cleanText(result.warnings?.[0]) ||
              "Keep out of reach of children",
            category: result.product_type?.[0] || "Medicine",
          };
        }
      } catch {
        continue;
      }
    }

    return getDefaultMedicineInfo(medicineName);
  } catch {
    return getDefaultMedicineInfo(medicineName);
  }
};
