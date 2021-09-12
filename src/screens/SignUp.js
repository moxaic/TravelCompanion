import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import Avatar from "../components/Avatar";
import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { gradient } from "../utils/colors";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();

  const handleSignUp = () => {
    navigation.navigate("MainFlow"); // TODO(@moxaic): store token in local storage and conditionaly change between Auth and default flow
  };

  const navigateToLogIn = () => {
    navigation.navigate("LogIn");
  };

  return (
    <GradientSafeAreaView optionalStyles={styles.container}>
      <Avatar />
      <Text>Name:</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogIn}>
        <Text>Already have an account? Log in</Text>
      </TouchableOpacity>
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderColor: gradient.bottom,
    borderWidth: 2,
  },
  signUpButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default SignUp;
