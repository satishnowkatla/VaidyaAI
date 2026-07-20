export const APP_CONFIG = {
  name: "VaidyaAI",
  version: "1.0.0",
  description: "Smart Medicine Scanner",
  madeIn: "India",
  supportEmail: "support@vaidyaai.app",
};

export const API_CONFIG = {
  ocr: {
    baseUrl: "https://api.ocr.space/parse/image",
    language: "eng",
    ocrEngine: "2",
    maxBase64Length: 900000,
  },
  fda: {
    baseUrl: "https://api.fda.gov/drug/label.json",
    limit: 1,
    maxQueries: 6,
  },
};

export const SCAN_CONFIG = {
  imageQuality: 0.3,
  imageWidth: 800,
  maxTextLength: 5000,
};
