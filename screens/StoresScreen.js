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

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
}

const NEARBY_STORES = [
  { id: 1, name: "Medical Store 1", type: "pharmacy" },
  { id: 2, name: "Medical Store 2", type: "pharmacy" },
  { id: 3, name: "Medical Store 3", type: "pharmacy" },
];

export default function StoresScreen() {
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

  const openDirections = (lat, lng, name) => {
    const dest = `${lat},${lng}`;
    const label = encodeURIComponent(name);
    const androidUrl = `google.navigation:q=${dest}`;
    const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
    Linking.canOpenURL(androidUrl)
      .then((ok) => Linking.openURL(ok ? androidUrl : webUrl))
      .catch(() => Linking.openURL(webUrl));
  };

  const openNearbyInMaps = () => {
    if (!userLocation) return;
    const { lat, lng } = userLocation;
    const url = `https://www.google.com/maps/search/medical+store+pharmacy/@${lat},${lng},15z`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Nearby Stores</Text>
          <Text style={styles.headerSub}>దగ్గరలో మెడికల్ షాపులు</Text>
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
            <ActivityIndicator size="large" color="#1565C0" />
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
    backgroundColor: "#F4F7FC",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
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
  headerTitle: { fontSize: 16, fontWeight: "800", color: "#0D1B2A" },
  headerSub: { fontSize: 10, color: "#9AA5B4", marginTop: 2 },
  refreshBtn: {
    width: 38,
    height: 38,
    backgroundColor: "#E8F0FE",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  refreshIcon: { fontSize: 18 },
  scrollContent: { padding: 16, paddingBottom: 90 },
  locBox: { alignItems: "center", padding: 30, gap: 12 },
  locText: { fontSize: 14, color: "#9AA5B4", fontWeight: "600" },
  errorBox: {
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    borderRadius: 16,
    padding: 20,
    gap: 10,
  },
  errorIcon: { fontSize: 36 },
  errorText: {
    fontSize: 13,
    color: "#E65100",
    textAlign: "center",
    fontWeight: "600",
  },
  retryBtn: {
    backgroundColor: "#1565C0",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 6,
  },
  retryBtnText: { color: "#fff", fontWeight: "800", fontSize: 13 },
  locSuccessBox: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  locSuccessText: {
    fontSize: 11,
    color: "#2E7D32",
    fontWeight: "600",
    textAlign: "center",
  },
  mainBtn: {
    backgroundColor: "#1565C0",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  mainBtnIcon: { fontSize: 32 },
  mainBtnTitle: { fontSize: 15, fontWeight: "800", color: "#fff" },
  mainBtnSub: { fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 3 },
  quickSection: { gap: 10, marginBottom: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0D1B2A",
    marginBottom: 4,
  },
  quickBtn: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E8EDF5",
  },
  quickBtnIcon: { fontSize: 28 },
  quickBtnText: { flex: 1 },
  quickBtnTitle: { fontSize: 14, fontWeight: "700", color: "#0D1B2A" },
  quickBtnSub: { fontSize: 10, color: "#9AA5B4", marginTop: 2 },
  quickBtnArrow: { fontSize: 22, color: "#9AA5B4" },
  infoBox: {
    backgroundColor: "#E8F0FE",
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  infoTitle: { fontSize: 13, fontWeight: "800", color: "#1565C0" },
  infoText: { fontSize: 12, color: "#4A5568", lineHeight: 18 },
});
