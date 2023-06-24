import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setSelectedLocation } from "../src/store/locationsSlice";
import MapView, { Marker } from "react-native-maps";

const HomeScreen = () => {
  const locations = useSelector((state) => state.local.locations);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLocationPress = (itemData) => {
    console.log("Home " + itemData);
    const { lat, lng } = itemData;
    const location = { lat: lat, lng: lng };
    dispatch(setSelectedLocation(location));
    navigation.navigate("MapHome");
  };

  const renderLocationCard = ({ item }) => {
    console.log("Home " + item);
    return (
      <View style={styles.card}>
        <TouchableOpacity
          key={item.id}
          onPress={() => handleLocationPress(item)}
        >
          <Text style={styles.title}>{item.title}</Text>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.imagePreview} />
          )}
          <View style={styles.imagePreview}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: item.lat,
                longitude: item.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: item.lat,
                  longitude: item.lng,
                }}
              />
            </MapView>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {locations.length === 0 ? (
        <Text>Empty...</Text>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLocationCard}
        />
      )}
    </View>
  );
};

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
    borderRadius: 4,
    resizeMode: "cover",
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default HomeScreen;
