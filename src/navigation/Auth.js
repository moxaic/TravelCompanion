import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";

const AuthStack = createStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="LogIn" component={LogIn} />
    </AuthStack.Navigator>
  );
};

export default Auth;
