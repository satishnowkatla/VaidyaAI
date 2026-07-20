import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
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
import MedicalDisclaimer from "../components/MedicalDisclaimer";
import { getScanHistory } from "../services/scanHistory";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const { t, lang, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const { colors } = useTheme();
  const isTE = lang === "te";
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [recentScans, setRecentScans] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getScanHistory(user.id).then((h) => setRecentScans(h.slice(0, 3)));
      }
    }, [user])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MedicalDisclaimer
        visible={showDisclaimer}
        onAccept={() => setShowDisclaimer(false)}
      />
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Gradient Header ── */}
        <LinearGradient
          colors={colors.gradient.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View style={styles.logoRow}>
              <View style={[styles.logoIcon, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                <Ionicons name="medical" size={18} color={colors.white} />
              </View>
              <Text style={[styles.logoText, { color: colors.white }]}>VaidyaAI</Text>
            </View>
            <TouchableOpacity
              style={[styles.langToggle, { backgroundColor: "rgba(255,255,255,0.15)" }]}
              onPress={toggleLanguage}
            >
              <Text
                style={[
                  styles.langOpt,
                  lang === "en" && { backgroundColor: colors.white, color: colors.primary },
                ]}
              >
                EN
              </Text>
              <Text
                style={[
                  styles.langOpt,
                  lang === "te" && { backgroundColor: colors.white, color: colors.primary },
                ]}
              >
                తె
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.greetSection}>
            <Text style={[styles.greetSm, { color: "rgba(255,255,255,0.7)" }]}>{t("appName")}</Text>
            <Text style={[styles.greetName, { color: colors.white }]}>
              Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
            </Text>
          </View>

          {/* ── Hero Scan Card ── */}
          <TouchableOpacity
            style={[styles.heroCard, { backgroundColor: colors.white }]}
            onPress={() => navigation.navigate("Scan")}
            activeOpacity={0.85}
          >
            <View style={styles.heroContent}>
              <View style={[styles.heroIconCircle, { backgroundColor: colors.primaryBg }]}>
                <Ionicons name="scan" size={28} color={colors.primary} />
              </View>
              <View style={styles.heroTextGroup}>
                <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>{t("scan")}</Text>
                <Text style={[styles.heroSub, { color: colors.textMuted }]}>{t("tagline")}</Text>
              </View>
            </View>
            <LinearGradient
              colors={colors.gradient.accent}
              style={styles.heroBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="camera" size={16} color={colors.white} />
              <Text style={[styles.heroBtnText, { color: colors.white }]}>{t("scanNow")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* ── Quick Actions ── */}
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate("Library")}
            activeOpacity={0.7}
          >
            <View style={[styles.quickIconCircle, { backgroundColor: colors.primaryBg }]}>
              <Ionicons name="book" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.quickText, { color: colors.textPrimary }]}>{t("library")}</Text>
            <Text style={[styles.quickSub, { color: colors.textMuted }]}>200+ medicines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate("Stores")}
            activeOpacity={0.7}
          >
            <View style={[styles.quickIconCircle, { backgroundColor: colors.accentBg }]}>
              <Ionicons name="location" size={22} color={colors.accent} />
            </View>
            <Text style={[styles.quickText, { color: colors.textPrimary }]}>{t("stores")}</Text>
            <Text style={[styles.quickSub, { color: colors.textMuted }]}>Find pharmacies</Text>
          </TouchableOpacity>
        </View>

        {/* ── Recent Scans ── */}
        <SectionHeader
          title={t("recentScans")}
          actionText={t("seeAll")}
          onAction={() => navigation.navigate("ScanHistory")}
          colors={colors}
        />

        {recentScans.length === 0 ? (
          <TouchableOpacity
            style={[styles.recentCard, { backgroundColor: colors.surface }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Scan")}
          >
            <View style={[styles.recentIconWrap, { backgroundColor: colors.primaryBg }]}>
              <Ionicons name="camera" size={20} color={colors.primary} />
            </View>
            <View style={styles.recentInfo}>
              <Text style={[styles.recentName, { color: colors.textPrimary }]}>
                {isTE ? "మొదటి స్కాన్ ప్రారంభించండి" : "Start your first scan"}
              </Text>
              <Text style={[styles.recentTime, { color: colors.textMuted }]}>
                {isTE ? "మందును స్కాన్ చేయడానికి ఇక్కడ నొక్కండి" : "Tap here to scan a medicine"}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ) : (
          recentScans.map((scan) => (
            <TouchableOpacity
              key={scan.id}
              style={[styles.recentCard, { backgroundColor: colors.surface }]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Result", { medicine: scan })}
            >
              <View style={[styles.recentIconWrap, { backgroundColor: colors.primaryBg }]}>
                <Ionicons name="medical" size={20} color={colors.primary} />
              </View>
              <View style={styles.recentInfo}>
                <Text style={[styles.recentName, { color: colors.textPrimary }]}>{scan.name}</Text>
                <Text style={[styles.recentTime, { color: colors.textMuted }]}>{scan.category}</Text>
              </View>
              <View style={[styles.safeTag, { backgroundColor: colors.tagGreenBg }]}>
                <Ionicons name="checkmark-circle" size={12} color={colors.tagGreenText} />
                <Text style={[styles.safeText, { color: colors.tagGreenText }]}>{t("safe")}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function SectionHeader({ title, actionText, onAction, colors }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{title}</Text>
      <TouchableOpacity onPress={onAction} activeOpacity={0.6}>
        <Text style={[styles.seeAll, { color: colors.primary }]}>{actionText}</Text>
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
