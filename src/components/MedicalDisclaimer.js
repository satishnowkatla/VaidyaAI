import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";
import { useTheme } from "../context/ThemeContext";

export default function MedicalDisclaimer({ visible, onAccept }) {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {/* ── Gradient Accent Top ── */}
          <LinearGradient
            colors={colors.gradient.primary}
            style={styles.accentTop}
          />

          <View style={styles.iconCircle}>
            <Ionicons name="medical" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>Medical Disclaimer</Text>
          <Text style={styles.body}>
            VaidyaAI provides medicine information for educational purposes
            only. The information is not a substitute for professional medical
            advice, diagnosis, or treatment.
          </Text>
          <View style={styles.warnCard}>
            <Ionicons name="warning" size={16} color={colors.tagRedText} />
            <Text style={styles.warn}>
              Always consult a qualified healthcare provider before making any
              medical decisions. Never disregard professional medical advice or
              delay seeking it because of information from this app.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={onAccept}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colors.gradient.primary}
              style={styles.btnGrad}
            >
              <Ionicons name="checkmark-circle" size={18} color={colors.white} />
              <Text style={styles.btnText}>I Understand</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xxl,
    width: "100%",
    alignItems: "center",
    overflow: "hidden",
    ...Shadow.xl,
  },
  accentTop: {
    width: "100%",
    height: 4,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.xxl,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  body: {
    ...Typography.body,
    color: Colors.textMedium,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  warnCard: {
    flexDirection: "row",
    gap: Spacing.sm,
    backgroundColor: Colors.tagRedBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderLeftWidth: 3,
    borderLeftColor: Colors.tagRedText,
  },
  warn: {
    ...Typography.caption,
    color: Colors.tagRedText,
    flex: 1,
    lineHeight: 18,
    fontWeight: "600",
  },
  btn: {
    width: "100%",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  btnGrad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: Radius.lg,
    paddingVertical: 14,
  },
  btnText: { ...Typography.button, color: Colors.white },
});
