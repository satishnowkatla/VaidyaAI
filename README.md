# VaidyaAI

**Smart Medicine Scanner** — Identify medicines instantly by scanning medicine strips with your camera.

Built with React Native + Expo. Supports English and Telugu.

---

## Features

- **Camera Scan** — Point your camera at any medicine strip to identify it
- **Gallery Import** — Pick a medicine photo from your gallery
- **Medicine Info** — Get uses, dosage, side effects, and warnings
- **Nearby Stores** — Find pharmacies, medical stores, hospitals, and doctors via Google Maps
- **Medicine Library** — Browse 12 common medicines with full details
- **Bilingual** — Toggle between English and Telugu
- **Share** — Share medicine info with anyone

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo SDK 54 |
| Navigation | React Navigation (Bottom Tabs + Stack) |
| OCR | OCR.space API (free tier) |
| Drug Database | OpenFDA API + Local DB (25 medicines) |
| Camera | expo-camera |
| Location | expo-location |
| Language | React Context i18n (EN/Te) |

---

## Project Structure

```
VaidyaAI/
├── app/
│   └── _layout.tsx                 # Entry point
├── src/
│   ├── components/
│   │   └── MedicalDisclaimer.js    # Reusable UI components
│   ├── constants/
│   │   ├── colors.js               # All color tokens (zero hardcodes)
│   │   └── config.js               # App + API configuration
│   ├── context/
│   │   └── LanguageContext.js       # Language provider
│   ├── data/
│   │   ├── fdaSynonyms.js          # Brand name → generic mapping
│   │   ├── libraryMedicines.js     # Library screen medicine data
│   │   └── medicineDatabase.js     # 25 medicines local database
│   ├── i18n/
│   │   ├── en.js                   # English translations
│   │   └── te.js                   # Telugu translations
│   ├── navigation/
│   │   └── AppNavigator.js         # All routes
│   ├── screens/
│   │   ├── HomeScreen.js           # Dashboard with scan hero
│   │   ├── LibraryScreen.js        # Searchable medicine catalog
│   │   ├── ResultScreen.js         # Medicine detail view
│   │   ├── ScanHistoryScreen.js    # Past scans list
│   │   ├── ScanScreen.js           # Camera + OCR scanner
│   │   ├── SettingsScreen.js       # Preferences + profile
│   │   └── StoresScreen.js         # Nearby store finder
│   ├── services/
│   │   └── medicineService.js      # OCR + FDA API integration
│   └── utils/
│       └── textUtils.js            # Text processing utilities
├── .env                            # API keys (gitignored)
├── .env.example                    # Template for setup
├── SECURITY.md                     # Security policy
├── eas.json                        # EAS Build config
├── app.json                        # Expo config
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode

### Setup

1. Clone the repo
   ```bash
   git clone https://github.com/satishnowkatla/VaidyaAI.git
   cd VaidyaAI
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Get a free API key from [OCR.space](https://ocr.space/ocrapi/freeapi) and add it to `.env`:
   ```
   EXPO_PUBLIC_OCR_API_KEY=your_key_here
   ```

4. Start the app
   ```bash
   npx expo start
   ```

5. Scan the QR code with Expo Go (Android) or Camera (iOS)

---

## How It Works

1. User opens the **Scan** tab and points camera at a medicine strip
2. App captures the image and sends it to **OCR.space** for text extraction
3. Extracted text is parsed to identify the medicine name
4. App checks the **local database** (25 medicines) first
5. Falls back to **OpenFDA API** if not found locally
6. Displays full medicine info: uses, dosage, side effects, warnings

---

## Environment Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `EXPO_PUBLIC_OCR_API_KEY` | OCR.space API key | [ocr.space/ocrapi/freeapi](https://ocr.space/ocrapi/freeapi) |

---

## Building for Production

### Android
```bash
npx eas build --platform android --profile production
```

### iOS
```bash
npx eas build --platform ios --profile production
```

---

## License

Made in India
