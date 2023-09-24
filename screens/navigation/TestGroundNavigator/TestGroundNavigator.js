//TEMP building TempScreens and features to be implemented when needed.

import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step6Screen from "../../TestScreens/Step6Screen/Step6Screen";
import TestGroundStackScreen from "../../TestScreens/TestGroundStackScreen/TestGroundStackScreen";
import VideoPlayerScreen from "../../TestScreens/VideoPlayerScreen/VideoPlayerScreen"
import CheckMarkScreen from "../../TestScreens/CheckMarkScreen/CheckMarkScreen";
import ChatMassageScreen from "../../TestScreens/ChatMassageSсreen/ChatMassageScreen";
const TestGroundNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="TestGround" options={{headerShown:false}} component={TestGroundStackScreen}  />
      <Stack.Screen name="Step6" options={{ headerShown: false }} component={Step6Screen} />
      <Stack.Screen name="VideoPlayer" options={{ headerShown: false }} component={VideoPlayerScreen} />
      <Stack.Screen name="CheckMark" options={{ headerShown: false }} component={CheckMarkScreen} />
      <Stack.Screen name="ChatMassage" options={{ headerShown: false }} component={ChatMassageScreen} />
    </Stack.Navigator>
  );
};

export default TestGroundNavigator;

const styles = StyleSheet.create({});