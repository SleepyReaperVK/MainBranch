import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../src/store/locationsSlice";
import CameraImageComponent from "../src/components/CameraImageComponent";
import MapView, { Marker } from "react-native-maps";

const FormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedLocation = useSelector((state) => state.local.selectedLocation);
  const [locationTitle, setLocationTitle] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);

  const handleAddLocation = () => {
    const id = Math.random().toString();
    const newLocation = {
      id,
      title: locationTitle,
      image: capturedImage,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    };
    console.log("Form " + newLocation.lat);
    dispatch(addLocation(newLocation));
    setLocationTitle("");
    navigation.navigate("Home");
  };

  const handleNavigateToMap = () => {
    navigation.navigate("MapForm");
  };

  return (
    <View>
      <Text>Title</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder="Location Title"
        value={locationTitle}
        onChangeText={setLocationTitle}
      />
      <View style={styles.imagePreview}>
        {selectedLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
            />
          </MapView>
        ) : (
          <View style={styles.imagePreview}>
            <Text style={{ backgroundColor: "white" }}>pre-View location</Text>
          </View>
        )}
      </View>
      <Button title="Go to Map" onPress={handleNavigateToMap} />
      <CameraImageComponent onTakeImage={setCapturedImage} />
      <Button title="Add Location" onPress={handleAddLocation} />
    </View>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ff",
    borderRadius: 4,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
});
