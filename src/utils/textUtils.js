export const sanitizeText = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/[<>]/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
};

export const normalizeText = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9& ]/g, " ")
    .replace(
      /\b(tablet|tablets|tab|tabs|capsule|capsules|cap|caps|syrup|suspension|injection|cream|ointment|gel|drop|drops)\b/gi,
      "",
    )
    .replace(/\b\d+(?:\.\d+)?\s*(mg|mcg|ml|g|iu)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

export const stripDosageForm = (text) =>
  text
    .replace(/[^a-z0-9& ]/gi, " ")
    .replace(/\b\d+(?:\.\d+)?\s*(mg|mcg|ml|g|iu)\b/gi, "")
    .replace(
      /\b(tablet|tablets|tab|tabs|capsule|capsules|cap|caps|syrup|suspension|injection|cream|ointment|gel|drop|drops)\b/gi,
      "",
    )
    .replace(/\s+/g, " ")
    .trim();

export const cleanText = (text) => {
  if (!text) return null;
  return text.replace(/\n/g, " ").replace(/\s+/g, " ").substring(0, 200).trim();
};

export const normalizeForFda = (medicineName, synonyms) => {
  const normalized = medicineName
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const cleaned = normalized
    .replace(/\b\d+(?:\.\d+)?\s*(mg|mcg|ml|g|iu)\b/g, "")
    .replace(
      /\b(tablet|tablets|tab|tabs|capsule|capsules|cap|caps|syrup|suspension|injection|cream|ointment|gel|drop|drops)\b/g,
      "",
    )
    .replace(/\s+/g, " ")
    .trim();

  const searchText = cleaned || normalized;
  const matchedSynonym = Object.keys(synonyms).find((key) =>
    searchText.includes(key),
  );
  if (matchedSynonym) return synonyms[matchedSynonym];

  const tokens = searchText.split(" ").filter(Boolean);
  if (tokens.length === 0) return normalized;
  if (/^[a-z]+$/.test(tokens[0])) return tokens[0];
  return tokens.slice(0, 2).join(" ");
};
