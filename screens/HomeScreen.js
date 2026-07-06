import React from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../services/LanguageContext";

export default function HomeScreen({ navigation }) {
  const { t, lang, toggleLanguage } = useLanguage();
  return (
    <View style={styles.container}>
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
          <Text style={styles.seeAll}>{t("seeAll")}</Text>
        </View>
        <TouchableOpacity
          style={styles.recentCard}
          onPress={() => navigation.navigate("Result")}
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
        <TouchableOpacity style={[styles.recentCard, { marginBottom: 20 }]}>
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
    backgroundColor: "#F4F7FC",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: {
    width: 34,
    height: 34,
    backgroundColor: "#1565C0",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  logoPlus: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  logoText: { fontSize: 16, fontWeight: "800", color: "#1565C0" },
  langToggle: {
    flexDirection: "row",
    backgroundColor: "#F4F7FC",
    borderRadius: 20,
    padding: 3,
    borderWidth: 1.5,
    borderColor: "#E8EDF5",
  },
  langOpt: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "800",
    color: "#9AA5B4",
    borderRadius: 16,
  },
  langActive: { backgroundColor: "#1565C0", color: "#fff" },
  pad: { padding: 16 },
  greetSm: { fontSize: 12, color: "#9AA5B4" },
  greetName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0D1B2A",
    marginTop: 2,
  },
  heroCard: {
    marginTop: 14,
    backgroundColor: "#1565C0",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTitle: { fontSize: 17, fontWeight: "800", color: "#fff" },
  heroSub: { fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 4 },
  heroBtn: {
    backgroundColor: "#fff",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  heroBtnText: { fontSize: 12, fontWeight: "800", color: "#1565C0" },
  quickGrid: { flexDirection: "row", gap: 10, marginTop: 12 },
  quickCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    gap: 7,
    borderWidth: 1.5,
    borderColor: "#E8EDF5",
  },
  quickIcon: { fontSize: 28 },
  quickText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0D1B2A",
    textAlign: "center",
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: "#0D1B2A" },
  seeAll: { fontSize: 11, color: "#1565C0", fontWeight: "700" },
  recentCard: {
    marginHorizontal: 16,
    marginBottom: 9,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E8EDF5",
  },
  recentIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#E8F0FE",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  recentInfo: { flex: 1 },
  recentName: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  recentTime: { fontSize: 10, color: "#9AA5B4", marginTop: 2 },
  safeTag: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  safeText: { fontSize: 10, fontWeight: "700", color: "#2E7D32" },
});
