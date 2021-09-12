import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { gradient } from "../utils/colors";

const GradientSafeAreaView = ({ children, optionalStyles }) => {
  return (
    <LinearGradient
      style={styles.gradientContainer}
      colors={[gradient.top, gradient.bottom]}
    >
      <SafeAreaView
        style={[
          styles.safeAreaContainer,
          typeof optionalStyles !== undefined ? optionalStyles : {},
        ]}
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
  },
});

export default GradientSafeAreaView;
