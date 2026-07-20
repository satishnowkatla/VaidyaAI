import React from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { LanguageProvider } from "../src/context/LanguageContext";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";
import AppNavigator from "../src/navigation/AppNavigator";

function AppLoader() {
  const { loading } = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <AppNavigator />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppLoader />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
