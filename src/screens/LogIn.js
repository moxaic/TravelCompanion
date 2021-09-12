import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

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
        <Text>Log In</Text>
      </TouchableOpacity>
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  logInButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default LogIn;
