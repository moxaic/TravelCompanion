import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

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
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [requestForegroundPermission]);

  return <GradientSafeAreaView></GradientSafeAreaView>;
};

export default Home;
