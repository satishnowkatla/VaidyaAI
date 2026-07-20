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
import Colors from "../constants/colors";
import { APP_CONFIG } from "../constants/config";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useLanguage } from "../context/LanguageContext";

const settingGroups = [
  {
    titleKey: { en: "Preferences", te: "ప్రాధాన్యతలు" },
    items: [
      { key: "language", icon: "globe", iconBg: "primaryBg", label: { en: "Language", te: "భాష" }, type: "lang" },
      { key: "notifications", icon: "notifications", iconBg: "tagGreenBg", label: { en: "Notifications", te: "నోటిఫికేషన్లు" }, desc: { en: "Expiry alerts", te: "గడువు హెచ్చరికలు" }, type: "toggle" },
      { key: "darkMode", icon: "moon", iconBg: "tagOrangeBg", label: { en: "Dark Mode", te: "థీమ్" }, desc: { en: "Light mode", te: "లైట్ మోడ్" }, type: "toggle" },
    ],
  },
  {
    titleKey: { en: "App Info", te: "యాప్ సమాచారం" },
    items: [
      { key: "history", icon: "time", iconBg: "primaryBg", label: { en: "Scan History", te: "స్కాన్ చరిత్ర" }, desc: { en: "View all past scans", te: "అన్ని స్కాన్లు చూడండి" }, type: "nav" },
      { key: "about", icon: "information-circle", iconBg: "tagOrangeBg", label: { en: `About ${APP_CONFIG.name}`, te: `${APP_CONFIG.name} గురించి` }, desc: { en: `Version ${APP_CONFIG.version}`, te: `Version ${APP_CONFIG.version}` }, type: "nav" },
      { key: "privacy", icon: "shield-checkmark", iconBg: "primaryBg", label: { en: "Privacy Policy", te: "గోప్యతా విధానం" }, desc: { en: "Read our policy", te: "మా విధానం చదవండి" }, type: "nav" },
    ],
  },
];

export default function SettingsScreen({ navigation }) {
  const { lang, toggleLanguage } = useLanguage();
  const isTE = lang === "te";
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handlePress = (key) => {
    switch (key) {
      case "history": navigation.navigate("ScanHistory"); break;
      case "about":
        Alert.alert(
          `About ${APP_CONFIG.name}`,
          `${APP_CONFIG.name} - ${APP_CONFIG.description}\nVersion ${APP_CONFIG.version}\n\nIdentify medicines instantly by scanning medicine strips with your camera.\n\nMade with ❤️ in ${APP_CONFIG.madeIn}`,
          [{ text: "OK" }],
        );
        break;
      case "privacy":
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
        break;
      default: break;
    }
  };

  const handleLogout = () => {
    Alert.alert(
      isTE ? "లాగ్అవుట్" : "Logout",
      isTE ? "మీరు నిజంగా లాగ్అవుట్ చేయాలనుకుంటున్నారా?" : "Are you sure you want to logout?",
      [
        { text: isTE ? "రద్దు" : "Cancel", style: "cancel" },
        {
          text: isTE ? "లాగ్అవుట్" : "Logout",
          style: "destructive",
          onPress: () => Alert.alert(isTE ? "లాగ్అవుట్ అయింది" : "Logged Out", isTE ? "మీరు విజయవంతంగా లాగ్అవుట్ అయ్యారు" : "You have been logged out successfully."),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Profile Hero ── */}
      <LinearGradient
        colors={Colors.gradient.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHero}
      >
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>VA</Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{APP_CONFIG.name} User</Text>
          <Text style={styles.profileEmail}>user@vaidyaai.app</Text>
          <View style={styles.profileLocation}>
            <Ionicons name="location" size={12} color={Colors.whiteFaint} />
            <Text style={styles.profileLocText}>Vijayawada, Andhra Pradesh</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
          <Ionicons name="pencil" size={14} color={Colors.white} />
          <Text style={styles.editBtnText}>{isTE ? "మార్చు" : "Edit"}</Text>
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {settingGroups.map((group, gi) => (
          <View key={gi}>
            <Text style={styles.groupLabel}>
              {isTE ? group.titleKey.te : group.titleKey.en}
            </Text>
            <View style={styles.groupCard}>
              {group.items.map((item, ii) => (
                <React.Fragment key={item.key}>
                  {ii > 0 && <View style={styles.divider} />}
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => item.type === "lang" ? toggleLanguage() : handlePress(item.key)}
                    activeOpacity={item.type === "toggle" ? 1 : 0.6}
                  >
                    <View style={[styles.rowIcon, { backgroundColor: Colors[item.iconBg] }]}>
                      <Ionicons name={item.icon} size={18} color={Colors[item.iconBg === "primaryBg" ? "primary" : item.iconBg === "tagGreenBg" ? "tagGreenText" : "tagOrangeText"]} />
                    </View>
                    <View style={styles.rowInfo}>
                      <Text style={styles.rowTitle}>
                        {isTE ? item.label.te : item.label.en}
                      </Text>
                      {item.desc && (
                        <Text style={styles.rowDesc}>
                          {isTE ? item.desc.te : item.desc.en}
                        </Text>
                      )}
                    </View>
                    {item.type === "toggle" && (
                      <Switch
                        value={item.key === "notifications" ? notifications : darkMode}
                        onValueChange={item.key === "notifications" ? setNotifications : (v) => { setDarkMode(v); if (v) Alert.alert("Dark Mode", "Dark mode will be available in the next update!"); }}
                        trackColor={{ false: Colors.switchTrackOff, true: Colors.switchTrackOn }}
                        thumbColor={item.key === "notifications" ? (notifications ? Colors.switchThumbOn : Colors.switchThumbOff) : (darkMode ? Colors.switchThumbOn : Colors.switchThumbOff)}
                      />
                    )}
                    {item.type === "lang" && (
                      <View style={styles.langToggle}>
                        <View style={[styles.langOpt, !isTE && styles.langOptActive]}>
                          <Text style={[styles.langOptText, !isTE && styles.langOptTextActive]}>EN</Text>
                        </View>
                        <View style={[styles.langOpt, isTE && styles.langOptActive]}>
                          <Text style={[styles.langOptText, isTE && styles.langOptTextActive]}>తె</Text>
                        </View>
                      </View>
                    )}
                    {item.type === "nav" && (
                      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                    )}
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* ── Logout ── */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out" size={18} color={Colors.tagRedText} />
          <Text style={styles.logoutText}>{isTE ? "లాగ్అవుట్" : "Logout"}</Text>
        </TouchableOpacity>

        {/* ── Version ── */}
        <Text style={styles.versionText}>
          {APP_CONFIG.name} v{APP_CONFIG.version} · Made in {APP_CONFIG.madeIn} 🇮🇳
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

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
  avatarText: { ...Typography.h1, color: Colors.white },
  profileInfo: { flex: 1 },
  profileName: { ...Typography.h3, color: Colors.white },
  profileEmail: { ...Typography.caption, color: Colors.whiteMuted, marginTop: 2 },
  profileLocation: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  profileLocText: { ...Typography.micro, color: Colors.whiteFaint },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  editBtnText: { ...Typography.captionBold, color: Colors.white },

  scrollContent: { padding: Spacing.lg, paddingBottom: 100 },

  groupLabel: {
    ...Typography.label,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
    paddingLeft: Spacing.xs,
  },
  groupCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    overflow: "hidden",
    ...Shadow.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  rowInfo: { flex: 1 },
  rowTitle: { ...Typography.bodyBold, color: Colors.textPrimary },
  rowDesc: { ...Typography.micro, color: Colors.textMuted, marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.borderLight, marginLeft: 68 },

  langToggle: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: Radius.pill,
    padding: 3,
  },
  langOpt: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill },
  langOptActive: { backgroundColor: Colors.primary },
  langOptText: { fontSize: 11, fontWeight: "800", color: Colors.textMuted },
  langOptTextActive: { color: Colors.white },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.tagRedBg,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
  },
  logoutText: { ...Typography.button, color: Colors.tagRedText },
  versionText: {
    textAlign: "center",
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.xl,
  },
});
