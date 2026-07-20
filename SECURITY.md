# VaidyaAI Security Policy

## API Key Management

### Current API Keys

| Key | Service | Where Used | Free Tier Limit |
|-----|---------|------------|-----------------|
| `EXPO_PUBLIC_OCR_API_KEY` | OCR.space | `services/MedicineScanner.js` | 25,000 requests/month |

### Key Rotation Strategy

#### OCR.space API Key
1. **When to rotate:** Every 90 days or immediately if compromised
2. **How to rotate:**
   - Go to https://ocr.space/ocrapi/freeapi
   - Generate a new API key
   - Update `.env` file: `EXPO_PUBLIC_OCR_API_KEY=new_key_here`
   - Test the app to verify the new key works
   - Revoke the old key from the OCR.space dashboard
3. **If key is compromised:**
   - Revoke the old key immediately at OCR.space
   - Generate a new key
   - Update `.env` file
   - Check OCR.space dashboard for unauthorized usage

### Environment Variables

All secrets MUST be stored in `.env` (which is gitignored). Never hardcode keys in source files.

```
EXPO_PUBLIC_OCR_API_KEY=your_key_here
```

### Setup for New Developers
1. Copy `.env.example` to `.env`
2. Get your own free API key from OCR.space
3. Paste it into `.env`
4. Never commit `.env` to git

### Incident Response
If an API key is accidentally committed to git:
1. Revoke the key immediately from the provider's dashboard
2. Generate a new key
3. Update `.env` with the new key
4. Run `git filter-branch` or BFG Repo Cleaner to remove the key from git history
5. Force push the cleaned history
6. Notify all team members to pull the changes

### Medical Disclaimer
This app provides medicine information for educational purposes only. Always consult a qualified healthcare professional before making medical decisions.
