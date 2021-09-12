import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { getCurrentPositionAsync } from "expo-location";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { useLocationPermissionsContext } from "../contexts/LocationPermissions";

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
      <Text style={styles.logo}>Travel Companion</Text>
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    textAlign: "center",
  },
});

export default Home;
