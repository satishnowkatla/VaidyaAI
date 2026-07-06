import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../services/LanguageContext";

export default function SettingsScreen({ navigation }) {
  const { t, lang, toggleLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const isTE = lang === "te";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

      {/* PROFILE HERO */}
      <View style={styles.profileHero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RK</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Ravi Kumar</Text>
          <Text style={styles.profileEmail}>ravi.kumar@gmail.com</Text>
          <Text style={styles.profileLocation}>
            📍 Vijayawada, Andhra Pradesh
          </Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
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
            <View style={[styles.settingIcon, { backgroundColor: "#E8F0FE" }]}>
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
            <View style={[styles.settingIcon, { backgroundColor: "#E8F5E9" }]}>
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
              trackColor={{ false: "#E8EDF5", true: "#BBDEFB" }}
              thumbColor={notifications ? "#1565C0" : "#9AA5B4"}
            />
          </View>

          <View style={styles.divider} />

          {/* DARK MODE */}
          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: "#FFF3E0" }]}>
              <Text style={styles.settingEmoji}>🌙</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? "థీమ్" : "Dark Mode"}
              </Text>
              <Text style={styles.settingDesc}>
                {isTE ? "డార్క్ మోడ్" : "Light mode"}
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#E8EDF5", true: "#BBDEFB" }}
              thumbColor={darkMode ? "#1565C0" : "#9AA5B4"}
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
            onPress={() => navigation.navigate("Result")}
          >
            <View style={[styles.settingIcon, { backgroundColor: "#E8F0FE" }]}>
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

          <TouchableOpacity style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: "#FFF3E0" }]}>
              <Text style={styles.settingEmoji}>ℹ️</Text>
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isTE ? "VaidyaAI గురించి" : "About VaidyaAI"}
              </Text>
              <Text style={styles.settingDesc}>Version 1.0.0</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={[styles.settingIcon, { backgroundColor: "#E8F0FE" }]}>
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
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>
            🚪 {isTE ? "లాగ్అవుట్" : "Logout"}
          </Text>
        </TouchableOpacity>

        {/* APP VERSION */}
        <Text style={styles.versionText}>
          VaidyaAI v1.0.0 · Made in India 🇮🇳
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FC" },
  profileHero: {
    backgroundColor: "#1565C0",
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
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 20, fontWeight: "800", color: "#fff" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: "800", color: "#fff" },
  profileEmail: { fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  profileLocation: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  editBtnText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  scrollContent: { padding: 14, paddingBottom: 100 },
  groupLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9AA5B4",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 6,
    paddingLeft: 4,
  },
  group: {
    backgroundColor: "#fff",
    borderRadius: 17,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8EDF5",
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
  settingTitle: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  settingDesc: { fontSize: 10, color: "#9AA5B4", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#E8EDF5", marginLeft: 60 },
  langToggle: {
    flexDirection: "row",
    backgroundColor: "#F4F7FC",
    borderRadius: 20,
    padding: 3,
    gap: 2,
    borderWidth: 1.5,
    borderColor: "#E8EDF5",
  },
  langOpt: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16 },
  langOptActive: { backgroundColor: "#1565C0" },
  langOptText: { fontSize: 11, fontWeight: "800", color: "#9AA5B4" },
  langOptTextActive: { color: "#fff" },
  chevron: { fontSize: 20, color: "#9AA5B4" },
  logoutBtn: {
    backgroundColor: "#FFEBEE",
    borderRadius: 15,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  logoutText: { fontSize: 14, fontWeight: "800", color: "#C62828" },
  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: "#9AA5B4",
    marginTop: 16,
  },
});
