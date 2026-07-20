import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { APP_CONFIG } from "../constants/config";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme, colors } = useTheme();
  const isTE = lang === "te";
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      isTE ? "లాగ్అవుట్" : "Logout",
      isTE ? "మీరు నిజంగా లాగ్అవుట్ చేయాలనుకుంటున్నారా?" : "Are you sure you want to logout?",
      [
        { text: isTE ? "రద్దు" : "Cancel", style: "cancel" },
        {
          text: isTE ? "లాగ్అవుట్" : "Logout",
          style: "destructive",
          onPress: () => logout(),
        },
      ],
    );
  };

  const handleAbout = () => {
    Alert.alert(
      `About ${APP_CONFIG.name}`,
      `${APP_CONFIG.name} - ${APP_CONFIG.description}\nVersion ${APP_CONFIG.version}\n\nIdentify medicines instantly by scanning medicine strips with your camera.\n\nMade with ❤️ in ${APP_CONFIG.madeIn}`,
      [{ text: "OK" }],
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      isTE ? "గోప్యతా విధానం" : "Privacy Policy",
      `${APP_CONFIG.name} Privacy Policy\n\n` +
        "1. We do not collect personal data.\n\n" +
        "2. Camera images are processed locally and sent only to OCR API for text extraction.\n\n" +
        "3. No images are stored on our servers.\n\n" +
        "4. Location data is used only to find nearby stores and is not stored.\n\n" +
        `5. For questions, contact: ${APP_CONFIG.supportEmail}`,
      [{ text: "OK" }],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Profile Hero */}
      <LinearGradient
        colors={colors.gradient.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHero}
      >
        <View style={styles.avatarRing}>
          {user?.photo ? (
            <View style={styles.avatarWithImage}>
              <Text style={styles.avatarText}>
                {user.name?.charAt(0) || "U"}
              </Text>
            </View>
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0) || "U"}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || APP_CONFIG.name + " User"}</Text>
          <Text style={styles.profileEmail}>{user?.email || "user@vaidyaai.app"}</Text>
          <View style={styles.profileLocation}>
            <Ionicons name="location" size={12} color={colors.whiteFaint} />
            <Text style={[styles.profileLocText, { color: colors.whiteFaint }]}>
              Vijayawada, Andhra Pradesh
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Preferences */}
        <Text style={[styles.groupLabel, { color: colors.textMuted }]}>
          {isTE ? "ప్రాధాన్యతలు" : "Preferences"}
        </Text>
        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          {/* Language */}
          <TouchableOpacity style={[styles.row, { padding: Spacing.lg }]} onPress={toggleLanguage} activeOpacity={0.6}>
            <View style={[styles.rowIcon, { backgroundColor: colors.primaryBg }]}>
              <Ionicons name="globe" size={18} color={colors.primary} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{isTE ? "భాష" : "Language"}</Text>
              <Text style={[styles.rowDesc, { color: colors.textMuted }]}>
                {isTE ? "ఇప్పుడు: తెలుగు" : "Currently: English"}
              </Text>
            </View>
            <View style={[styles.langToggle, { backgroundColor: colors.border }]}>
              <View style={[styles.langOpt, !isTE && { backgroundColor: colors.primary }]}>
                <Text style={[styles.langOptText, { color: colors.textMuted }, !isTE && { color: colors.white }]}>EN</Text>
              </View>
              <View style={[styles.langOpt, isTE && { backgroundColor: colors.primary }]}>
                <Text style={[styles.langOptText, { color: colors.textMuted }, isTE && { color: colors.white }]}>తె</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          {/* Notifications */}
          <View style={[styles.row, { padding: Spacing.lg }]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.tagGreenBg }]}>
              <Ionicons name="notifications" size={18} color={colors.tagGreenText} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{isTE ? "నోటిఫికేషన్లు" : "Notifications"}</Text>
              <Text style={[styles.rowDesc, { color: colors.textMuted }]}>{isTE ? "గడువు హెచ్చరికలు" : "Expiry alerts"}</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
              thumbColor={notifications ? colors.switchThumbOn : colors.switchThumbOff}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          {/* Dark Mode */}
          <View style={[styles.row, { padding: Spacing.lg }]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.tagOrangeBg }]}>
              <Ionicons name="moon" size={18} color={colors.tagOrangeText} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{isTE ? "థీమ్" : "Dark Mode"}</Text>
              <Text style={[styles.rowDesc, { color: colors.textMuted }]}>
                {isDark ? (isTE ? "డార్క్ మోడ్ ఆన్" : "Dark mode on") : (isTE ? "లైట్ మోడ్" : "Light mode")}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
              thumbColor={isDark ? colors.switchThumbOn : colors.switchThumbOff}
            />
          </View>
        </View>

        {/* App Info */}
        <Text style={[styles.groupLabel, { color: colors.textMuted }]}>
          {isTE ? "యాప్ సమాచారం" : "App Info"}
        </Text>
        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[styles.row, { padding: Spacing.lg }]}
            onPress={() => navigation.navigate("ScanHistory")}
            activeOpacity={0.6}
          >
            <View style={[styles.rowIcon, { backgroundColor: colors.primaryBg }]}>
              <Ionicons name="time" size={18} color={colors.primary} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{isTE ? "స్కాన్ చరిత్ర" : "Scan History"}</Text>
              <Text style={[styles.rowDesc, { color: colors.textMuted }]}>{isTE ? "అన్ని స్కాన్లు చూడండి" : "View all past scans"}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          <TouchableOpacity style={[styles.row, { padding: Spacing.lg }]} onPress={handleAbout} activeOpacity={0.6}>
            <View style={[styles.rowIcon, { backgroundColor: colors.tagOrangeBg }]}>
              <Ionicons name="information-circle" size={18} color={colors.tagOrangeText} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{isTE ? `${APP_CONFIG.name} గురించి` : `About ${APP_CONFIG.name}`}</Text>
              <Text style={[styles.rowDesc, { color: colors.textMuted }]}>Version {APP_CONFIG.version}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

          <TouchableOpacity style={[styles.row, { padding: Spacing.lg }]} onPress={handlePrivacyPolicy} activeOpacity={0.6}>
            <View style={[styles.rowIcon, { backgroundColor: colors.primaryBg }]}>
              <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
            </View>
            <View style={styles.rowInfo}>
              <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>{isTE ? "గోప్యతా విధానం" : "Privacy Policy"}</Text>
              <Text style={[styles.rowDesc, { color: colors.textMuted }]}>{isTE ? "మా విధానం చదవండి" : "Read our policy"}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: colors.tagRedBg }]} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out" size={18} color={colors.tagRedText} />
          <Text style={[styles.logoutText, { color: colors.tagRedText }]}>{isTE ? "లాగ్అవుట్" : "Logout"}</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: colors.textMuted }]}>
          {APP_CONFIG.name} v{APP_CONFIG.version} · Made in {APP_CONFIG.madeIn} 🇮🇳
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileHero: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing.xl : Spacing.xxxxl + Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
  },
  avatarRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWithImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { ...Typography.h1, color: "#FFFFFF" },
  profileInfo: { flex: 1 },
  profileName: { ...Typography.h3, color: "#FFFFFF" },
  profileEmail: { ...Typography.caption, color: "rgba(255,255,255,0.75)", marginTop: 2 },
  profileLocation: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  profileLocText: { ...Typography.micro },

  scrollContent: { padding: Spacing.lg, paddingBottom: 100 },
  groupLabel: {
    ...Typography.label,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
    paddingLeft: Spacing.xs,
  },
  groupCard: { borderRadius: Radius.xl, overflow: "hidden", ...Shadow.sm },
  row: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  rowInfo: { flex: 1 },
  rowTitle: { ...Typography.bodyBold },
  rowDesc: { ...Typography.micro, marginTop: 2 },
  divider: { height: 1, marginLeft: 68 },

  langToggle: { flexDirection: "row", borderRadius: Radius.pill, padding: 3 },
  langOpt: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill },
  langOptText: { fontSize: 11, fontWeight: "800" },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
  },
  logoutText: { ...Typography.button },
  versionText: { textAlign: "center", ...Typography.caption, marginTop: Spacing.xl },
});
