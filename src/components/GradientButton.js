import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import { Radius, Spacing } from "../constants/spacing";
import { Typography } from "../constants/typography";

export default function GradientButton({
  title,
  onPress,
  gradient = Colors.gradient.primary,
  style,
  textStyle,
  icon,
  small,
  outlined,
}) {
  if (outlined) {
    return (
      <TouchableOpacity
        style={[styles.outlinedBtn, small && styles.smallBtn, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {icon}
        <Text
          style={[
            styles.outlinedText,
            small && styles.smallText,
            { marginLeft: icon ? 8 : 0 },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBtn, small && styles.smallBtn, style]}
      >
        {icon}
        <Text
          style={[
            styles.btnText,
            small && styles.smallText,
            { marginLeft: icon ? 8 : 0 },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradientBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: Radius.lg,
  },
  outlinedBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: "transparent",
  },
  btnText: {
    ...Typography.button,
    color: Colors.white,
  },
  outlinedText: {
    ...Typography.button,
    color: Colors.primary,
  },
  smallBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: Radius.md,
  },
  smallText: {
    ...Typography.buttonSmall,
  },
});
