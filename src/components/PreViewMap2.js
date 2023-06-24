import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

function PreViewMap({ location }) {
  return location ? (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.lat,
          longitude: location.lng,
        }}
      />
    </MapView>
  ) : (
    <View>
      <Text style={{ backgroundColor: "white" }}>pre-View location</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default PreViewMap;
