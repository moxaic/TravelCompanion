import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Avatar from "../components/Avatar";
import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { useAuthContext } from "../contexts/Auth";
import { database } from "../config/firebase.config";
import { gradient } from "../utils/colors";
import { WINDOW } from "../utils/constants";

const SignUp = ({ navigation }) => {
  const { name, setName, username, setUsername } = useAuthContext();

  const handleSignUp = async () => {
    if (name === "" || username === "" || name === null || username === null) {
      console.warn("Name and username cannot be blank");
      return;
    }
    // TODO(@moxaic): check if entered username already exists
    await database.ref(`users/${username}`).set({
      name,
      username,
    });
    navigation.navigate("MainFlow"); // TODO(@moxaic): store token in local storage and conditionaly change between Auth and default flow
  };

  const navigateToLogIn = () => {
    navigation.navigate("LogIn");
  };

  return (
    <GradientSafeAreaView optionalStyles={styles.container}>
      <Avatar />
      <View>
        <Text>Name:</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
      </View>
      <View>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={{ color: "white" }}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogIn}>
        <Text>Already have an account?</Text>
        <Text
          style={{
            color: "blue",
            textAlign: "center",
          }}
        >
          LOG IN
        </Text>
      </TouchableOpacity>
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderColor: gradient.bottom,
    borderWidth: 2,
    width: WINDOW.WIDTH / 2,
    borderColor: "black",
    borderRadius: 999,
    padding: 4,
    marginTop: 8,
  },
  signUpButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 40,
    marginTop: -20,
    backgroundColor: "green",
    width: 80,
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default SignUp;
