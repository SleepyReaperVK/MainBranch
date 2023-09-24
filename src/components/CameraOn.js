import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

/**
 * CameraOn Component
 * A generic camera component that handles camera permissions, taking pictures, and saving images to the gallery.
 *
 * @param {string} cameraType - The type of camera to use. Valid options are: 'back', 'front', or 'flippable' (default).
 * 'back': Only the back camera is active.
 * 'front': Only the front camera is active.
 * 'flippable': The camera can switch between front and back.
 *
 * @returns {React.Component} A component displaying the camera preview, image preview, and buttons for taking pictures
 * and saving them to the gallery. The 'cameraType' prop determines the initial camera type, and the component can handle
 * switching between front and back cameras (if 'flippable') or only using a fixed camera type ('back' or 'front').
 */
const CameraOn = ({ cameraType = 'flippable' }) => {
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
   * Function to determine the camera type based on the 'cameraType' prop.
   * @returns {string} - The camera type string for the 'Camera' component.
   */
  const handleCameraType = () => {
    if (cameraType === 'front') {
      return Camera.Constants.Type.front;
    } else if (cameraType === 'back') {
      return Camera.Constants.Type.back;
    } else {
      return isFrontCamera ? Camera.Constants.Type.front : Camera.Constants.Type.back;
    }
  };

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
        const asset = await ImagePicker.createAssetAsync(imageUri);
        console.log('Image saved to gallery:', asset);
      } else {
        console.log('No image to save.');
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  /**
   * Function to flip the camera between front and back (only available in 'flippable' mode).
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
      {/* Camera Preview */}
      <Camera style={{ flex: 1 }} type={handleCameraType()} ref={cameraRef} />

      {/* Image Preview */}
      <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="cover" />

      {/* Take Picture Button */}
      <TouchableOpacity onPress={takePicture} style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <Text style={{ fontSize: 18, color: '#000' }}>Take Picture</Text>
      </TouchableOpacity>

      {/* Save to Gallery Button */}
      <TouchableOpacity onPress={saveToGallery} style={{ position: 'absolute', bottom: 60, left: 20 }}>
        <Text style={{ fontSize: 18, color: '#000'  }}>Save to Gallery</Text>
      </TouchableOpacity>

      {/* Flip Camera Button (only visible in 'flippable' mode) */}
      {cameraType === 'flippable' && (
        <TouchableOpacity onPress={flipCamera} style={{ position: 'absolute', bottom: 60, right: 20 }}>
          <Text style={{ fontSize: 18, color: '#000' }}>Flip Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CameraOn;
