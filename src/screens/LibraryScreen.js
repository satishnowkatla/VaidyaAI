import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/colors";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { LIBRARY_MEDICINES } from "../data/libraryMedicines";
import { useTheme } from "../context/ThemeContext";

const filters = [
  { label: "All", value: "All", icon: "grid" },
  { label: "Tablet", value: "Tablet", icon: "medical" },
  { label: "Capsule", value: "Capsule", icon: "ellipse" },
  { label: "Syrup", value: "Syrup", icon: "water" },
  { label: "Injection", value: "Injection", icon: "fitness" },
];

export default function LibraryScreen({ navigation }) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = LIBRARY_MEDICINES.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || m.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* ── Gradient Header ── */}
      <LinearGradient
        colors={colors.gradient.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Medicine Library</Text>
            <Text style={styles.headerSub}>200+ medicines available</Text>
          </View>
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() => navigation.navigate("Scan")}
            activeOpacity={0.7}
          >
            <Ionicons name="camera" size={16} color={colors.primary} />
            <Text style={styles.scanBtnText}>Scan</Text>
          </TouchableOpacity>
        </View>

        {/* ── Search Bar ── */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicine name..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* ── Filter Chips ── */}
      <View style={styles.filterWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((f) => {
            const active = activeFilter === f.value;
            return (
              <TouchableOpacity
                key={f.value}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveFilter(f.value)}
                activeOpacity={0.7}
              >
                {active ? (
                  <LinearGradient
                    colors={colors.gradient.primary}
                    style={styles.chipActiveGrad}
                  >
                    <Ionicons name={f.icon} size={12} color={colors.white} />
                    <Text style={styles.chipTextActive}>{f.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.chipInner}>
                    <Ionicons name={f.icon} size={12} color={colors.textMuted} />
                    <Text style={styles.chipText}>{f.label}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Count ── */}
      <View style={styles.countRow}>
        <Text style={styles.countText}>{filtered.length} medicines found</Text>
      </View>

      {/* ── Medicine List ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyBox}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="search" size={32} color={colors.primary} />
            </View>
            <Text style={styles.emptyText}>No medicines found</Text>
            <Text style={styles.emptySub}>Try a different search term</Text>
          </View>
        ) : (
          filtered.map((med) => (
            <TouchableOpacity
              key={med.id}
              style={styles.medCard}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("Result", {
                  medicine: {
                    name: med.name,
                    uses: med.uses,
                    dosage: med.dosage,
                    sideEffects: med.sideEffects,
                    warnings: med.warnings,
                    category: med.category,
                  },
                })
              }
            >
              <View style={[styles.medIconBox, { backgroundColor: med.bgColor }]}>
                <Ionicons name="medical" size={22} color={med.textColor} />
              </View>
              <View style={styles.medInfo}>
                <Text style={styles.medName}>{med.name}</Text>
                <Text style={styles.medDesc}>{med.desc}</Text>
                <View style={[styles.catTag, { backgroundColor: med.bgColor }]}>
                  <Text style={[styles.catText, { color: med.textColor }]}>
                    {med.category}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))
        )}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing.md : Spacing.xxxxl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  headerTitle: { ...Typography.h1, color: Colors.white },
  headerSub: { ...Typography.caption, color: Colors.whiteMuted, marginTop: 2 },
  scanBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  scanBtnText: { ...Typography.buttonSmall, color: Colors.primary },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  searchInput: { flex: 1, ...Typography.body, color: Colors.textPrimary },

  filterWrap: { borderBottomWidth: 1, borderBottomColor: Colors.borderLight },
  filterContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  chip: {
    borderRadius: Radius.pill,
    overflow: "hidden",
  },
  chipActive: {},
  chipActiveGrad: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  chipInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipText: { ...Typography.captionBold, color: Colors.textMedium },
  chipTextActive: { ...Typography.captionBold, color: Colors.white },

  countRow: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  countText: { ...Typography.micro, color: Colors.textMuted },

  listContent: { paddingHorizontal: Spacing.lg },

  medCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  medIconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  medInfo: { flex: 1 },
  medName: { ...Typography.captionBold, color: Colors.textPrimary, fontSize: 13 },
  medDesc: { ...Typography.micro, color: Colors.textMedium, marginTop: 2 },
  catTag: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.xs,
  },
  catText: { ...Typography.microBold },

  emptyBox: { alignItems: "center", paddingTop: 80 },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  emptyText: { ...Typography.h3, color: Colors.textPrimary },
  emptySub: { ...Typography.caption, color: Colors.textMuted, marginTop: Spacing.sm },
});
