import React from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { WINDOW } from "../utils/constants";

const exp =
  "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const CardComp = () => {
  return (
    <View>
      <Card>
        <Card.Image
          source={{
            uri: "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg",
          }}
        ></Card.Image>
        <Card.Divider />
        <View style={styles.container}>
          <View style={styles.first}>
            <Text style={styles.title}>Archit Agarwal</Text>
            <Text style={styles.title}>Chandigarh</Text>
          </View>
          <View style={{ width: "100%", padding: 3 }}>
            <Text>{`${exp.substring(0, 125)}...`}</Text>
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
});

export default CardComp;
