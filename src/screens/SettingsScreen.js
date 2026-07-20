import React, { useState } from "react";
import {
  Alert,
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
import { useLanguage } from "../context/LanguageContext";

export default function SettingsScreen({ navigation }) {
  const { lang, toggleLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const isTE = lang === "te";

  const handleEditProfile = () => {
    Alert.alert(
      isTE ? "ప్రొఫైల్ సవరణ" : "Edit Profile",
      isTE
        ? "ప్రొఫైల్ సవరణ త్వరలో అందుబాటులో ఉంటుంది"
        : "Profile editing coming soon!",
      [{ text: "OK" }],
    );
  };

  const handleScanHistory = () => {
    navigation.navigate("ScanHistory");
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

  const handleLogout = () => {
    Alert.alert(
      isTE ? "లాగ్అవుట్" : "Logout",
      isTE
        ? "మీరు నిజంగా లాగ్అవుట్ చేయాలనుకుంటున్నారా?"
        : "Are you sure you want to logout?",
      [
        { text: isTE ? "రద్దు" : "Cancel", style: "cancel" },
        {
          text: isTE ? "లాగ్అవుట్" : "Logout",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              isTE ? "లాగ్అవుట్ అయింది" : "Logged Out",
              isTE
                ? "మీరు విజయవంతంగా లాగ్అవుట్ అయ్యారు"
                : "You have been logged out successfully.",
            );
          },
        },
      ],
    );
  };

  const handleDarkMode = (value) => {
    setDarkMode(value);
    if (value) {
      Alert.alert(
        "Dark Mode",
        "Dark mode will be available in the next update!",
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* PROFILE HERO */}
      <View style={styles.profileHero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>VA</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{APP_CONFIG.name} User</Text>
          <Text style={styles.profileEmail}>user@vaidyaai.app</Text>
          <Text style={styles.profileLocation}>
            📍 Vijayawada, Andhra Pradesh
          </Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
          <Text style={styles.editBtnText}>{isTE ? "మార్చు" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* PREFERENCES GROUP */}
        <Text style={styles.groupLabel}>
          {isTE ? "ప్రాధాన్యతలు" : "Preferences"}
        </Text>
        <View style={styles.group}>
          {/* LANGUAGE */}
          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: Colors.primaryBg }]}>
              <Text style={styles.settingEmoji}>🌐</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? "భాష" : "Language"}
              </Text>
              <Text style={styles.settingDesc}>
                {isTE ? "ఇప్పుడు: తెలుగు" : "Currently: English"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.langToggle}
              onPress={toggleLanguage}
            >
              <View style={[styles.langOpt, !isTE && styles.langOptActive]}>
                <Text
                  style={[
                    styles.langOptText,
                    !isTE && styles.langOptTextActive,
                  ]}
                >
                  EN
                </Text>
              </View>
              <View style={[styles.langOpt, isTE && styles.langOptActive]}>
                <Text
                  style={[styles.langOptText, isTE && styles.langOptTextActive]}
                >
                  తె
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* NOTIFICATIONS */}
          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: Colors.tagGreenBg }]}>
              <Text style={styles.settingEmoji}>🔔</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? "నోటిఫికేషన్లు" : "Notifications"}
              </Text>
              <Text style={styles.settingDesc}>
                {isTE ? "గడువు హెచ్చరికలు" : "Expiry alerts"}
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.switchTrackOff, true: Colors.switchTrackOn }}
              thumbColor={notifications ? Colors.switchThumbOn : Colors.switchThumbOff}
            />
          </View>

          <View style={styles.divider} />

          {/* DARK MODE */}
          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: Colors.tagOrangeBg }]}>
              <Text style={styles.settingEmoji}>🌙</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? "థీమ్" : "Dark Mode"}
              </Text>
              <Text style={styles.settingDesc}>
                {darkMode
                  ? isTE
                    ? "డార్క్ మోడ్ ఆన్"
                    : "Dark mode on"
                  : isTE
                    ? "లైట్ మోడ్"
                    : "Light mode"}
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={handleDarkMode}
              trackColor={{ false: Colors.switchTrackOff, true: Colors.switchTrackOn }}
              thumbColor={darkMode ? Colors.switchThumbOn : Colors.switchThumbOff}
            />
          </View>
        </View>

        {/* APP INFO GROUP */}
        <Text style={styles.groupLabel}>
          {isTE ? "యాప్ సమాచారం" : "App Info"}
        </Text>
        <View style={styles.group}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={handleScanHistory}
          >
            <View style={[styles.settingIcon, { backgroundColor: Colors.primaryBg }]}>
              <Text style={styles.settingEmoji}>📋</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? "స్కాన్ చరిత్ర" : "Scan History"}
              </Text>
              <Text style={styles.settingDesc}>
                {isTE ? "అన్ని స్కాన్లు చూడండి" : "View all past scans"}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow} onPress={handleAbout}>
            <View style={[styles.settingIcon, { backgroundColor: Colors.tagOrangeBg }]}>
              <Text style={styles.settingEmoji}>ℹ️</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? `${APP_CONFIG.name} గురించి` : `About ${APP_CONFIG.name}`}
              </Text>
              <Text style={styles.settingDesc}>Version {APP_CONFIG.version}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.settingRow}
            onPress={handlePrivacyPolicy}
          >
            <View style={[styles.settingIcon, { backgroundColor: Colors.primaryBg }]}>
              <Text style={styles.settingEmoji}>🔒</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? "గోప్యతా విధానం" : "Privacy Policy"}
              </Text>
              <Text style={styles.settingDesc}>
                {isTE ? "మా విధానం చదవండి" : "Read our policy"}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>
            🚪 {isTE ? "లాగ్అవుట్" : "Logout"}
          </Text>
        </TouchableOpacity>

        {/* APP VERSION */}
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
    backgroundColor: Colors.primary,
    paddingTop: 54,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.whiteTransparent,
    borderWidth: 2,
    borderColor: Colors.whiteGhost,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 20, fontWeight: "800", color: Colors.white },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: "800", color: Colors.white },
  profileEmail: {
    fontSize: 11,
    color: Colors.whiteMuted,
    marginTop: 2,
  },
  profileLocation: {
    fontSize: 10,
    color: Colors.whiteFaint,
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: Colors.whiteBtnBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  editBtnText: { fontSize: 12, fontWeight: "700", color: Colors.white },
  scrollContent: { padding: 14, paddingBottom: 100 },
  groupLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 6,
    paddingLeft: 4,
  },
  group: {
    backgroundColor: Colors.surface,
    borderRadius: 17,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 13,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  settingEmoji: { fontSize: 18 },
  settingInfo: { flex: 1 },
  settingTitle: { fontSize: 13, fontWeight: "700", color: Colors.textDark },
  settingDesc: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 60 },
  langToggle: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 3,
    gap: 2,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  langOpt: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16 },
  langOptActive: { backgroundColor: Colors.primary },
  langOptText: { fontSize: 11, fontWeight: "800", color: Colors.textMuted },
  langOptTextActive: { color: Colors.white },
  chevron: { fontSize: 20, color: Colors.textMuted },
  logoutBtn: {
    backgroundColor: Colors.tagRedBg,
    borderRadius: 15,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  logoutText: { fontSize: 14, fontWeight: "800", color: Colors.tagRedText },
  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 16,
  },
});
