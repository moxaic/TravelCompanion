import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Timeline from "../screens/Timeline";

const MainTab = createBottomTabNavigator();

const Tab = () => {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false }}>
      <MainTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Timeline"
        component={Timeline}
        options={{
          tabBarLabel: "Timeline",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="timeline-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default Tab;
