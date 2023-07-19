import { Linking, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

/**
 * AppPermissions Library
 * A functional library that handles app permissions for media, location, and camera.
 * It provides functions to check and request permissions, as well as to open app settings.
 */
const AppPermissions = {
  /**
   * Function to check if media permissions are granted.
   * @returns {boolean} - true if media permissions are granted, false otherwise.
   */
  checkMediaPermissions: async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    return status === 'granted';
  },

  /**
   * Function to request media permissions.
   * @returns {boolean} - true if media permissions are granted after requesting, false otherwise.
   */
  requestMediaPermissions: async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  },

  /**
   * Function to check if location permissions are granted.
   * @returns {boolean} - true if location permissions are granted, false otherwise.
   */
  checkLocationPermissions: async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  },

  /**
   * Function to request location permissions.
   * @returns {boolean} - true if location permissions are granted after requesting, false otherwise.
   */
  requestLocationPermissions: async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  },

  /**
   * Function to check if camera permissions are granted.
   * @returns {boolean} - true if camera permissions are granted, false otherwise.
   */
  checkCameraPermissions: async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    return status === 'granted';
  },

  /**
   * Function to request camera permissions.
   * @returns {boolean} - true if camera permissions are granted after requesting, false otherwise.
   */
  requestCameraPermissions: async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  },
  
  /**
   * Function to initialize app permissions.
   * This function logs the status of media, location, and camera permissions to the console.
   */
  initAppPermissions: async () => {
    const mediaPermissionGranted = await AppPermissions.checkMediaPermissions();
    const locationPermissionGranted = await AppPermissions.checkLocationPermissions();
    const cameraPermissionGranted = await AppPermissions.checkCameraPermissions();

    console.log('Media permission granted:', mediaPermissionGranted);
    console.log('Location permission granted:', locationPermissionGranted);
    console.log('Camera permission granted:', cameraPermissionGranted);
  },

  /**
   * Function to open app settings for the current platform (Android or iOS).
   */
  goSettings: () => {
    const openSettings = async () => {
      if (Platform.OS === 'android') {
        // Open app settings for Android
        Linking.openSettings();
      } else if (Platform.OS === 'ios') {
        // Open app settings for iOS
        Linking.openURL('app-settings:');
      }
    };

    openSettings();
  },

  // Add more permission functions as needed
};

export default AppPermissions;