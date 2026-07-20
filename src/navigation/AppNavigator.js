import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";
import LoginScreen from "../screens/LoginScreen";
import ResultScreen from "../screens/ResultScreen";
import ScanHistoryScreen from "../screens/ScanHistoryScreen";
import ScanScreen from "../screens/ScanScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StoresScreen from "../screens/StoresScreen";

import Colors from "../constants/colors";
import { Shadow } from "../constants/spacing";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  Home: { focused: "home", unfocused: "home-outline" },
  Scan: { focused: "camera", unfocused: "camera-outline" },
  Library: { focused: "book", unfocused: "book-outline" },
  Stores: { focused: "location", unfocused: "location-outline" },
  Settings: { focused: "settings", unfocused: "settings-outline" },
};

function HomeTabs() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 16;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBg,
          borderTopWidth: 0,
          height: 64 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          ...Shadow.lg,
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarShowLabel: true,
      }}
    >
      {Object.entries(TAB_ICONS).map(([name, icons]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={
            name === "Home" ? HomeScreen :
            name === "Scan" ? ScanScreen :
            name === "Library" ? LibraryScreen :
            name === "Stores" ? StoresScreen :
            SettingsScreen
          }
          options={{
            tabBarLabel: t(name.toLowerCase()),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? icons.focused : icons.unfocused}
                size={22}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 16,
          color: colors.textPrimary,
        },
        headerBackTitle: "Back",
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      {!user ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScanHistory"
            component={ScanHistoryScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
