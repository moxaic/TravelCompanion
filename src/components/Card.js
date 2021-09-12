import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import MapView, { Polyline } from "react-native-maps";
import { reverseGeocodeAsync } from "expo-location";

import { WINDOW } from "../utils/constants";

const exp =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const CardComp = (props) => {
  const { coordinates, username, locationName, experience, rating } = props;
  const [locName, setLocName] = useState();

  useEffect(() => {
    (async () => {
      if (locationName !== "") {
        setLocName(locationName);
        return;
      }
      const reverseGeocodeLoc = await reverseGeocodeAsync(coordinates[0]);
      if (reverseGeocodeLoc[0].city === "") {
        setLocName(reverseGeocodeLoc[0].country);
      } else {
        setLocName(reverseGeocodeLoc[0].city);
      }
    })();
  }, []);

  return (
    <View>
      <Card>
        <MapView style={styles.mapView}>
          <Polyline coordinates={coordinates} lineDashPattern={[0]} />
        </MapView>
        <Card.Divider />
        <View style={styles.container}>
          <View style={styles.first}>
            <Text style={styles.title}>{username}</Text>
            <Text style={styles.title}>{locName}</Text>
          </View>
          <View style={{ width: "100%", padding: 3 }}>
            <Text>
              {experience !== ""
                ? `${experience.substring(0, 125)}...`
                : `${exp.substring(0, 125)}...`}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  first: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  title: {
    fontWeight: "700",
  },
  mapView: {
    width: "100%",
    height: 180,
  },
});

export default CardComp;
