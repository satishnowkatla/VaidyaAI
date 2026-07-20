import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getScanHistory, deleteScan } from "../services/scanHistory";
import { useFocusEffect } from "@react-navigation/native";

export default function ScanHistoryScreen({ navigation }) {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const { colors } = useTheme();
  const isTE = lang === "te";
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getScanHistory(user.id).then(setHistory);
      }
    }, [user])
  );

  const handleDelete = (scanId) => {
    Alert.alert(
      isTE ? "తొలగించు" : "Delete",
      isTE ? "ఈ స్కాన్ తొలగించాలా?" : "Delete this scan?",
      [
        { text: isTE ? "రద్దు" : "Cancel", style: "cancel" },
        {
          text: isTE ? "తొలగించు" : "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteScan(user.id, scanId);
            setHistory((prev) => prev.filter((s) => s.id !== scanId));
          },
        },
      ],
    );
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    if (diffMins < 1) return isTE ? "ఇప్పుడు" : "Just now";
    if (diffMins < 60) return `${diffMins}${isTE ? "నిమి" : "m"} ${isTE ? "క్రితం" : "ago"}`;
    if (diffHrs < 24) return `${diffHrs}${isTE ? "గం" : "h"} ${isTE ? "క్రితం" : "ago"}`;
    return d.toLocaleDateString(isTE ? "te-IN" : "en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={colors.gradient.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.white }]}>
          {isTE ? "స్కాన్ చరిత్ర" : "Scan History"}
        </Text>
        <View style={{ width: 38 }} />
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {history.length === 0 ? (
          <View style={styles.emptyBox}>
            <View style={[styles.emptyIconCircle, { backgroundColor: colors.primaryBg }]}>
              <Ionicons name="document-text" size={36} color={colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
              {isTE ? "ఇంకా స్కాన్లు లేవు" : "No Scans Yet"}
            </Text>
            <Text style={[styles.emptySub, { color: colors.textMuted }]}>
              {isTE ? "మందులను స్కాన్ చేసినప్పుడు అవి ఇక్కడ కనిపిస్తాయి" : "Your scanned medicines will appear here"}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Main", { screen: "Scan" })}
              activeOpacity={0.8}
            >
              <LinearGradient colors={colors.gradient.primary} style={styles.scanBtnGrad}>
                <Ionicons name="camera" size={18} color={colors.white} />
                <Text style={[styles.scanBtnText, { color: colors.white }]}>
                  {isTE ? "స్కాన్ ప్రారంభించు" : "Start Scanning"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          history.map((scan) => (
            <TouchableOpacity
              key={scan.id}
              style={[styles.scanCard, { backgroundColor: colors.surface }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Result", { medicine: scan })}
            >
              <View style={[styles.scanIcon, { backgroundColor: colors.primaryBg }]}>
                <Ionicons name="medical" size={20} color={colors.primary} />
              </View>
              <View style={styles.scanInfo}>
                <Text style={[styles.scanName, { color: colors.textPrimary }]}>{scan.name}</Text>
                <Text style={[styles.scanCat, { color: colors.textMuted }]}>{scan.category}</Text>
                <Text style={[styles.scanTime, { color: colors.textMuted }]}>
                  {formatTime(scan.timestamp)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(scan.id)} activeOpacity={0.6}>
                <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  headerTitle: { flex: 1, ...Typography.h3, textAlign: "center" },
  scroll: { padding: Spacing.lg },

  emptyBox: { alignItems: "center", paddingTop: 120, paddingHorizontal: Spacing.xxxl },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  emptyTitle: { ...Typography.h1, textAlign: "center" },
  emptySub: { ...Typography.body, textAlign: "center", marginTop: Spacing.sm, lineHeight: 22 },
  scanBtnGrad: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: Radius.lg,
    marginTop: Spacing.xxl,
  },
  scanBtnText: { ...Typography.button },

  scanCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  scanIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  scanInfo: { flex: 1 },
  scanName: { ...Typography.captionBold, fontSize: 13 },
  scanCat: { ...Typography.micro, marginTop: 2 },
  scanTime: { ...Typography.micro, marginTop: 2 },
});
