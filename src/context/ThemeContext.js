import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import Colors from "../constants/colors";

const THEME_KEY = "vaidyaai_theme";

const DarkColors = {
  gradient: {
    primary: ["#1A237E", "#283593", "#3949AB"],
    hero: ["#0D1B3E", "#1A2744"],
    accent: ["#00695C", "#00897B"],
    warm: ["#E65100", "#FF8F00"],
    purple: ["#4A148C", "#6A1B9A"],
    success: ["#1B5E20", "#2E7D32"],
    danger: ["#B71C1C", "#C62828"],
    scan: ["#1A237E", "#00695C"],
  },

  primary: "#42A5F5",
  primaryDark: "#1E88E5",
  primaryLight: "#64B5F6",
  primarySoft: "#90CAF9",
  primaryBg: "#1A2332",
  primaryBgDeep: "#152030",

  accent: "#4DB6AC",
  accentLight: "#80CBC4",
  accentBg: "#0D2826",

  background: "#0A0F1A",
  surface: "#111827",
  surfaceElevated: "#1A2332",

  overlay: "rgba(0,0,0,0.7)",
  overlayMedium: "rgba(0,0,0,0.6)",
  overlayLight: "rgba(0,0,0,0.5)",
  darkBg: "#060A12",
  screenBlack: "#000000",

  white: "#FFFFFF",
  whiteMuted: "rgba(255,255,255,0.75)",
  whiteDim: "rgba(255,255,255,0.6)",
  whiteFaint: "rgba(255,255,255,0.45)",
  whiteGhost: "rgba(255,255,255,0.25)",
  whiteTransparent: "rgba(255,255,255,0.12)",
  whiteBtnBg: "rgba(255,255,255,0.12)",
  whiteFrost: "rgba(255,255,255,0.06)",

  textPrimary: "#E8EDF5",
  textSecondary: "#B0BEC5",
  textMedium: "#78909C",
  textMuted: "#546E7A",
  textDark: "#E8EDF5",

  border: "#1E293B",
  borderLight: "#1A2332",
  divider: "#1E293B",

  tagGreenBg: "#0D2818",
  tagGreenText: "#66BB6A",
  tagGreenBorder: "#2E7D32",
  tagOrangeBg: "#2D1B00",
  tagOrangeText: "#FFA726",
  tagOrangeBorder: "#E65100",
  tagOrangeSubtext: "#FF8F00",
  tagRedBg: "#2D0A0A",
  tagRedText: "#EF5350",
  tagRedBorder: "#C62828",
  tagBlueBg: "#0D1B3E",
  tagBlueText: "#42A5F5",
  tagPurpleBg: "#1A0D2E",
  tagPurpleText: "#AB47BC",

  successBg: "#0D2818",
  successText: "#66BB6A",
  warningBg: "#2D1B00",
  warningText: "#FFA726",
  errorBg: "#2D0A0A",
  errorText: "#EF5350",
  infoBg: "#0D1B3E",
  infoText: "#42A5F5",

  torchActive: "#FFF9C4",
  switchTrackOff: "#37474F",
  switchTrackOn: "#1565C0",
  switchThumbOn: "#42A5F5",
  switchThumbOff: "#78909C",

  tabBg: "#111827",
  tabActive: "#42A5F5",
  tabInactive: "#546E7A",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY)
      .then((v) => {
        if (v === "dark") setIsDark(true);
        else if (v === "light") setIsDark(false);
      })
      .catch(() => {});
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem(THEME_KEY, next ? "dark" : "light").catch(() => {});
      return next;
    });
  };

  const colors = isDark ? DarkColors : Colors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
