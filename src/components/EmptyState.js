import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import { Radius, Shadow, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";

export default function EmptyState({ icon, title, subtitle, action, style }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: Spacing.xxxxl,
    paddingHorizontal: Spacing.xxxl,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
    ...Shadow.md,
  },
  icon: { fontSize: 36 },
  title: {
    ...Typography.h2,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});
