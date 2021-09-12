import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accuracy, startLocationUpdatesAsync } from "expo-location";
import { defineTask } from "expo-task-manager";
import MapView from "react-native-maps";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { useAuthContext } from "../contexts/Auth";
import { useLocationPermissionsContext } from "../contexts/LocationPermissions";
import { database } from "../config/firebase.config";
import { WINDOW } from "../utils/constants";

const TASK_BACKGROUND_LOCATION = "get-location-in-background";
let DB_REF = null;

defineTask(TASK_BACKGROUND_LOCATION, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  DB_REF.push({
    data: data.locations,
  });
});

const Timeline = () => {
  const [clickedMarker, setClickedMarker] = useState();
  const [tripStatus, setTripStatus] = useState("completed");
  const { username } = useAuthContext();
  const { requestBackgroundPermission } = useLocationPermissionsContext();

  const startTrip = async () => {
    try {
      const { status } = await requestBackgroundPermission();
      if (status !== "granted") {
        Alert("You need to allow location access to use this app");
        return;
      }
      setTripStatus("ongoing");
      DB_REF = database
        .ref("trips")
        .push({
          username,
          tripStarted: new Date().toDateString(),
        })
        .child("tripData");

      await startLocationUpdatesAsync(TASK_BACKGROUND_LOCATION, {
        accuracy: Accuracy.Lowest,
        timeInterval: 300000,
        foregroundService: {
          notificationTitle: "Using your location",
          notificationBody:
            "To turn off, go back to the app and switch something off.",
        },
      });
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

  const endOrPauseTrip = () => {
    // select between pause and end
    endTrip();
  };

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
        <MapView style={styles.mapContainer} provider="google"></MapView>
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
