import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/colors";
import { SCAN_CONFIG } from "../constants/config";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useLanguage } from "../context/LanguageContext";
import {
  scanMedicineImage,
  searchMedicineInfo,
} from "../services/medicineService";

export default function ScanScreen({ navigation }) {
  const { t } = useLanguage();
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [facing, setFacing] = useState("back");
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [loading]);

  const captureAndScan = async () => {
    if (!cameraRef.current) return;
    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: SCAN_CONFIG.imageQuality,
        width: SCAN_CONFIG.imageWidth,
      });
      await processImage(photo.base64);
    } catch (_error) {
      setLoading(false);
      Alert.alert("Error", "Failed to capture image. Please try again.");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow gallery access");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: SCAN_CONFIG.imageQuality,
      base64: true,
    });
    if (!result.canceled && result.assets[0].base64) {
      setLoading(true);
      await processImage(result.assets[0].base64);
    }
  };

  const processImage = async (base64) => {
    try {
      const medicineName = await scanMedicineImage(base64);
      if (!medicineName) {
        setLoading(false);
        Alert.alert(
          "Not Detected",
          "Could not read the medicine name. Please try again with better lighting and hold the camera steady.",
          [{ text: "OK" }]
        );
        return;
      }
      const medicineInfo = await searchMedicineInfo(medicineName);
      setLoading(false);
      navigation.navigate("Result", { medicine: medicineInfo });
    } catch (_error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryLight} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permContainer}>
        <LinearGradient
          colors={Colors.gradient.hero}
          style={styles.permGradient}
        >
          <View style={styles.permIconCircle}>
            <Ionicons name="camera" size={40} color={Colors.white} />
          </View>
          <Text style={styles.permTitle}>Camera Permission Needed</Text>
          <Text style={styles.permSub}>
            We need camera access to scan medicine strips and identify them
            instantly
          </Text>
          <TouchableOpacity
            style={styles.permBtn}
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={Colors.gradient.accent}
              style={styles.permBtnGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="checkmark-circle" size={18} color={Colors.white} />
              <Text style={styles.permBtnText}>Allow Camera Access</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.skipBtnText}>Go Back</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <CameraView
          style={styles.camera}
          facing={facing}
          enableTorch={torch}
          ref={cameraRef}
        />
        <View style={styles.overlay}>
          {/* ── Top Bar ── */}
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent"]}
            style={styles.topGradient}
          >
            <View style={styles.scanHeader}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={20} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.scanTitle}>{t("scan")}</Text>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => setTorch(!torch)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={torch ? "flash" : "flash-outline"}
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* ── Scan Frame ── */}
          <View style={styles.frameArea}>
            <View style={styles.frameBox}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
          </View>

          {/* ── Tip Pill ── */}
          <View style={styles.tipRow}>
            <View style={styles.tipPill}>
              <Ionicons name="information-circle" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.tipText}>
                Place medicine strip inside the frame
              </Text>
            </View>
          </View>

          {/* ── Flip Button ── */}
          <View style={styles.flipRow}>
            <TouchableOpacity
              style={styles.flipBtn}
              onPress={() => setFacing(facing === "back" ? "front" : "back")}
              activeOpacity={0.7}
            >
              <Ionicons name="camera-reverse" size={18} color={Colors.white} />
              <Text style={styles.flipBtnText}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ── Bottom Panel ── */}
      <View style={styles.bottomPanel}>
        {loading ? (
          <View style={styles.loadingBox}>
            <Animated.View
              style={[
                styles.loadingCircle,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <Ionicons name="scan" size={32} color={Colors.primary} />
            </Animated.View>
            <Text style={styles.loadingMsg}>Scanning medicine...</Text>
            <Text style={styles.loadingSubMsg}>
              Reading text from image using AI
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.instructions}>
              <Text style={styles.instrTitle}>
                Hold camera steady over the medicine
              </Text>
              <Text style={styles.instrSub}>
                Make sure text on strip is clearly visible
              </Text>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.sideBtn}
                onPress={pickImage}
                activeOpacity={0.7}
              >
                <View style={styles.sideBtnIcon}>
                  <Ionicons name="images" size={22} color={Colors.primary} />
                </View>
                <Text style={styles.sideBtnTxt}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureBtn}
                onPress={captureAndScan}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={Colors.gradient.scan}
                  style={styles.captureGrad}
                >
                  <Ionicons name="camera" size={28} color={Colors.white} />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sideBtn}
                onPress={() => setTorch(!torch)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.sideBtnIcon,
                    torch && styles.sideBtnIconActive,
                  ]}
                >
                  <Ionicons
                    name={torch ? "flash" : "flash-outline"}
                    size={22}
                    color={torch ? Colors.white : Colors.primary}
                  />
                </View>
                <Text style={styles.sideBtnTxt}>
                  {torch ? "Flash On" : "Flash"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBlack },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: { flex: 1 },
  cameraWrapper: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },
  topGradient: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : Spacing.xxxxl,
    paddingBottom: Spacing.xl,
  },
  scanHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanTitle: { ...Typography.h3, color: Colors.white },

  frameArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  frameBox: {
    width: 260,
    height: 180,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: Colors.primaryLight,
    borderStyle: "solid",
  },
  cornerTL: {
    top: 0, left: 0,
    borderTopWidth: 3, borderLeftWidth: 3,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: 0, right: 0,
    borderTopWidth: 3, borderRightWidth: 3,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: 0, left: 0,
    borderBottomWidth: 3, borderLeftWidth: 3,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: 0, right: 0,
    borderBottomWidth: 3, borderRightWidth: 3,
    borderBottomRightRadius: 6,
  },

  tipRow: { alignItems: "center", paddingVertical: Spacing.md },
  tipPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  tipText: { color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600" },

  flipRow: { alignItems: "center", paddingBottom: Spacing.lg },
  flipBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: Radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  flipBtnText: { color: Colors.white, fontSize: 12, fontWeight: "700" },

  bottomPanel: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 100,
    borderTopLeftRadius: Radius.xxl,
    borderTopRightRadius: Radius.xxl,
    ...Shadow.lg,
  },
  loadingBox: { alignItems: "center", paddingVertical: Spacing.xl },
  loadingCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  loadingMsg: { ...Typography.h3, color: Colors.primary, marginTop: Spacing.sm },
  loadingSubMsg: { ...Typography.caption, color: Colors.textMuted, marginTop: Spacing.xs },

  instructions: { alignItems: "center", marginBottom: Spacing.xl },
  instrTitle: { ...Typography.captionBold, color: Colors.textPrimary },
  instrSub: { ...Typography.caption, color: Colors.textMuted, marginTop: 3 },

  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xxxl,
  },
  sideBtn: { alignItems: "center", gap: 5 },
  sideBtnIcon: {
    width: 50,
    height: 50,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
  },
  sideBtnIconActive: {
    backgroundColor: Colors.primary,
  },
  sideBtnTxt: { ...Typography.micro, color: Colors.textMuted },

  captureBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    ...Shadow.xl,
  },
  captureGrad: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  permContainer: { flex: 1 },
  permGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xxxl,
  },
  permIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xxl,
  },
  permTitle: {
    ...Typography.h1,
    color: Colors.white,
    textAlign: "center",
  },
  permSub: {
    ...Typography.body,
    color: Colors.whiteDim,
    textAlign: "center",
    marginTop: Spacing.md,
    lineHeight: 22,
  },
  permBtn: { marginTop: Spacing.xxxl, width: "100%" },
  permBtnGrad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: Radius.lg,
    paddingVertical: 14,
  },
  permBtnText: { ...Typography.button, color: Colors.white },
  skipBtn: { marginTop: Spacing.lg, padding: Spacing.sm },
  skipBtnText: { ...Typography.body, color: Colors.whiteFaint, textAlign: "center" },
});
