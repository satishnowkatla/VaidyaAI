import React from "react";
import { LanguageProvider } from "../services/LanguageContext";
import Navigation from "../services/Navigation";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Navigation />
    </LanguageProvider>
  );
}
