import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/colors";
import { SCAN_CONFIG } from "../constants/config";
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
          "Not detected",
          "Could not read medicine name. Please try again with better lighting.",
          [{ text: "OK" }],
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
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permContainer}>
        <Text style={styles.permIcon}>📷</Text>
        <Text style={styles.permTitle}>Camera Permission Needed</Text>
        <Text style={styles.permSub}>
          We need camera access to scan medicine strips
        </Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Allow Camera Access</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.skipBtnText}>Go Back</Text>
        </TouchableOpacity>
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
        <View style={styles.overlayContainer}>
          <View style={styles.overlayTop}>
            <View style={styles.scanHeader}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.iconBtnText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.scanTitle}>{t("scan")}</Text>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => setTorch(!torch)}
              >
                <Text style={styles.iconBtnText}>{torch ? "⚡" : "🔦"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.frameArea}>
            <View style={styles.sideDark} />
            <View style={styles.frameBox}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
            <View style={styles.sideDark} />
          </View>

          <View style={styles.tipRow}>
            <Text style={styles.frameTip}>
              Place medicine strip inside the frame
            </Text>
          </View>

          <View style={styles.flipRow}>
            <TouchableOpacity
              style={styles.flipBtn}
              onPress={() => setFacing(facing === "back" ? "front" : "back")}
            >
              <Text style={styles.flipBtnText}>🔄 Flip Camera</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.overlayBottom} />
        </View>
      </View>

      <View style={styles.bottomPanel}>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={Colors.primary} />
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
              <TouchableOpacity style={styles.sideBtn} onPress={pickImage}>
                <View style={styles.sideBtnIc}>
                  <Text style={{ fontSize: 22 }}>🖼️</Text>
                </View>
                <Text style={styles.sideBtnTxt}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureBtn}
                onPress={captureAndScan}
              >
                <Text style={{ fontSize: 28 }}>📷</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sideBtn}
                onPress={() => setTorch(!torch)}
              >
                <View
                  style={[
                    styles.sideBtnIc,
                    torch && { backgroundColor: Colors.torchActive },
                  ]}
                >
                  <Text style={{ fontSize: 22 }}>{torch ? "⚡" : "🔦"}</Text>
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
  camera: { flex: 1, backgroundColor: Colors.screenBlack },
  cameraWrapper: { flex: 1 },
  overlayContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  overlayTop: {
    backgroundColor: Colors.overlay,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  scanHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: Colors.whiteBtnBg,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnText: { fontSize: 18, color: Colors.white },
  scanTitle: { fontSize: 16, fontWeight: "800", color: Colors.white },
  frameArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  sideDark: { flex: 1, height: 180, backgroundColor: Colors.overlayMedium },
  frameBox: { width: 240, height: 180, position: "relative" },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: Colors.primaryDark,
    borderStyle: "solid",
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 5,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 5,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 5,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 5,
  },
  tipRow: {
    backgroundColor: Colors.overlayMedium,
    alignItems: "center",
    paddingVertical: 10,
  },
  frameTip: {
    color: Colors.whiteMuted,
    fontSize: 12,
    backgroundColor: Colors.overlayLight,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  flipRow: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: Colors.overlayLight,
  },
  flipBtn: {
    backgroundColor: Colors.whiteBtnBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  flipBtnText: { color: Colors.white, fontSize: 13, fontWeight: "700" },
  overlayBottom: { flex: 1, backgroundColor: Colors.overlayMedium },
  bottomPanel: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 90,
  },
  loadingBox: { alignItems: "center", paddingVertical: 20 },
  loadingMsg: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.primary,
    marginTop: 14,
  },
  loadingSubMsg: { fontSize: 12, color: Colors.textMuted, marginTop: 6 },
  instructions: { alignItems: "center", marginBottom: 20 },
  instrTitle: { fontSize: 13, fontWeight: "600", color: Colors.textDark },
  instrSub: { fontSize: 11, color: Colors.textMuted, marginTop: 3 },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 36,
  },
  sideBtn: { alignItems: "center", gap: 5 },
  sideBtnIc: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  sideBtnTxt: { fontSize: 10, color: Colors.textMuted, fontWeight: "600" },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    borderWidth: 5,
    borderColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  permContainer: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  permIcon: { fontSize: 60, marginBottom: 20 },
  permTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.white,
    textAlign: "center",
  },
  permSub: {
    fontSize: 13,
    color: Colors.whiteDim,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  permBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 14,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  permBtnText: { fontSize: 14, fontWeight: "800", color: Colors.white },
  skipBtn: { marginTop: 14, padding: 10 },
  skipBtnText: { fontSize: 13, color: Colors.whiteFaint },
});
