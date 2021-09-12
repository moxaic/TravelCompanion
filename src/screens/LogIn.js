import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { gradient } from "../utils/colors";
import { WINDOW } from "../utils/constants";

import GradientSafeAreaView from "../components/GradientSafeAreaView";

const LogIn = ({ navigation }) => {
  const [username, setUsername] = useState();

  const handleLogIn = () => {
    navigation.navigate("MainFlow");
  };

  return (
    <GradientSafeAreaView optionalStyles={styles.container}>
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
        <Text style={{ color: "white" }}>Log In</Text>
      </TouchableOpacity>
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logInButton: {
    alignItems: "center",
    borderRadius: 999,
    backgroundColor: "green",
    paddingVertical: 13,
    paddingHorizontal: 60,
    justifyContent: "center",
    marginVertical: 30,
  },
  input: {
    borderColor: gradient.bottom,
    borderWidth: 2,
    width: WINDOW.WIDTH / 2,
    borderColor: "black",
    borderRadius: 999,
    padding: 4,
    paddingHorizontal: 20,
    marginTop: 8,
  },
});

export default LogIn;
