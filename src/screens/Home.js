import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { getCurrentPositionAsync } from "expo-location";
import CardComp from "../components/Card";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { useAuthContext } from "../contexts/Auth";
import { useLocationPermissionsContext } from "../contexts/LocationPermissions";
import { database } from "../config/firebase.config";

const Home = () => {
  const [location, setLocation] = useState();
  const [trips, setTrips] = useState([]);
  const { username: myUsername } = useAuthContext();
  const { requestForegroundPermission } = useLocationPermissionsContext();

  useEffect(() => {
    (async () => {
      try {
        const first10Trips = await database
          .ref("trips")
          .limitToLast(10)
          // .equalTo(username == "__aditya")
          .get();
        const data = first10Trips.toJSON();
        let locationName, experience, rating;
        Object.entries(data).forEach(([key]) => {
          const coordinates = Object.entries(data[key].tripData).map(
            ([tripKey], idx) => {
              if (idx === 0) {
                locationName = data[key].tripData[tripKey].locationName;
                experience = data[key].tripData[tripKey].experience;
                rating = data[key].tripData[tripKey].rating;
              }
              return {
                latitude: data[key].tripData[tripKey].data[0].coords.latitude,
                longitude: data[key].tripData[tripKey].data[0].coords.longitude,
              };
            }
          );
          const username = data[key].username;
          setTrips((prev) => [
            ...prev,
            { username, locationName, experience, rating, coordinates },
          ]);
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await requestForegroundPermission();
        if (status !== "granted") {
          Alert("You need to allow location access to use this app");
          return;
        }
        const currentLocation = await getCurrentPositionAsync();
        setLocation(currentLocation);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [requestForegroundPermission]);

  return (
    <GradientSafeAreaView>
      <Text style={styles.logo}>Travel Diaries</Text>
      <ScrollView>
        {trips.map(
          (
            { coordinates, username, locationName, experience, rating },
            key
          ) => (
            <CardComp
              {...{
                key,
                coordinates,
                username,
                locationName,
                experience,
                rating,
              }}
            />
          )
        )}
        {/* <CardComp  />
        <CardComp />
        <CardComp /> */}
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
