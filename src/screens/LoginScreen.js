import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/colors";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginScreen() {
  const { loginWithGoogle } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const isTE = lang === "te";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Colors.gradient.hero}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.langBtn} onPress={toggleLanguage} activeOpacity={0.7}>
            <Text style={[styles.langText, lang === "en" && styles.langActive]}>EN</Text>
            <Text style={[styles.langText, lang === "te" && styles.langActive]}>తె</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <Ionicons name="medical" size={48} color={Colors.white} />
          </View>
          <Text style={styles.appName}>VaidyaAI</Text>
          <Text style={styles.tagline}>
            {isTE ? "ఏదైనా మందును వెంటనే గుర్తించండి" : "Scan any medicine instantly"}
          </Text>
        </View>

        <View style={styles.features}>
          <FeatureRow icon="camera" text={isTE ? "కెమెరాతో మందు స్కాన్ చేయండి" : "Scan medicine strips with camera"} />
          <FeatureRow icon="book" text={isTE ? "200+ మందుల సమాచారం" : "200+ medicine database"} />
          <FeatureRow icon="location" text={isTE ? "దగ్గరలో ఫార్మసీలు కనుగొనండి" : "Find nearby pharmacies"} />
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={loginWithGoogle}
            activeOpacity={0.8}
          >
            <View style={styles.googleBtnInner}>
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text style={styles.googleBtnText}>
                {isTE ? "Google తో సైన్ అప్" : "Sign in with Google"}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            {isTE
              ? "లాగిన్ చేయడం ద్వారా, మీరు మా సేవా నిబంధనలను అంగీకరిస్తున్నారు"
              : "By signing in, you agree to our Terms of Service"}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

function FeatureRow({ icon, text }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={18} color={Colors.white} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing.xl : Spacing.xxxxl,
  },
  topRow: { alignItems: "flex-end" },
  langBtn: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: Radius.pill,
    padding: 3,
  },
  langText: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 11,
    fontWeight: "800",
    color: "rgba(255,255,255,0.5)",
    borderRadius: Radius.pill,
  },
  langActive: { backgroundColor: Colors.white, color: Colors.primaryDark },

  hero: { alignItems: "center", marginTop: Spacing.xxxxl + Spacing.xl, marginBottom: Spacing.xxxl },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  appName: { ...Typography.display, color: Colors.white, fontSize: 32 },
  tagline: { ...Typography.body, color: Colors.whiteDim, marginTop: Spacing.sm, textAlign: "center" },

  features: { gap: Spacing.lg, marginBottom: Spacing.xxxxl },
  featureRow: { flexDirection: "row", alignItems: "center", gap: Spacing.md },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: { ...Typography.body, color: Colors.whiteMuted, flex: 1 },

  bottom: { marginTop: "auto", paddingBottom: Spacing.xxxl },
  googleBtn: {
    borderRadius: Radius.lg,
    overflow: "hidden",
    marginBottom: Spacing.lg,
    ...Shadow.lg,
  },
  googleBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: Radius.lg,
  },
  googleBtnText: { ...Typography.button, color: "#333" },
  disclaimer: { ...Typography.caption, color: Colors.whiteGhost, textAlign: "center", lineHeight: 18 },
});
