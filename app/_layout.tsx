import React from "react";
import { LanguageProvider } from "../src/context/LanguageContext";
import AppNavigator from "../src/navigation/AppNavigator";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
  );
}
