import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import en from "../i18n/en";
import te from "../i18n/te";

const LANGUAGE_KEY = "vaidyaai_language";
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY)
      .then((saved) => {
        if (saved === "en" || saved === "te") setLang(saved);
      })
      .catch(() => {});
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === "en" ? "te" : "en";
      AsyncStorage.setItem(LANGUAGE_KEY, next).catch(() => {});
      return next;
    });
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
