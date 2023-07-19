import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import CameraPermissionComponent from './Premissions/CameraPermission';

const CameraTypeOn = ({ cameraType }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status === 'granted') {
      const image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        cameraType: cameraType,
      });

      if (!image.cancelled) {
        setImageUri(image.uri);
        saveToGallery(image.uri);
      }
    } else {
      alert('Sorry, we need camera permissions to make this work!');
    }
  };

  const saveToGallery = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Expo', asset, false);
      alert('Photo saved to gallery!');
    } catch (error) {
      console.log(error);
      console.log(imageUri);
      alert('An error occurred while saving the photo to the gallery.');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUri ? (
        <TouchableOpacity onPress={takePhoto} style={{ flex: 1 }}>
          <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="contain" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={takePhoto} style={{ backgroundColor: 'blue', padding: 16, borderRadius: 8 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Take Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CameraTypeOn;