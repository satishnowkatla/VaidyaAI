import { createContext, useContext, useState } from "react";
import en from "../translations/en";
import te from "../translations/te";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "te" : "en"));
  };

  const t = (key) => {
    const translations = lang === "en" ? en : te;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
