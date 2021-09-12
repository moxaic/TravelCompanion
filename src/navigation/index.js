import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Tab from "./Tab";
import Auth from "./Auth";

// TODO(@moxaic): use conditional check to render one of the either navigator
const Switch = createStackNavigator();

const Navigation = () => {
  return (
    <Switch.Navigator screenOptions={{ headerShown: false }}>
      <Switch.Screen name="AuthFlow" component={Auth} />
      <Switch.Screen name="MainFlow" component={Tab} />
    </Switch.Navigator>
  );
};

export default Navigation;
