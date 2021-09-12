import React from "react";

import Auth from "./Auth";
import LocationPermissions from "./LocationPermissions";

const ContextProvider = ({ children }) => {
  return (
    <Auth>
      <LocationPermissions>{children}</LocationPermissions>
    </Auth>
  );
};

export default ContextProvider;
