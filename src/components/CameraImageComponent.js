import { Alert, Image, StyleSheet, Text, View, Button } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

function CameraImageComponent({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );

      console.log("DENIED: " + permissionResponse);
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      //ask again
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    onTakeImage(image.uri);
  }

  let imagePreview = (
    <Text style={{ backgroundColor: "white" }}> No image taken yet. </Text>
  );

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Camera" onPress={takeImageHandler} />
    </View>
  );
}

export default CameraImageComponent;

const styles = StyleSheet.create({
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
  image: {
    width: "100%",
    height: "100%",
  },
});
