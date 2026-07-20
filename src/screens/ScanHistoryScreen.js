import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/colors";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useLanguage } from "../context/LanguageContext";

export default function ScanHistoryScreen({ navigation }) {
  const { lang } = useLanguage();
  const isTE = lang === "te";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Header ── */}
      <LinearGradient
        colors={Colors.gradient.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isTE ? "స్కాన్ చరిత్ర" : "Scan History"}
        </Text>
        <View style={{ width: 38 }} />
      </LinearGradient>

      {/* ── Empty State ── */}
      <View style={styles.emptyBox}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="document-text" size={36} color={Colors.primary} />
        </View>
        <Text style={styles.emptyTitle}>
          {isTE ? "ఇంకా స్కాన్లు లేవు" : "No Scans Yet"}
        </Text>
        <Text style={styles.emptySub}>
          {isTE
            ? "మందులను స్కాన్ చేసినప్పుడు అవి ఇక్కడ కనిపిస్తాయి"
            : "Your scanned medicines will appear here"}
        </Text>
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => navigation.navigate("Main", { screen: "Scan" })}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.scanBtnGrad}
          >
            <Ionicons name="camera" size={18} color={Colors.white} />
            <Text style={styles.scanBtnText}>
              {isTE ? "స్కాన్ ప్రారంభించు" : "Start Scanning"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing.md : Spacing.xxxxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { flex: 1, ...Typography.h3, color: Colors.white, textAlign: "center" },

  emptyBox: {
    alignItems: "center",
    paddingTop: 120,
    paddingHorizontal: Spacing.xxxl,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    ...Typography.h1,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  emptySub: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.sm,
    lineHeight: 22,
  },
  scanBtn: {
    marginTop: Spacing.xxl,
    borderRadius: Radius.lg,
    overflow: "hidden",
    ...Shadow.md,
  },
  scanBtnGrad: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  scanBtnText: { ...Typography.button, color: Colors.white },
});
