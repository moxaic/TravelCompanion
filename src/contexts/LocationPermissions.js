import React, { createContext, useContext, useState } from "react";
import {
  getBackgroundPermissionsAsync,
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
} from "expo-location";

const LocationPermissionsContext = createContext();

const useLocationPermissionsContext = () => {
  return useContext(LocationPermissionsContext);
};

const LocationPermissions = ({ children }) => {
  const [value] = useState(() => ({
    requestForegroundPermission: async () => {
      const foregroundPermission = await requestForegroundPermissionsAsync();
      return foregroundPermission;
    },
    requestBackgroundPermission: async () => {
      const { status: foregroundPermissionStatus } =
        await getForegroundPermissionsAsync();
      if (foregroundPermissionStatus === "granted") {
        const foregroundPermission = await requestBackgroundPermissionsAsync();
        return foregroundPermission;
      } else {
        return new Error("foreground location access not granted");
      }
    },
    getForegroundPermission: async () => {
      const foregroundPermission = await getForegroundPermissionsAsync();
      return foregroundPermission;
    },
    getBackgroundPermission: async () => {
      const foregroundPermission = await getBackgroundPermissionsAsync();
      return foregroundPermission;
    },
  }));

  return (
    <LocationPermissionsContext.Provider value={{ ...value }}>
      {children}
    </LocationPermissionsContext.Provider>
  );
};

export { useLocationPermissionsContext };
export default LocationPermissions;
