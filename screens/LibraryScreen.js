import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../services/LanguageContext";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    desc: "Fever · Pain Relief",
    category: "Tablet",
    bgColor: "#E8F0FE",
    textColor: "#1565C0",
  },
  {
    id: 2,
    name: "Metformin 850mg",
    desc: "Diabetes · Blood Sugar",
    category: "Tablet",
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
  },
  {
    id: 3,
    name: "Amlodipine 5mg",
    desc: "Blood Pressure",
    category: "Tablet",
    bgColor: "#FFF3E0",
    textColor: "#E65100",
  },
  {
    id: 4,
    name: "Azithromycin 500mg",
    desc: "Antibiotic · Infections",
    category: "Tablet",
    bgColor: "#E8F0FE",
    textColor: "#1565C0",
  },
  {
    id: 5,
    name: "Pantoprazole 40mg",
    desc: "Acidity · Gastric",
    category: "Tablet",
    bgColor: "#FFEBEE",
    textColor: "#C62828",
  },
  {
    id: 6,
    name: "Vitamin D3 60K IU",
    desc: "Supplement · Bone Health",
    category: "Capsule",
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
  },
  {
    id: 7,
    name: "Cetirizine 10mg",
    desc: "Allergy · Cold",
    category: "Tablet",
    bgColor: "#E8F0FE",
    textColor: "#1565C0",
  },
  {
    id: 8,
    name: "Amoxicillin 500mg",
    desc: "Antibiotic · Bacterial",
    category: "Capsule",
    bgColor: "#FFF3E0",
    textColor: "#E65100",
  },
  {
    id: 9,
    name: "Omeprazole 20mg",
    desc: "Acidity · Ulcer",
    category: "Capsule",
    bgColor: "#FFEBEE",
    textColor: "#C62828",
  },
  {
    id: 10,
    name: "Atorvastatin 10mg",
    desc: "Cholesterol · Heart",
    category: "Tablet",
    bgColor: "#E8F0FE",
    textColor: "#1565C0",
  },
  {
    id: 11,
    name: "Cough Syrup 100ml",
    desc: "Cough · Cold Relief",
    category: "Syrup",
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
  },
  {
    id: 12,
    name: "Insulin 100IU",
    desc: "Diabetes · Blood Sugar",
    category: "Injection",
    bgColor: "#FFF3E0",
    textColor: "#E65100",
  },
];

const filters = [
  { label: "All", value: "All" },
  { label: "Tablet", value: "Tablet" },
  { label: "Capsule", value: "Capsule" },
  { label: "Syrup", value: "Syrup" },
  { label: "Injection", value: "Injection" },
];

export default function LibraryScreen({ navigation }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = medicines.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || m.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Medicine Library</Text>
          <Text style={styles.headerSub}>200+ medicines available</Text>
        </View>
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => navigation.navigate("Scan")}
        >
          <Text style={styles.scanBtnText}>📷 Scan</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicine name..."
            placeholderTextColor="#9AA5B4"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* FILTER CHIPS */}
      <View style={styles.filterWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[
                styles.chip,
                activeFilter === f.value && styles.chipActive,
              ]}
              onPress={() => setActiveFilter(f.value)}
            >
              <Text
                style={[
                  styles.chipText,
                  activeFilter === f.value && styles.chipTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* COUNT */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>{filtered.length} medicines found</Text>
      </View>

      {/* MEDICINE LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No medicines found</Text>
            <Text style={styles.emptySub}>Try a different search term</Text>
          </View>
        ) : (
          filtered.map((med) => (
            <TouchableOpacity
              key={med.id}
              style={styles.medRow}
              onPress={() => navigation.navigate("Result")}
            >
              {/* ICON */}
              <View
                style={[styles.medIconBox, { backgroundColor: med.bgColor }]}
              >
                <Text style={styles.medEmoji}>💊</Text>
              </View>

              {/* INFO */}
              <View style={styles.medInfo}>
                <Text style={styles.medName}>{med.name}</Text>
                <Text style={styles.medDesc}>{med.desc}</Text>
                <View style={[styles.catTag, { backgroundColor: med.bgColor }]}>
                  <Text style={[styles.catText, { color: med.textColor }]}>
                    {med.category}
                  </Text>
                </View>
              </View>

              {/* ARROW */}
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FC", paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
  },
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: "800", color: "#0D1B2A" },
  headerSub: { fontSize: 10, color: "#9AA5B4", marginTop: 2 },
  scanBtn: {
    backgroundColor: "#E8F0FE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  scanBtnText: { fontSize: 12, fontWeight: "700", color: "#1565C0" },
  searchWrap: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7FC",
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: "#E8EDF5",
    gap: 8,
  },
  searchIcon: { fontSize: 14 },
  searchInput: { flex: 1, fontSize: 13, color: "#0D1B2A" },
  clearBtn: {
    fontSize: 14,
    color: "#9AA5B4",
    fontWeight: "700",
    paddingHorizontal: 4,
  },
  filterWrap: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF5",
  },
  filterContent: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    flexDirection: "row",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E8EDF5",
    backgroundColor: "#fff",
  },
  chipActive: { backgroundColor: "#1565C0", borderColor: "#1565C0" },
  chipText: { fontSize: 12, fontWeight: "700", color: "#4A5568" },
  chipTextActive: { color: "#fff" },
  countRow: { paddingHorizontal: 16, paddingVertical: 8 },
  countText: { fontSize: 11, color: "#9AA5B4", fontWeight: "600" },
  listContent: { paddingHorizontal: 14, paddingBottom: 90 },
  medRow: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#E8EDF5",
  },
  medIconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  medEmoji: { fontSize: 22 },
  medInfo: { flex: 1 },
  medName: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  medDesc: { fontSize: 10, color: "#4A5568", marginTop: 2 },
  catTag: {
    alignSelf: "flex-start",
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 7,
  },
  catText: { fontSize: 10, fontWeight: "700" },
  arrow: { fontSize: 22, color: "#9AA5B4", fontWeight: "300" },
  emptyBox: { alignItems: "center", paddingTop: 80 },
  emptyIcon: { fontSize: 48 },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0D1B2A",
    marginTop: 14,
  },
  emptySub: { fontSize: 12, color: "#9AA5B4", marginTop: 6 },
});
