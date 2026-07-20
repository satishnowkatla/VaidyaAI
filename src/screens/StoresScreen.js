import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/colors";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useLanguage } from "../context/LanguageContext";

const quickActions = [
  { key: "pharmacy", icon: "medkit", title: "Pharmacies", sub: "మందుల దుకాణాలు", query: "pharmacy+near+me" },
  { key: "medical", icon: "business", title: "Medical Stores", sub: "మెడికల్ షాపులు", query: "medical+store" },
  { key: "hospital", icon: "heart", title: "Hospitals", sub: "ఆసుపత్రులు", query: "hospital" },
  { key: "doctor", icon: "person", title: "Doctors", sub: "వైద్యులు", query: "doctor" },
];

export default function StoresScreen() {
  const { lang } = useLanguage();
  const isTE = lang === "te";
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locError, setLocError] = useState(null);

  useEffect(() => { getLocation(); }, []);

  const getLocation = async () => {
    setLoading(true);
    setLocError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocError("Location permission denied. Enable GPS to find nearby stores.");
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    } catch (e) {
      setLocError("Could not get location: " + e.message);
    }
    setLoading(false);
  };

  const openMaps = (query) => {
    if (!userLocation) return;
    const { lat, lng } = userLocation;
    Linking.openURL(`https://www.google.com/maps/search/${query}/@${lat},${lng},14z`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Gradient Header ── */}
      <LinearGradient
        colors={Colors.gradient.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>
              {isTE ? "దగ్గరలో మెడికల్ షాపులు" : "Nearby Stores"}
            </Text>
            <Text style={styles.headerSub}>
              {isTE ? "దగ్గరలో మెడికల్ షాపులు" : "Find pharmacies near you"}
            </Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn} onPress={getLocation} activeOpacity={0.7}>
            <Ionicons name="refresh" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Location Status ── */}
        {loading ? (
          <View style={styles.locBox}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.locText}>Getting your location...</Text>
          </View>
        ) : locError ? (
          <View style={styles.errorBox}>
            <View style={styles.errorIconCircle}>
              <Ionicons name="location" size={28} color={Colors.warningText} />
            </View>
            <Text style={styles.errorText}>{locError}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={getLocation} activeOpacity={0.8}>
              <Ionicons name="refresh" size={16} color={Colors.white} />
              <Text style={styles.retryBtnText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.locSuccessBox}>
            <Ionicons name="location" size={16} color={Colors.tagGreenText} />
            <Text style={styles.locSuccessText}>
              Location found · {userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)}
            </Text>
          </View>
        )}

        {/* ── Main Action ── */}
        {!loading && !locError && (
          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => openMaps("pharmacy")}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={Colors.gradient.accent}
              style={styles.mainBtnGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.mainIconCircle}>
                <Ionicons name="map" size={28} color={Colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.mainBtnTitle}>Find Pharmacies Near Me</Text>
                <Text style={styles.mainBtnSub}>Opens Google Maps with nearby pharmacies</Text>
              </View>
              <Ionicons name="open-outline" size={20} color={Colors.whiteMuted} />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* ── Quick Search 2x2 Grid ── */}
        {!loading && !locError && (
          <>
            <Text style={styles.sectionTitle}>Quick Search</Text>
            <View style={styles.grid}>
              {quickActions.map((a) => (
                <TouchableOpacity
                  key={a.key}
                  style={styles.gridCard}
                  onPress={() => openMaps(a.query)}
                  activeOpacity={0.7}
                >
                  <View style={styles.gridIconCircle}>
                    <Ionicons name={a.icon} size={24} color={Colors.primary} />
                  </View>
                  <Text style={styles.gridTitle}>{a.title}</Text>
                  <Text style={styles.gridSub}>{a.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* ── How It Works ── */}
        {!loading && !locError && (
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={20} color={Colors.primary} />
              <Text style={styles.infoTitle}>How it works</Text>
            </View>
            <Text style={styles.infoText}>
              Tap any button above to open Google Maps with real nearby stores based on your
              current location. You can call them and get directions directly from Google Maps.
            </Text>
          </View>
        )}
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
  },
  headerTitle: { ...Typography.h1, color: Colors.white },
  headerSub: { ...Typography.caption, color: Colors.whiteMuted, marginTop: 2 },
  refreshBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContent: { padding: Spacing.lg, paddingBottom: 100 },

  locBox: { alignItems: "center", padding: Spacing.xxxl, gap: Spacing.md },
  locText: { ...Typography.body, color: Colors.textMuted, fontWeight: "600" },

  errorBox: {
    alignItems: "center",
    backgroundColor: Colors.tagOrangeBg,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  errorIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(230,81,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    ...Typography.body,
    color: Colors.tagOrangeText,
    textAlign: "center",
    fontWeight: "600",
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: Spacing.sm,
  },
  retryBtnText: { color: Colors.white, fontWeight: "800", fontSize: 13 },

  locSuccessBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.tagGreenBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  locSuccessText: {
    ...Typography.caption,
    color: Colors.tagGreenText,
    fontWeight: "600",
    flex: 1,
  },

  mainBtn: { marginBottom: Spacing.xl, borderRadius: Radius.xl, overflow: "hidden" },
  mainBtnGrad: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  mainIconCircle: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainBtnTitle: { ...Typography.bodyBold, color: Colors.white, fontSize: 15 },
  mainBtnSub: { ...Typography.caption, color: Colors.whiteMuted, marginTop: 2 },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  gridCard: {
    width: "47%",
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: "flex-start",
    gap: Spacing.sm,
    ...Shadow.md,
  },
  gridIconCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },
  gridTitle: { ...Typography.captionBold, color: Colors.textPrimary },
  gridSub: { ...Typography.micro, color: Colors.textMuted },

  infoBox: {
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  infoTitle: { ...Typography.bodyBold, color: Colors.primary },
  infoText: { ...Typography.caption, color: Colors.textMedium, lineHeight: 18 },
});
