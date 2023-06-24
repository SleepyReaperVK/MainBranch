import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedLocation } from "../src/store/locationsSlice";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const MapScreen = ({ navigation }) => {
  //map follows the selectedLocation , if no selectedLocation will center around currentUserLocation

  const [userLocation, setUserLocation] = useState(null);
  const selectedLocation = useSelector((state) => state.local.selectedLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    // Set the header options for the screen
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="save-outline"
          size={30}
          color="black"
          onPress={handleSaveLocation}
          style={{ marginRight: 16 }}
        />
      ),
    });
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Please grant location permission to use the map.",
        [{ text: "OK" }]
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const location = { latitude, longitude };
    console.log("Map  " + location.latitude);
    dispatch(
      setSelectedLocation({ lat: location.latitude, lng: location.longitude })
    );
    console.log("MapSelect  " + selectedLocation.lat);
  };

  const handleSaveLocation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapView
          style={styles.map}
          region={userLocation}
          onPress={handleMapPress}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
              draggable
            />
          )}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  saveIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
