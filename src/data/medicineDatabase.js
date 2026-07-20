export const MEDICINE_DATABASE = {
  acetaminophen: {
    name: "Paracetamol 650mg",
    uses: "Relieves pain and reduces fever. Used for headaches, body aches, toothaches, and fever.",
    dosage:
      "Adults: 500-1000mg every 4-6 hours as needed. Do not exceed 4000mg per day. Children: Consult doctor.",
    sideEffects:
      "Nausea, vomiting, stomach upset, allergic reactions (rash, itching), liver damage with overdose.",
    warnings:
      "Do not take with alcohol. Avoid if you have liver disease. Keep out of reach of children.",
    category: "Analgesic and Antipyretic",
  },
  ibuprofen: {
    name: "Ibuprofen 400mg",
    uses: "Reduces pain, fever, and inflammation. Used for arthritis, menstrual cramps, headaches, and minor injuries.",
    dosage:
      "Adults: 200-400mg every 4-6 hours. Do not exceed 1200mg per day. Take with food.",
    sideEffects:
      "Stomach upset, heartburn, dizziness, allergic reactions, increased risk of heart attack or stroke.",
    warnings:
      "Avoid if you have stomach ulcers, heart disease, or kidney problems. Do not take with aspirin.",
    category: "NSAID",
  },
  aspirin: {
    name: "Aspirin 75mg",
    uses: "Prevents blood clots, reduces pain and inflammation. Used for heart attack prevention and pain relief.",
    dosage:
      "75-325mg daily for heart protection. 325-650mg every 4 hours for pain (max 4000mg/day).",
    sideEffects:
      "Stomach irritation, bleeding, allergic reactions, ringing in ears (with high doses).",
    warnings:
      "Do not use if allergic to aspirin or have bleeding disorders. Consult doctor before use.",
    category: "NSAID",
  },
  amoxicillin: {
    name: "Amoxicillin 500mg",
    uses: "Treats bacterial infections including ear infections, urinary tract infections, and skin infections.",
    dosage:
      "500mg three times daily for 7-10 days. Take with or without food. Complete full course.",
    sideEffects:
      "Diarrhea, nausea, vomiting, rash, allergic reactions. May cause yeast infections.",
    warnings:
      "Tell doctor if allergic to penicillin. May interact with other antibiotics. Finish all doses.",
    category: "Antibiotic",
  },
  metformin: {
    name: "Metformin 500mg",
    uses: "Controls blood sugar levels in type 2 diabetes. May help with weight management.",
    dosage:
      "500-1000mg twice daily with meals. Start with low dose and increase gradually.",
    sideEffects:
      "Stomach upset, diarrhea, nausea, metallic taste, vitamin B12 deficiency.",
    warnings:
      "Monitor blood sugar regularly. May cause lactic acidosis (rare but serious).",
    category: "Antidiabetic",
  },
  omeprazole: {
    name: "Omeprazole 20mg",
    uses: "Reduces stomach acid production. Treats GERD, ulcers, and heartburn.",
    dosage:
      "20mg once daily before meals for 4-8 weeks. Can be taken long-term if needed.",
    sideEffects:
      "Headache, diarrhea, nausea, abdominal pain, vitamin B12 deficiency.",
    warnings:
      "May mask stomach cancer symptoms. Take 30 minutes before food. Consult doctor if symptoms persist.",
    category: "Proton Pump Inhibitor",
  },
  atorvastatin: {
    name: "Atorvastatin 10mg",
    uses: "Lowers cholesterol and triglyceride levels. Reduces risk of heart disease and stroke.",
    dosage:
      "10-80mg once daily. Can be taken any time of day with or without food.",
    sideEffects:
      "Muscle pain, weakness, liver problems, digestive issues, increased blood sugar.",
    warnings:
      "Report muscle pain immediately. May interact with grapefruit juice. Regular liver tests needed.",
    category: "Statin",
  },
  losartan: {
    name: "Losartan 50mg",
    uses: "Treats high blood pressure and protects kidneys in diabetic patients.",
    dosage: "50-100mg once daily. Can be taken with or without food.",
    sideEffects:
      "Dizziness, fatigue, cough, low blood pressure, kidney problems.",
    warnings:
      "May cause dizziness when standing. Monitor blood pressure regularly. Not for use during pregnancy.",
    category: "ARB",
  },
  levothyroxine: {
    name: "Levothyroxine 50mcg",
    uses: "Replaces thyroid hormone in hypothyroidism. Treats thyroid deficiency.",
    dosage:
      "25-200mcg once daily on empty stomach. Dose adjusted based on thyroid tests.",
    sideEffects:
      "Weight loss, increased appetite, sweating, insomnia, heart palpitations.",
    warnings:
      "Take on empty stomach. Regular thyroid tests required. May interact with calcium supplements.",
    category: "Thyroid Hormone",
  },
  prednisone: {
    name: "Prednisone 5mg",
    uses: "Reduces inflammation and suppresses immune system. Used for allergies, arthritis, and autoimmune conditions.",
    dosage: "5-60mg daily depending on condition. Often tapered off gradually.",
    sideEffects:
      "Weight gain, mood changes, increased blood sugar, weakened immune system, osteoporosis.",
    warnings:
      "Do not stop suddenly. May cause adrenal insufficiency. Monitor for infections and blood sugar.",
    category: "Corticosteroid",
  },
  cetirizine: {
    name: "Cetirizine 10mg",
    uses: "Relieves allergy symptoms including runny nose, sneezing, itchy throat, and hives.",
    dosage: "10mg once daily. Can be taken with or without food.",
    sideEffects: "Drowsiness, dry mouth, fatigue, headache, nausea.",
    warnings:
      "May cause drowsiness - avoid driving. Use caution with alcohol. Safe for most people but consult doctor.",
    category: "Antihistamine",
  },
  ranitidine: {
    name: "Ranitidine 150mg",
    uses: "Reduces stomach acid production. Treats heartburn, acid reflux, and ulcers.",
    dosage: "150mg twice daily or 300mg at bedtime. Take with or without food.",
    sideEffects: "Headache, dizziness, constipation, diarrhea, nausea.",
    warnings:
      "May mask stomach cancer symptoms. Consult doctor if symptoms persist. May interact with other drugs.",
    category: "H2 Blocker",
  },
  clopidogrel: {
    name: "Clopidogrel 75mg",
    uses: "Prevents blood clots. Reduces risk of heart attack and stroke in high-risk patients.",
    dosage: "75mg once daily with or without food.",
    sideEffects: "Bleeding, bruising, stomach upset, rash, itching.",
    warnings:
      "Increased bleeding risk. Tell doctor about any bleeding or surgery plans. May interact with NSAIDs.",
    category: "Antiplatelet",
  },
  simvastatin: {
    name: "Simvastatin 20mg",
    uses: "Lowers cholesterol and triglyceride levels. Reduces risk of heart disease.",
    dosage: "20-40mg once daily in the evening. Take with or without food.",
    sideEffects:
      "Muscle pain, weakness, digestive issues, headache, increased blood sugar.",
    warnings:
      "Report muscle pain immediately. Avoid grapefruit juice. Regular blood tests required.",
    category: "Statin",
  },
  amlodipine: {
    name: "Amlodipine 5mg",
    uses: "Treats high blood pressure and chest pain (angina). Relaxes blood vessels.",
    dosage: "5-10mg once daily. Can be taken any time with or without food.",
    sideEffects:
      "Swelling in ankles/feet, dizziness, flushing, fatigue, nausea.",
    warnings:
      "May cause dizziness when standing. Monitor blood pressure. Avoid grapefruit juice.",
    category: "Calcium Channel Blocker",
  },
  gabapentin: {
    name: "Gabapentin 300mg",
    uses: "Treats nerve pain from shingles, seizures, and restless legs syndrome.",
    dosage:
      "300-600mg three times daily. Start with low dose and increase gradually.",
    sideEffects:
      "Dizziness, drowsiness, fatigue, weight gain, coordination problems.",
    warnings:
      "May cause drowsiness - avoid driving. Do not stop suddenly. May interact with other sedatives.",
    category: "Anticonvulsant",
  },
  sertraline: {
    name: "Sertraline 50mg",
    uses: "Treats depression, anxiety disorders, OCD, PTSD, and panic attacks.",
    dosage: "50-200mg once daily. Can be taken with or without food.",
    sideEffects: "Nausea, insomnia, drowsiness, sexual dysfunction, anxiety.",
    warnings:
      "May increase suicidal thoughts initially. Do not stop suddenly. May take weeks to work.",
    category: "SSRI Antidepressant",
  },
  alprazolam: {
    name: "Alprazolam 0.5mg",
    uses: "Treats anxiety disorders and panic attacks. Provides short-term relief.",
    dosage:
      "0.25-0.5mg three times daily as needed. Do not exceed recommended dose.",
    sideEffects:
      "Drowsiness, dizziness, memory problems, dependence, withdrawal symptoms.",
    warnings:
      "High abuse potential. Do not stop suddenly. Avoid alcohol. Use short-term only.",
    category: "Benzodiazepine",
  },
  "vitamin d": {
    name: "Vitamin D 1000 IU",
    uses: "Supports bone health, immune function, and calcium absorption.",
    dosage: "1000-2000 IU daily. Can be taken with meals.",
    sideEffects: "Rare: nausea, constipation, weakness (with very high doses).",
    warnings:
      "Monitor blood levels if deficient. May interact with certain medications.",
    category: "Vitamin",
  },
  "vitamin c": {
    name: "Vitamin C 500mg",
    uses: "Supports immune system, collagen production, and antioxidant protection.",
    dosage: "500-1000mg daily. Can be taken with or without food.",
    sideEffects:
      "Stomach upset, diarrhea (with high doses), kidney stones (rare).",
    warnings:
      "High doses may cause digestive issues. Consult doctor if on chemotherapy.",
    category: "Vitamin",
  },
  "amoxicillin syrup": {
    name: "Amoxicillin Syrup 125mg/5ml",
    uses: "Treats bacterial infections in children and adults who have difficulty swallowing pills.",
    dosage:
      "Children: 125-250mg three times daily. Adults: 500mg three times daily. Complete full course.",
    sideEffects:
      "Diarrhea, nausea, vomiting, rash, allergic reactions. May cause yeast infections.",
    warnings:
      "Tell doctor if allergic to penicillin. Shake well before use. Use measuring spoon.",
    category: "Antibiotic Syrup",
  },
  "ibuprofen syrup": {
    name: "Ibuprofen Syrup 50mg/1.25ml",
    uses: "Reduces pain, fever, and inflammation in children. Used for teething pain, fever, and minor injuries.",
    dosage:
      "Children 6 months-12 years: 5-10mg/kg every 6-8 hours. Do not exceed 40mg/kg/day.",
    sideEffects:
      "Stomach upset, nausea, vomiting, allergic reactions, increased risk of bleeding.",
    warnings:
      "Do not give to children under 6 months. Consult doctor for proper dosing. Use measuring device.",
    category: "NSAID Syrup",
  },
  "paracetamol syrup": {
    name: "Paracetamol Syrup 125mg/5ml",
    uses: "Relieves pain and reduces fever in children. Used for teething, colds, and post-vaccination fever.",
    dosage:
      "Children: 10-15mg/kg every 4-6 hours. Do not exceed 60mg/kg/day. Use measuring spoon.",
    sideEffects:
      "Nausea, vomiting, allergic reactions, liver damage with overdose.",
    warnings:
      "Do not exceed recommended dose. Keep out of reach of children. Use proper measuring device.",
    category: "Analgesic Syrup",
  },
  "diphenhydramine syrup": {
    name: "Diphenhydramine Syrup 12.5mg/5ml",
    uses: "Relieves allergy symptoms, runny nose, itchy throat, and cough. Helps with sleep difficulties.",
    dosage:
      "Children 6-12 years: 12.5-25mg every 4-6 hours. Adults: 25-50mg every 4-6 hours.",
    sideEffects:
      "Drowsiness, dry mouth, dizziness, constipation, blurred vision.",
    warnings:
      "May cause severe drowsiness - avoid driving. Do not use with other sedating drugs. Consult doctor for children under 6.",
    category: "Antihistamine Syrup",
  },
  "guaifenesin syrup": {
    name: "Guaifenesin Syrup 100mg/5ml",
    uses: "Helps loosen mucus and thin bronchial secretions. Relieves chest congestion and cough.",
    dosage:
      "Children 6-12 years: 100-200mg every 4 hours. Adults: 200-400mg every 4 hours.",
    sideEffects: "Nausea, vomiting, dizziness, headache, rash.",
    warnings:
      "Drink plenty of water while using. Consult doctor if cough persists or worsens. Not for children under 2 without doctor advice.",
    category: "Expectorant Syrup",
  },
  "vitamin d syrup": {
    name: "Vitamin D Syrup 400 IU/ml",
    uses: "Prevents and treats vitamin D deficiency. Supports bone health and immune function in children.",
    dosage:
      "Children: 400-1000 IU daily. Adults: 1000-2000 IU daily. Follow doctor recommendations.",
    sideEffects: "Rare: nausea, constipation, weakness (with very high doses).",
    warnings:
      "Monitor blood levels. May interact with certain medications. Consult doctor for proper dosing.",
    category: "Vitamin Syrup",
  },
  "ibuprofen paracetamol suspension": {
    name: "Ibuprofen & Paracetamol Suspension",
    uses: "Combination medicine for pain relief and fever reduction. Used for toothache, headache, body pain, and fever in children.",
    dosage:
      "Children 1-12 years: 5ml every 6-8 hours. Do not exceed 4 doses in 24 hours. Use measuring spoon.",
    sideEffects:
      "Stomach upset, nausea, vomiting, allergic reactions, dizziness, liver damage (rare).",
    warnings:
      "Do not give to children under 1 year. Consult doctor for proper dosing. Do not exceed recommended dose.",
    category: "Combination Analgesic Suspension",
  },
  diclofenac: {
    name: "Diclofenac 50mg",
    uses: "Reduces pain and inflammation. Used for arthritis, muscle pain, dental pain, and menstrual cramps.",
    dosage:
      "50mg two to three times daily with food. Do not exceed 150mg per day.",
    sideEffects:
      "Stomach upset, heartburn, nausea, dizziness, increased blood pressure.",
    warnings:
      "Take with food. Avoid if you have stomach ulcers or heart disease. May increase heart attack risk.",
    category: "NSAID",
  },
  "dicyclomine paracetamol": {
    name: "Dicyclomine & Paracetamol",
    uses: "Combination for abdominal pain and spasms. Used for menstrual cramps and gastrointestinal discomfort.",
    dosage:
      "1-2 tablets every 6-8 hours as needed. Do not exceed 6 tablets per day.",
    sideEffects:
      "Dry mouth, dizziness, drowsiness, constipation, nausea, blurred vision.",
    warnings:
      "May cause drowsiness - avoid driving. Do not use if you have glaucoma or prostate enlargement.",
    category: "Antispasmodic Analgesic",
  },
};
