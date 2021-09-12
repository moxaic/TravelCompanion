import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { getCurrentPositionAsync } from "expo-location";
import CardComp from "../components/Card";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { useLocationPermissionsContext } from "../contexts/LocationPermissions";
// import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  const [location, setLocation] = useState();
  const { requestForegroundPermission } = useLocationPermissionsContext();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await requestForegroundPermission();
        if (status !== "granted") {
          Alert("You need to allow location access to use this app");
          return;
        }
        const currentLocation = await getCurrentPositionAsync();
        console.log(currentLocation);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [requestForegroundPermission]);

  return (
    <GradientSafeAreaView>
      <Text style={styles.logo}>Travel Diaries</Text>
      <ScrollView>
        <CardComp />
        <CardComp />
        <CardComp />
      </ScrollView>
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    fontWeight: "700",
  },
});

export default Home;
