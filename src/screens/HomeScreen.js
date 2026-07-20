import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
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
import MedicalDisclaimer from "../components/MedicalDisclaimer";

export default function HomeScreen({ navigation }) {
  const { t, lang, toggleLanguage } = useLanguage();
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <View style={styles.container}>
      <MedicalDisclaimer
        visible={showDisclaimer}
        onAccept={() => setShowDisclaimer(false)}
      />
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Gradient Header ── */}
        <LinearGradient
          colors={Colors.gradient.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Ionicons name="medical" size={18} color={Colors.white} />
              </View>
              <Text style={styles.logoText}>VaidyaAI</Text>
            </View>
            <TouchableOpacity
              style={styles.langToggle}
              onPress={toggleLanguage}
            >
              <Text
                style={[
                  styles.langOpt,
                  lang === "en" && styles.langActive,
                ]}
              >
                EN
              </Text>
              <Text
                style={[
                  styles.langOpt,
                  lang === "te" && styles.langActive,
                ]}
              >
                తె
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.greetSection}>
            <Text style={styles.greetSm}>{t("appName")}</Text>
            <Text style={styles.greetName}>Welcome back 👋</Text>
          </View>

          {/* ── Hero Scan Card ── */}
          <TouchableOpacity
            style={styles.heroCard}
            onPress={() => navigation.navigate("Scan")}
            activeOpacity={0.85}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroIconCircle}>
                <Ionicons name="scan" size={28} color={Colors.primary} />
              </View>
              <View style={styles.heroTextGroup}>
                <Text style={styles.heroTitle}>{t("scan")}</Text>
                <Text style={styles.heroSub}>{t("tagline")}</Text>
              </View>
            </View>
            <LinearGradient
              colors={Colors.gradient.accent}
              style={styles.heroBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="camera" size={16} color={Colors.white} />
              <Text style={styles.heroBtnText}>{t("scanNow")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* ── Quick Actions ── */}
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Library")}
            activeOpacity={0.7}
          >
            <View style={[styles.quickIconCircle, { backgroundColor: Colors.primaryBg }]}>
              <Ionicons name="book" size={22} color={Colors.primary} />
            </View>
            <Text style={styles.quickText}>{t("library")}</Text>
            <Text style={styles.quickSub}>200+ medicines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate("Stores")}
            activeOpacity={0.7}
          >
            <View style={[styles.quickIconCircle, { backgroundColor: Colors.accentBg }]}>
              <Ionicons name="location" size={22} color={Colors.accent} />
            </View>
            <Text style={styles.quickText}>{t("stores")}</Text>
            <Text style={styles.quickSub}>Find pharmacies</Text>
          </TouchableOpacity>
        </View>

        {/* ── Recent Scans ── */}
        <SectionHeader
          title={t("recentScans")}
          actionText={t("seeAll")}
          onAction={() => navigation.navigate("ScanHistory")}
        />

        <TouchableOpacity
          style={styles.recentCard}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("Result", {
              medicine: {
                name: "Paracetamol 500mg",
                uses: "Relieves pain and reduces fever. Used for headaches, body aches, toothaches, and fever.",
                dosage: "Adults: 500-1000mg every 4-6 hours as needed. Do not exceed 4000mg per day.",
                sideEffects: "Nausea, vomiting, stomach upset, allergic reactions.",
                warnings: "Do not take with alcohol. Avoid if you have liver disease.",
                category: "Analgesic and Antipyretic",
              },
            })
          }
        >
          <View style={[styles.recentIconWrap, { backgroundColor: Colors.primaryBg }]}>
            <Ionicons name="medical" size={20} color={Colors.primary} />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Paracetamol 500mg</Text>
            <Text style={styles.recentTime}>Today · 9:30 AM</Text>
          </View>
          <View style={styles.safeTag}>
            <Ionicons name="checkmark-circle" size={12} color={Colors.tagGreenText} />
            <Text style={styles.safeText}>{t("safe")}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recentCard}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("Result", {
              medicine: {
                name: "Metformin 850mg",
                uses: "Controls blood sugar levels in type 2 diabetes. May help with weight management.",
                dosage: "850mg twice daily with meals. Start with low dose and increase gradually.",
                sideEffects: "Stomach upset, diarrhea, nausea, metallic taste.",
                warnings: "Monitor blood sugar regularly. May cause lactic acidosis (rare but serious).",
                category: "Antidiabetic",
              },
            })
          }
        >
          <View style={[styles.recentIconWrap, { backgroundColor: Colors.tagPurpleBg }]}>
            <Ionicons name="medical" size={20} color={Colors.tagPurpleText} />
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Metformin 850mg</Text>
            <Text style={styles.recentTime}>Yesterday · 7:00 PM</Text>
          </View>
          <View style={styles.safeTag}>
            <Ionicons name="checkmark-circle" size={12} color={Colors.tagGreenText} />
            <Text style={styles.safeText}>{t("safe")}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function SectionHeader({ title, actionText, onAction }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onAction} activeOpacity={0.6}>
        <Text style={styles.seeAll}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing.md : Spacing.xxxxl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 17, fontWeight: "800", color: Colors.white },
  langToggle: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: Radius.pill,
    padding: 3,
  },
  langOpt: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 11,
    fontWeight: "800",
    color: "rgba(255,255,255,0.6)",
    borderRadius: Radius.pill,
  },
  langActive: {
    backgroundColor: Colors.white,
    color: Colors.primary,
  },
  greetSection: { marginBottom: Spacing.lg },
  greetSm: { fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: "500" },
  greetName: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.white,
    marginTop: 2,
    letterSpacing: -0.3,
  },
  heroCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Shadow.lg,
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  heroIconCircle: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTextGroup: { flex: 1 },
  heroTitle: { ...Typography.h3, color: Colors.textPrimary },
  heroSub: { ...Typography.caption, color: Colors.textMuted, marginTop: 2 },
  heroBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.md,
  },
  heroBtnText: { ...Typography.buttonSmall, color: Colors.white },

  quickGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: "flex-start",
    gap: Spacing.sm,
    ...Shadow.md,
  },
  quickIconCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  quickText: { ...Typography.captionBold, color: Colors.textPrimary },
  quickSub: { ...Typography.micro, color: Colors.textMuted },

  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  seeAll: { ...Typography.captionBold, color: Colors.primary },

  recentCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    ...Shadow.sm,
  },
  recentIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  recentInfo: { flex: 1 },
  recentName: { ...Typography.captionBold, color: Colors.textPrimary, fontSize: 13 },
  recentTime: { ...Typography.micro, color: Colors.textMuted, marginTop: 2 },
  safeTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.tagGreenBg,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  safeText: { ...Typography.microBold, color: Colors.tagGreenText },
});
