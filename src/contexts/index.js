import React from "react";

import LocationPermissions from "./LocationPermissions";

const ContextProvider = ({ children }) => {
  return <LocationPermissions>{children}</LocationPermissions>;
};

export default ContextProvider;
