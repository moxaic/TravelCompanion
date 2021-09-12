import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Accuracy, startLocationUpdatesAsync } from "expo-location";
import { defineTask } from "expo-task-manager";
import MapView, { Polyline } from "react-native-maps";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import MyMarker from "../components/MyMarker";
import { useAuthContext } from "../contexts/Auth";
import { useLocationPermissionsContext } from "../contexts/LocationPermissions";
import { database } from "../config/firebase.config";
import { WINDOW } from "../utils/constants";

const TASK_BACKGROUND_LOCATION = "get-location-in-background";
let TRIP_DATA_REF = null;

defineTask(TASK_BACKGROUND_LOCATION, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  TRIP_DATA_REF.push({
    data: data.locations,
    locationName: "",
    experience: "",
    rating: -1,
  });
});

const Timeline = () => {
  const [keys, setKeys] = useState([]);
  const [locations, setLocations] = useState([]);
  const [clickedMarker, setClickedMarker] = useState();
  const [tripStatus, setTripStatus] = useState("completed");
  const [locationName, setLocationName] = useState();
  const [experience, setExperience] = useState();
  const { username } = useAuthContext();
  const { requestBackgroundPermission } = useLocationPermissionsContext();

  useEffect(() => {
    (async () => {
      try {
        if (TRIP_DATA_REF === null) {
          return;
        }
        TRIP_DATA_REF.on("child_added", (snapshot, err) => {
          setKeys((prev) => [...prev, snapshot.key]);
          const data = snapshot.toJSON();
          setLocations((prev) => {
            return [
              ...prev,
              {
                latitude: data.data[0].coords.latitude,
                longitude: data.data[0].coords.longitude,
              },
            ];
          });
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        TRIP_DATA_REF.child(clickedMarker).once("value", (data) => {
          setLocationName(data.locationName);
          setExperience(data.experience);
          console.log(data);
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const startTrip = async () => {
    try {
      const { status } = await requestBackgroundPermission();
      if (status !== "granted") {
        Alert("You need to allow location access to use this app");
        return;
      }
      const tripRef = database.ref("trips").push({
        username,
        tripStarted: new Date().toDateString(),
      });
      TRIP_DATA_REF = tripRef.child("tripData");
      setTripStatus("ongoing");

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
        <MapView style={styles.mapContainer} provider="google">
          {locations.map((location, idx) => (
            <MyMarker
              key={keys[idx]}
              coordinate={location}
              setClickedMarker={setClickedMarker}
              myKey={keys[idx]}
            />
          ))}
          <Polyline coordinates={locations} lineDashPattern={[0]} />
        </MapView>
      </View>
      <Text>Location{locationName}</Text>
      <TextInput value={locationName} />
      <Text>Your experience{experience}</Text>
      <TextInput value={experience} />
      <TouchableOpacity>
        <Text>Submit</Text>
      </TouchableOpacity>
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
