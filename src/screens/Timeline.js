import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { useLocationPermissionsContext } from "../contexts/LocationPermissions";
import { WINDOW } from "../utils/constants";

const Timeline = () => {
  const [tripStatus, setTripStatus] = useState("completed");
  const { requestBackgroundPermissions } = useLocationPermissionsContext();

  const startTrip = async () => {
    try {
      const { status } = await requestBackgroundPermissions();
      if (status === "granted") {
        setTripStatus("ongoing");
      } else {
        Alert("You need to allow location access to use this app");
      }
    } catch (err) {
      if (err === "foreground location access not granted") {
        Alert("You need to allow location access to use this app");
      }
      console.error(err);
    }
  };

  const resumeTrip = () => {
    setTripStatus("ongoing");
  };

  const pauseTrip = () => {
    setTripStatus("paused");
  };

  const endTrip = () => {
    setTripStatus("completed");
  };

  const endOrPauseTrip = () => {};

  const tripStatusButton = (() => {
    switch (tripStatus) {
      case "ongoing":
        return {
          fx: endOrPauseTrip,
          text: "Stop or pause trip",
        };
      case "paused":
        return {
          fx: resumeTrip,
          text: "Resume trip",
        };
      case "completed":
        return {
          fx: startTrip,
          text: "Start a new trip",
        };
    }
  })();

  return (
    <GradientSafeAreaView>
      <View>
        <MapView styles={styles.mapContainer} provider="google"></MapView>
      </View>
      <TouchableOpacity
        style={styles.tripStatusButton}
        onPress={tripStatusButton.fx}
      >
        <Text>{tripStatusButton.text}</Text>
      </TouchableOpacity>
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: WINDOW.HEIGHT / 2,
    width: WINDOW.WIDTH,
  },
  tripStatusButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
  },
});

export default Timeline;
