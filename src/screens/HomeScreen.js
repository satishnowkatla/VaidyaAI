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
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoPlus}>+</Text>
          </View>
          <Text style={styles.logoText}>VaidyaAI</Text>
        </View>
        <TouchableOpacity style={styles.langToggle} onPress={toggleLanguage}>
          <Text style={[styles.langOpt, lang === "en" && styles.langActive]}>
            EN
          </Text>
          <Text style={[styles.langOpt, lang === "te" && styles.langActive]}>
            తె
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          <Text style={styles.greetSm}>{t("appName")}</Text>
          <Text style={styles.greetName}>Ravi Kumar 👋</Text>
          <TouchableOpacity
            style={styles.heroCard}
            onPress={() => navigation.navigate("Scan")}
          >
            <View>
              <Text style={styles.heroTitle}>{t("scan")}</Text>
              <Text style={styles.heroSub}>{t("tagline")}</Text>
            </View>
            <View style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>{t("scanNow")}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.quickGrid}>
            <TouchableOpacity
              style={styles.quickCard}
              onPress={() => navigation.navigate("Library")}
            >
              <Text style={styles.quickIcon}>📚</Text>
              <Text style={styles.quickText}>{t("library")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickCard}
              onPress={() => navigation.navigate("Stores")}
            >
              <Text style={styles.quickIcon}>📍</Text>
              <Text style={styles.quickText}>{t("stores")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>{t("recentScans")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("ScanHistory")}>
            <Text style={styles.seeAll}>{t("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.recentCard}
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
          <View style={styles.recentIcon}>
            <Text>💊</Text>
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Paracetamol 500mg</Text>
            <Text style={styles.recentTime}>Today 9:30 AM</Text>
          </View>
          <View style={styles.safeTag}>
            <Text style={styles.safeText}>{t("safe")}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.recentCard, { marginBottom: 20 }]}
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
          <View style={styles.recentIcon}>
            <Text>💊</Text>
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Metformin 850mg</Text>
            <Text style={styles.recentTime}>Yesterday 7:00 PM</Text>
          </View>
          <View style={styles.safeTag}>
            <Text style={styles.safeText}>{t("safe")}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: {
    width: 34,
    height: 34,
    backgroundColor: Colors.primary,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  logoPlus: { color: Colors.white, fontSize: 20, fontWeight: "bold" },
  logoText: { fontSize: 16, fontWeight: "800", color: Colors.primary },
  langToggle: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 3,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  langOpt: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "800",
    color: Colors.textMuted,
    borderRadius: 16,
  },
  langActive: { backgroundColor: Colors.primary, color: Colors.white },
  pad: { padding: 16 },
  greetSm: { fontSize: 12, color: Colors.textMuted },
  greetName: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textDark,
    marginTop: 2,
  },
  heroCard: {
    marginTop: 14,
    backgroundColor: Colors.primary,
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTitle: { fontSize: 17, fontWeight: "800", color: Colors.white },
  heroSub: { fontSize: 11, color: Colors.whiteMuted, marginTop: 4 },
  heroBtn: {
    backgroundColor: Colors.white,
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  heroBtnText: { fontSize: 12, fontWeight: "800", color: Colors.primary },
  quickGrid: { flexDirection: "row", gap: 10, marginTop: 12 },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    gap: 7,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  quickIcon: { fontSize: 28 },
  quickText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textDark,
    textAlign: "center",
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: Colors.textDark },
  seeAll: { fontSize: 11, color: Colors.primary, fontWeight: "700" },
  recentCard: {
    marginHorizontal: 16,
    marginBottom: 9,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recentIcon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primaryBg,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  recentInfo: { flex: 1 },
  recentName: { fontSize: 13, fontWeight: "700", color: Colors.textDark },
  recentTime: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  safeTag: {
    backgroundColor: Colors.tagGreenBg,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  safeText: { fontSize: 10, fontWeight: "700", color: Colors.tagGreenText },
});
