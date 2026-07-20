import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  ScrollView,
  Share,
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
import { useTheme } from "../context/ThemeContext";

const T = {
  uses: "Uses",
  dosage: "Dosage",
  sideEffects: "Side Effects",
  warnings: "Warnings",
  category: "Category",
  safe: "Safe",
  details: "Medicine Details",
  match: "AI Match",
  stores: "Find Nearby Medical Stores",
  scanAgain: "Scan Another Medicine",
};

const T_TE = {
  uses: "ఉపయోగాలు",
  dosage: "మోతాదు",
  sideEffects: "దుష్ప్రభావాలు",
  warnings: "హెచ్చరికలు",
  category: "వర్గం",
  safe: "సురక్షితం",
  details: "మందు వివరాలు",
  match: "సరిపోలిక",
  stores: "దగ్గరలో మెడికల్ షాపులు",
  scanAgain: "మళ్ళీ స్కాన్ చేయండి",
};

export default function ResultScreen({ navigation, route }) {
  const { lang } = useLanguage();
  const { colors } = useTheme();
  const isTE = lang === "te";
  const tr = isTE ? T_TE : T;

  const sections = [
    { key: "uses", icon: "medkit", gradient: colors.gradient.primary },
    { key: "dosage", icon: "timer", gradient: colors.gradient.accent },
    { key: "sideEffects", icon: "warning", gradient: colors.gradient.warm },
    { key: "category", icon: "folder", gradient: colors.gradient.purple },
  ];

  const medicine = route?.params?.medicine || {
    name: "Paracetamol 500mg",
    uses: "Fever, Headache, Body Pain",
    dosage: "1 tablet every 6 hours. Do not exceed 4 tablets in 24 hours.",
    sideEffects: "Nausea, Stomach upset, Allergic reactions in rare cases.",
    warnings: "Keep out of reach of children. Store in cool dry place.",
    category: "Analgesic",
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Medicine: ${medicine.name}\nCategory: ${medicine.category}\nUses: ${medicine.uses}\nDosage: ${medicine.dosage}\nSide Effects: ${medicine.sideEffects}\nWarnings: ${medicine.warnings}\n\nShared from VaidyaAI`,
      });
    } catch (_) {}
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* ── Gradient Header ── */}
      <LinearGradient
        colors={colors.gradient.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{tr.details}</Text>
          <TouchableOpacity
            style={styles.shareBtn}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Ionicons name="share-social" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Medicine Card ── */}
        <View style={styles.medCard}>
          <View style={styles.medTop}>
            <View style={styles.medIconWrap}>
              <Ionicons name="medical" size={28} color={colors.primary} />
            </View>
            <View style={styles.medInfo}>
              <Text style={styles.medName}>{medicine.name}</Text>
              <Text style={styles.medCat}>{tr.category}: {medicine.category}</Text>
            </View>
          </View>
          <View style={styles.tagRow}>
            <View style={styles.safeTag}>
              <Ionicons name="checkmark-circle" size={14} color={colors.tagGreenText} />
              <Text style={styles.safeText}>✓ {tr.safe}</Text>
            </View>
            <View style={styles.aiTag}>
              <Ionicons name="sparkles" size={12} color={colors.primary} />
              <Text style={styles.aiText}>{tr.match}</Text>
            </View>
          </View>
        </View>

        {/* ── Info Sections ── */}
        {sections.map((s) => (
          <View key={s.key} style={styles.sectionCard}>
            <View style={styles.sectionLeft}>
              <LinearGradient
                colors={s.gradient}
                style={styles.sectionIconWrap}
              >
                <Ionicons name={s.icon} size={18} color={colors.white} />
              </LinearGradient>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionLabel}>{tr[s.key]}</Text>
              <Text style={styles.sectionValue}>{medicine[s.key]}</Text>
            </View>
          </View>
        ))}

        {/* ── Warning Box ── */}
        <View style={styles.warnBox}>
          <View style={styles.warnIconWrap}>
            <Ionicons name="warning" size={20} color={colors.warningText} />
          </View>
          <View style={styles.warnContent}>
            <Text style={styles.warnTitle}>{tr.warnings}</Text>
            <Text style={styles.warnText}>{medicine.warnings}</Text>
          </View>
        </View>

        {/* ── Danger Box ── */}
        <View style={styles.dangerBox}>
          <Ionicons name="shield-checkmark" size={18} color={colors.tagRedText} />
          <Text style={styles.dangerText}>
            {isTE
              ? "ఇది వైద్య సలహాకు ప్రత్యామ్నాయం కాదు"
              : "Not a substitute for professional medical advice"}
          </Text>
        </View>

        {/* ── Action Buttons ── */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="camera" size={18} color={colors.primary} />
          <Text style={styles.scanBtnText}>{tr.scanAgain}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.storesBtn}
          onPress={() => navigation.navigate("Main", { screen: "Stores" })}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={colors.gradient.primary}
            style={styles.storesBtnGrad}
          >
            <Ionicons name="location" size={18} color={colors.white} />
            <Text style={styles.storesBtnText}>{tr.stores}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing.md : Spacing.xxxxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: { flex: 1, ...Typography.h3, color: Colors.white },
  shareBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: { padding: Spacing.lg },

  medCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.md,
  },
  medTop: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  medIconWrap: {
    width: 54,
    height: 54,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },
  medInfo: { flex: 1, justifyContent: "center" },
  medName: { ...Typography.h2, color: Colors.textPrimary },
  medCat: { ...Typography.caption, color: Colors.textMedium, marginTop: 3 },
  tagRow: { flexDirection: "row", gap: Spacing.sm },
  safeTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.tagGreenBg,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  safeText: { ...Typography.microBold, color: Colors.tagGreenText },
  aiTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  aiText: { ...Typography.microBold, color: Colors.primary },

  sectionCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  sectionLeft: { paddingTop: 2 },
  sectionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionContent: { flex: 1 },
  sectionLabel: { ...Typography.micro, color: Colors.textMuted, marginBottom: 3 },
  sectionValue: { ...Typography.bodyBold, color: Colors.textPrimary, lineHeight: 20 },

  warnBox: {
    flexDirection: "row",
    backgroundColor: Colors.tagOrangeBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    gap: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.tagOrangeText,
  },
  warnIconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: "rgba(230,81,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  warnContent: { flex: 1 },
  warnTitle: { ...Typography.captionBold, color: Colors.tagOrangeText },
  warnText: {
    ...Typography.caption,
    color: Colors.tagOrangeSubtext,
    marginTop: 3,
    lineHeight: 18,
  },

  dangerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.tagRedBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.tagRedText,
  },
  dangerText: { ...Typography.captionBold, color: Colors.tagRedText, flex: 1 },

  scanBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    marginTop: Spacing.lg,
  },
  scanBtnText: { ...Typography.button, color: Colors.primary },

  storesBtn: {
    marginTop: Spacing.sm,
    borderRadius: Radius.lg,
    overflow: "hidden",
    ...Shadow.md,
  },
  storesBtnGrad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  storesBtnText: { ...Typography.button, color: Colors.white },
});
