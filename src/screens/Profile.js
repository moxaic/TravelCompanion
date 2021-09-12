import React from "react";
import { Text } from "react-native";

import GradientSafeAreaView from "../components/GradientSafeAreaView";
import { useAuthContext } from "../contexts/Auth";

const Profile = () => {
  const { name, username } = useAuthContext();

  return (
    <GradientSafeAreaView>
      <Text>hello there</Text>
      <Text>{name}</Text>
      <Text>{username}</Text>
    </GradientSafeAreaView>
  );
};

export default Profile;
