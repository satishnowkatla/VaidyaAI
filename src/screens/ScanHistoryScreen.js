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
import { useLanguage } from "../context/LanguageContext";

export default function ScanHistoryScreen({ navigation }) {
  const { lang } = useLanguage();
  const isTE = lang === "te";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isTE ? "స్కాన్ చరిత్ర" : "Scan History"}
        </Text>
        <View style={{ width: 34 }} />
      </View>

      <View style={styles.emptyBox}>
        <Text style={styles.emptyIcon}>📋</Text>
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
        >
          <Text style={styles.scanBtnText}>
            {isTE ? "స్కాన్ ప్రారంభించు" : "Start Scanning"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 18, color: Colors.primary, fontWeight: "700" },
  headerTitle: { fontSize: 16, fontWeight: "800", color: Colors.textDark },
  emptyBox: { alignItems: "center", paddingTop: 120, paddingHorizontal: 30 },
  emptyIcon: { fontSize: 64 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textDark,
    marginTop: 20,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  scanBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 24,
  },
  scanBtnText: { color: Colors.white, fontSize: 14, fontWeight: "800" },
});
