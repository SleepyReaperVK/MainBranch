import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import AppPermissions from '../components/Premissions/AppPermissions';

const ProfileCameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const cameraRef = useRef(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  useEffect(() => {
    // Request camera permissions on component mount
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /**
   * Function to take a picture using the camera.
   */
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
    }
  };

  /**
   * Function to save the captured image to the gallery.
   */
  const saveToGallery = async () => {
    try {
      if (imageUri) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access media library denied.');
          return;
        }
        const asset = await MediaLibrary.createAssetAsync(imageUri);
        console.log('Image saved to gallery:', asset);
      } else {
        console.log('No image to save.');
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  /**
   * Function to flip the camera between front and back.
   */
  const flipCamera = () => {
    setIsFrontCamera((prevIsFrontCamera) => !prevIsFrontCamera);
  };

  // Handle camera permission states
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Camera or Image Preview */}
      <View style={{ flex: 0.75 }}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="cover" />
        ) : (
          <Camera style={{ flex: 1 }} type={isFrontCamera ? Camera.Constants.Type.front : Camera.Constants.Type.back} ref={cameraRef} />
        )}
      </View>

      {/* Take Picture Button */}
      {!imageUri && (
        <TouchableOpacity onPress={takePicture} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Take Picture</Text>
        </TouchableOpacity>
      )}

      {/* Save to Gallery Button */}
      {imageUri && (
        <TouchableOpacity onPress={saveToGallery} style={{ position: 'absolute', bottom: 60, alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Save to Gallery</Text>
        </TouchableOpacity>
      )}

      {/* Retake Picture Button */}
      {imageUri && (
        <TouchableOpacity onPress={() => setImageUri(null)} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Retake Photo</Text>
        </TouchableOpacity>
      )}

      {/* Camera Flip Button */}
      {!imageUri && (
        <TouchableOpacity onPress={flipCamera} style={{ position: 'absolute', bottom: 60, left: 20 }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Flip Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileCameraScreen;