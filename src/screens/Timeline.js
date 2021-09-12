import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating";
import {
  Accuracy,
  reverseGeocodeAsync,
  startLocationUpdatesAsync,
} from "expo-location";
import { defineTask } from "expo-task-manager";
import MapView, { Polyline } from "react-native-maps";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import MyMarker from "../components/MyMarker";
import { useAuthContext } from "../contexts/Auth";
import { useLocationPermissionsContext } from "../contexts/LocationPermissions";
import { database } from "../config/firebase.config";
import { gradient } from "../utils/colors";
import { WINDOW } from "../utils/constants";

const TASK_BACKGROUND_LOCATION = "get-location-in-background";
let TRIP_DATA_REF = null;

defineTask(TASK_BACKGROUND_LOCATION, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (TRIP_DATA_REF !== null) {
    TRIP_DATA_REF.push({
      data: data.locations,
      locationName: "",
      experience: "",
      rating: 0,
    });
  }
});

const Timeline = () => {
  const [tripRef, setTripRef] = useState(null);
  const [keys, setKeys] = useState([]);
  const [locations, setLocations] = useState([]);
  const [clickedMarker, setClickedMarker] = useState();
  const [tripStatus, setTripStatus] = useState("completed");
  const [locationName, setLocationName] = useState("");
  const [experience, setExperience] = useState("");
  const [starCount, setStarCount] = useState(0);
  const { username } = useAuthContext();
  // const [showMap, setShowMap] = useState(false);
  const { requestBackgroundPermission } = useLocationPermissionsContext();

  useEffect(() => {
    (async () => {
      try {
        if (TRIP_DATA_REF === null) {
          return;
        }
        const snapshot = await TRIP_DATA_REF.child(clickedMarker).get();
        const data = snapshot.toJSON();
        if (data.locationName === "") {
          const reverseGeocodeLoc = await reverseGeocodeAsync({
            latitude: data.data[0].coords.latitude,
            longitude: data.data[0].coords.longitude,
          });
          console.log(reverseGeocodeLoc);
        }
        setExperience(data.experience);
        setLocationName(data.locationName);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [clickedMarker]);

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
  }, [TRIP_DATA_REF]);

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
      setTripRef(tripRef);
      setTripStatus("ongoing");

      await startLocationUpdatesAsync(TASK_BACKGROUND_LOCATION, {
        accuracy: Accuracy.Lowest,
        // timeInterval: 300000,
        distanceInterval: 0,
        timeInterval: 10000,
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

  const submitData = async () => {
    await tripRef.child(`tripData/${clickedMarker}`).update({
      locationName,
      experience,
      rating: starCount,
    });
  };

  return (
    <GradientSafeAreaView>
      {clickedMarker === null ? (
        <TouchableOpacity
          style={styles.tripStatusButton}
          onPress={tripStatusButton.fx}
        >
          <Text>{tripStatusButton.text}</Text>
        </TouchableOpacity>
      ) : (
        <>
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
          <Text style={styles.text}>Location</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={setLocationName}
            value={locationName}
          />
          <Text style={styles.text}>Your experience</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={setExperience}
            value={experience}
          />
          <Text style={styles.text}>Ratings</Text>
          <View style={styles.starContainer}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={starCount}
              selectedStar={(rating) => {
                setStarCount(rating);
              }}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={submitData}>
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
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
  textinput: {
    borderColor: gradient.bottom,
    borderWidth: 2,
    width: WINDOW.WIDTH * 0.9,
    borderColor: "black",
    borderRadius: 999,
    padding: 4,
    paddingHorizontal: 20,
    marginTop: 8,
    marginHorizontal: 0.05 * WINDOW.WIDTH,
  },
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  starContainer: {
    marginTop: 5,
    marginHorizontal: 0.2 * WINDOW.WIDTH,
    width: 0.6 * WINDOW.WIDTH,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "green",
    paddingVertical: 13,
    paddingHorizontal: 60,
    justifyContent: "center",
    marginVertical: 30,
  },
});

export default Timeline;
