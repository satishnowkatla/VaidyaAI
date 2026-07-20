import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";

export default function MedicalDisclaimer({ visible, onAccept }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.icon}>⚕️</Text>
          <Text style={styles.title}>Medical Disclaimer</Text>
          <Text style={styles.body}>
            VaidyaAI provides medicine information for educational purposes
            only. The information is not a substitute for professional medical
            advice, diagnosis, or treatment.
          </Text>
          <Text style={styles.warn}>
            Always consult a qualified healthcare provider before making any
            medical decisions. Never disregard professional medical advice or
            delay seeking it because of information from this app.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={onAccept}>
            <Text style={styles.btnText}>I Understand</Text>
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
    padding: 24,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 28,
    width: "100%",
    alignItems: "center",
  },
  icon: { fontSize: 44, marginBottom: 12 },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 14,
  },
  body: {
    fontSize: 13,
    color: Colors.textMedium,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 12,
  },
  warn: {
    fontSize: 12,
    color: Colors.tagRedText,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
  },
  btnText: { color: Colors.white, fontSize: 15, fontWeight: "800" },
});
