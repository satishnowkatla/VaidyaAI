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
import Colors from "../constants/colors";
import { LIBRARY_MEDICINES } from "../data/libraryMedicines";

const filters = [
  { label: "All", value: "All" },
  { label: "Tablet", value: "Tablet" },
  { label: "Capsule", value: "Capsule" },
  { label: "Syrup", value: "Syrup" },
  { label: "Injection", value: "Injection" },
];

export default function LibraryScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = LIBRARY_MEDICINES.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || m.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

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
            placeholderTextColor={Colors.textMuted}
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
              onPress={() => navigation.navigate("Result", { medicine: { name: med.name, uses: med.uses, dosage: med.dosage, sideEffects: med.sideEffects, warnings: med.warnings, category: med.category } })}
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
  container: { flex: 1, backgroundColor: Colors.background, paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: "800", color: Colors.textDark },
  headerSub: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  scanBtn: {
    backgroundColor: Colors.primaryBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  scanBtnText: { fontSize: 12, fontWeight: "700", color: Colors.primary },
  searchWrap: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 8,
  },
  searchIcon: { fontSize: 14 },
  searchInput: { flex: 1, fontSize: 13, color: Colors.textDark },
  clearBtn: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: "700",
    paddingHorizontal: 4,
  },
  filterWrap: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: "700", color: Colors.textMedium },
  chipTextActive: { color: Colors.white },
  countRow: { paddingHorizontal: 16, paddingVertical: 8 },
  countText: { fontSize: 11, color: Colors.textMuted, fontWeight: "600" },
  listContent: { paddingHorizontal: 14, paddingBottom: 90 },
  medRow: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: Colors.border,
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
  medName: { fontSize: 13, fontWeight: "700", color: Colors.textDark },
  medDesc: { fontSize: 10, color: Colors.textMedium, marginTop: 2 },
  catTag: {
    alignSelf: "flex-start",
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 7,
  },
  catText: { fontSize: 10, fontWeight: "700" },
  arrow: { fontSize: 22, color: Colors.textMuted, fontWeight: "300" },
  emptyBox: { alignItems: "center", paddingTop: 80 },
  emptyIcon: { fontSize: 48 },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textDark,
    marginTop: 14,
  },
  emptySub: { fontSize: 12, color: Colors.textMuted, marginTop: 6 },
});
