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
import { useLanguage } from "../context/LanguageContext";

export default function StoresScreen() {
  const { lang } = useLanguage();
  const isTE = lang === "te";
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locError, setLocError] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    setLoading(true);
    setLocError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocError(
          "Location permission denied. Enable GPS to find nearby stores.",
        );
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    } catch (e) {
      setLocError("Could not get location: " + e.message);
    }
    setLoading(false);
  };

  const openGoogleMapsPharmacy = () => {
    if (!userLocation) return;
    const { lat, lng } = userLocation;
    const url = `https://www.google.com/maps/search/pharmacy/@${lat},${lng},15z`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Nearby Stores</Text>
          <Text style={styles.headerSub}>
            {isTE ? "దగ్గరలో మెడికల్ షాపులు" : "Find pharmacies near you"}
          </Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={getLocation}>
          <Text style={styles.refreshIcon}>🔄</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* LOCATION STATUS */}
        {loading ? (
          <View style={styles.locBox}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.locText}>Getting your location...</Text>
          </View>
        ) : locError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorIcon}>📍</Text>
            <Text style={styles.errorText}>{locError}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={getLocation}>
              <Text style={styles.retryBtnText}>🔄 Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.locSuccessBox}>
            <Text style={styles.locSuccessText}>
              📍 Location found! {userLocation?.lat.toFixed(4)},{" "}
              {userLocation?.lng.toFixed(4)}
            </Text>
          </View>
        )}

        {/* MAIN ACTION BUTTON */}
        {!loading && !locError && (
          <TouchableOpacity
            style={styles.mainBtn}
            onPress={openGoogleMapsPharmacy}
          >
            <Text style={styles.mainBtnIcon}>🗺️</Text>
            <View>
              <Text style={styles.mainBtnTitle}>Find Pharmacies Near Me</Text>
              <Text style={styles.mainBtnSub}>
                Opens Google Maps with nearby pharmacies
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* QUICK SEARCH BUTTONS */}
        {!loading && !locError && (
          <View style={styles.quickSection}>
            <Text style={styles.sectionTitle}>Quick Search</Text>

            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => {
                const { lat, lng } = userLocation;
                Linking.openURL(
                  `https://www.google.com/maps/search/pharmacy+near+me/@${lat},${lng},14z`,
                );
              }}
            >
              <Text style={styles.quickBtnIcon}>💊</Text>
              <View style={styles.quickBtnText}>
                <Text style={styles.quickBtnTitle}>Pharmacies</Text>
                <Text style={styles.quickBtnSub}>మందుల దుకాణాలు</Text>
              </View>
              <Text style={styles.quickBtnArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => {
                const { lat, lng } = userLocation;
                Linking.openURL(
                  `https://www.google.com/maps/search/medical+store/@${lat},${lng},14z`,
                );
              }}
            >
              <Text style={styles.quickBtnIcon}>🏥</Text>
              <View style={styles.quickBtnText}>
                <Text style={styles.quickBtnTitle}>Medical Stores</Text>
                <Text style={styles.quickBtnSub}>మెడికల్ షాపులు</Text>
              </View>
              <Text style={styles.quickBtnArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => {
                const { lat, lng } = userLocation;
                Linking.openURL(
                  `https://www.google.com/maps/search/hospital/@${lat},${lng},14z`,
                );
              }}
            >
              <Text style={styles.quickBtnIcon}>🏨</Text>
              <View style={styles.quickBtnText}>
                <Text style={styles.quickBtnTitle}>Hospitals</Text>
                <Text style={styles.quickBtnSub}>ఆసుపత్రులు</Text>
              </View>
              <Text style={styles.quickBtnArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => {
                const { lat, lng } = userLocation;
                Linking.openURL(
                  `https://www.google.com/maps/search/doctor/@${lat},${lng},14z`,
                );
              }}
            >
              <Text style={styles.quickBtnIcon}>👨‍⚕️</Text>
              <View style={styles.quickBtnText}>
                <Text style={styles.quickBtnTitle}>Doctors</Text>
                <Text style={styles.quickBtnSub}>వైద్యులు</Text>
              </View>
              <Text style={styles.quickBtnArrow}>›</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* HOW IT WORKS */}
        {!loading && !locError && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>ℹ️ How it works</Text>
            <Text style={styles.infoText}>
              Tap any button above to open Google Maps with real nearby stores
              based on your current location. You can call them and get
              directions directly from Google Maps.
            </Text>
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 16, fontWeight: "800", color: Colors.textDark },
  headerSub: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  refreshBtn: {
    width: 38,
    height: 38,
    backgroundColor: Colors.primaryBg,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  refreshIcon: { fontSize: 18 },
  scrollContent: { padding: 16, paddingBottom: 90 },
  locBox: { alignItems: "center", padding: 30, gap: 12 },
  locText: { fontSize: 14, color: Colors.textMuted, fontWeight: "600" },
  errorBox: {
    alignItems: "center",
    backgroundColor: Colors.tagOrangeBg,
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  errorIcon: { fontSize: 36 },
  errorText: {
    fontSize: 13,
    color: Colors.tagOrangeText,
    textAlign: "center",
    fontWeight: "600",
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 6,
  },
  retryBtnText: { color: Colors.white, fontWeight: "800", fontSize: 13 },
  locSuccessBox: {
    backgroundColor: Colors.tagGreenBg,
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  locSuccessText: {
    fontSize: 11,
    color: Colors.tagGreenText,
    fontWeight: "600",
    textAlign: "center",
  },
  mainBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  mainBtnIcon: { fontSize: 32 },
  mainBtnTitle: { fontSize: 15, fontWeight: "800", color: Colors.white },
  mainBtnSub: { fontSize: 11, color: Colors.whiteMuted, marginTop: 3 },
  quickSection: { gap: 10, marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 4,
  },
  quickBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickBtnIcon: { fontSize: 28 },
  quickBtnText: { flex: 1 },
  quickBtnTitle: { fontSize: 14, fontWeight: "700", color: Colors.textDark },
  quickBtnSub: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  quickBtnArrow: { fontSize: 22, color: Colors.textMuted },
  infoBox: {
    backgroundColor: Colors.primaryBg,
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  infoTitle: { fontSize: 13, fontWeight: "800", color: Colors.primary },
  infoText: { fontSize: 12, color: Colors.textMedium, lineHeight: 18 },
});
