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

const teluguTranslations = {
  uses: "ఉపయోగాలు",
  dosage: "మోతాదు",
  sideEffects: "దుష్ప్రభావాలు",
  warnings: "హెచ్చరికలు",
  category: "వర్గం",
  safe: "సురక్షితం",
  details: "మందు వివరాలు",
  stores: "దగ్గరలో మెడికల్ షాపులు",
  noAlcohol: "మద్యంతో తీసుకోవద్దు",
  liver: "కాలేయ సమస్యలు ఉంటే వాడవద్దు",
  match: "సరిపోలిక",
};

export default function ResultScreen({ navigation, route }) {
  const { t, lang } = useLanguage();
  const isTE = lang === "te";

  const medicine = route?.params?.medicine || {
    name: "Paracetamol 500mg",
    uses: "Fever, Headache, Body Pain",
    dosage: "1 tablet every 6 hours. Do not exceed 4 tablets in 24 hours.",
    sideEffects: "Nausea, Stomach upset, Allergic reactions in rare cases.",
    warnings: "Keep out of reach of children. Store in cool dry place.",
    category: "Analgesic",
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>
            {isTE ? teluguTranslations.details : "Medicine Details"}
          </Text>
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareIcon}>↗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          {/* MEDICINE TOP CARD */}
          <View style={styles.topCard}>
            <View style={styles.medIcon}>
              <Text style={{ fontSize: 28 }}>💊</Text>
            </View>
            <View style={styles.medInfo}>
              <Text style={styles.medName}>{medicine.name}</Text>
              <Text style={styles.medSub}>
                {isTE ? teluguTranslations.category : "Category"}:{" "}
                {medicine.category}
              </Text>
              <View style={styles.tagRow}>
                <View style={styles.tagGreen}>
                  <Text style={styles.tagGreenText}>
                    ✓ {isTE ? teluguTranslations.safe : "Safe"}
                  </Text>
                </View>
                <View style={styles.tagBlue}>
                  <Text style={styles.tagBlueText}>
                    AI {isTE ? teluguTranslations.match : "Match"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* INFO GRID */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                {isTE ? teluguTranslations.uses : "Uses"}
              </Text>
              <Text style={styles.infoVal}>{medicine.uses}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                {isTE ? teluguTranslations.dosage : "Dosage"}
              </Text>
              <Text style={styles.infoVal}>{medicine.dosage}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                {isTE ? teluguTranslations.sideEffects : "Side Effects"}
              </Text>
              <Text style={styles.infoVal}>{medicine.sideEffects}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>
                {isTE ? teluguTranslations.category : "Category"}
              </Text>
              <Text style={styles.infoVal}>{medicine.category}</Text>
            </View>
          </View>

          {/* WARNING BOX */}
          <View style={styles.warnBox}>
            <Text style={styles.warnIcon}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.warnText}>
                {isTE
                  ? teluguTranslations.noAlcohol
                  : "Do not take with alcohol"}
              </Text>
              <Text style={styles.warnSub}>{medicine.warnings}</Text>
            </View>
          </View>

          {/* DANGER BOX */}
          <View style={styles.dangerBox}>
            <Text style={styles.dangerIcon}>🚫</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.dangerText}>
                {isTE
                  ? teluguTranslations.liver
                  : "Avoid if you have liver problems"}
              </Text>
            </View>
          </View>

          {/* SCAN AGAIN BUTTON */}
          <TouchableOpacity
            style={styles.scanAgainBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.scanAgainIcon}>📷</Text>
            <Text style={styles.scanAgainText}>
              {isTE ? "మళ్ళీ స్కాన్ చేయండి" : "Scan Another Medicine"}
            </Text>
          </TouchableOpacity>

          {/* FIND STORES BUTTON */}
          <TouchableOpacity
            style={styles.storesBtn}
            onPress={() =>
              navigation.navigate("Main", {
                screen: "Stores",
              })
            }
          >
            <Text style={styles.storesBtnIcon}>📍</Text>
            <Text style={styles.storesBtnText}>
              {isTE ? teluguTranslations.stores : "Find Nearby Medical Stores"}
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
    gap: 10,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 18, color: "#1565C0", fontWeight: "700" },
  headerTitle: { flex: 1 },
  headerText: { fontSize: 15, fontWeight: "800", color: "#0D1B2A" },
  shareBtn: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
  },
  shareIcon: { fontSize: 16, color: "#1565C0", fontWeight: "700" },
  pad: { padding: 14 },
  topCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E8EDF5",
  },
  medIcon: {
    width: 54,
    height: 54,
    backgroundColor: "#E8F0FE",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  medInfo: { flex: 1 },
  medName: { fontSize: 16, fontWeight: "800", color: "#0D1B2A" },
  medSub: { fontSize: 12, color: "#4A5568", marginTop: 2 },
  tagRow: { flexDirection: "row", gap: 6, marginTop: 7, flexWrap: "wrap" },
  tagGreen: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tagGreenText: { fontSize: 10, fontWeight: "700", color: "#2E7D32" },
  tagBlue: {
    backgroundColor: "#E8F0FE",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  tagBlueText: { fontSize: 10, fontWeight: "700", color: "#1565C0" },
  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  infoCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 11,
    borderWidth: 1,
    borderColor: "#E8EDF5",
  },
  infoLabel: { fontSize: 10, color: "#9AA5B4", fontWeight: "600" },
  infoVal: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0D1B2A",
    marginTop: 3,
    lineHeight: 18,
  },
  warnBox: {
    backgroundColor: "#FFF3E0",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
    borderLeftWidth: 3,
    borderLeftColor: "#E65100",
  },
  warnIcon: { fontSize: 16 },
  warnText: { fontSize: 12, fontWeight: "700", color: "#E65100" },
  warnSub: { fontSize: 10, color: "#BF6000", marginTop: 2, lineHeight: 16 },
  dangerBox: {
    backgroundColor: "#FFEBEE",
    borderRadius: 14,
    padding: 12,
    marginTop: 9,
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
    borderLeftWidth: 3,
    borderLeftColor: "#C62828",
  },
  dangerIcon: { fontSize: 16 },
  dangerText: { fontSize: 12, fontWeight: "700", color: "#C62828" },
  scanAgainBtn: {
    backgroundColor: "#E8F0FE",
    borderRadius: 15,
    padding: 13,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  scanAgainIcon: { fontSize: 16 },
  scanAgainText: { fontSize: 13, fontWeight: "800", color: "#1565C0" },
  storesBtn: {
    backgroundColor: "#1565C0",
    borderRadius: 15,
    padding: 14,
    marginTop: 9,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  storesBtnIcon: { fontSize: 16 },
  storesBtnText: { fontSize: 13, fontWeight: "800", color: "#fff" },
});
