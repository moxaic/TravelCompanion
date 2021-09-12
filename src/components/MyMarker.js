import React from "react";
import { Marker } from "react-native-maps";

const MyMarker = ({ coordinate, myKey, setClickedMarker }) => {
  const onPress = () => {
    setClickedMarker(myKey);
  };

  return <Marker {...{ coordinate, onPress }} />;
};

export default MyMarker;
