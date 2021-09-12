import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { gradient } from "../utils/colors";

const Avatar = ({ size }) => {
  return (
    <View style={styles.view}>
      <Image style={styles.image} />
      {/* <Text style={styles.uploadText}>Upload Image</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: gradient.bottom,
    borderRadius: 999,
    height: 200,
    width: 200,
  },
  image: {
    borderRadius: 999,
    height: "100%",
    width: "100%",
  },
  uploadText: {
    bottom: 40,
    left: 0,
    position: "absolute",
    right: 0,
    textAlign: "center",
  },
});

export default Avatar;
