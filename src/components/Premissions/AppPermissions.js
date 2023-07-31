import { Platform, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

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

    // Function to request camera permissions and handle the result
    requiredCameraPermissions: async () => {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
  
      if (status === 'undetermined') {
        // Camera permissions are undetermined, request permissions
        const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
  
        if (newStatus === 'granted') {
          console.log('Camera permissions granted.');
        } else if (newStatus === 'denied') {
          console.log('Camera permissions denied.');
          AppPermissions.showCameraPermissionAlert();
        }
      } else if (status === 'denied') {
        // Camera permissions are denied, show an alert to open settings
        AppPermissions.showCameraPermissionAlert();
      }
    },
  
    // Function to show an alert to open settings
    showCameraPermissionAlert: () => {
      const alertTitle = 'Permission Required';
      const alertMessage = 'This app needs access to your camera to take photos. Please go to the app settings and enable camera permissions.';
      const alertButtons = [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => AppPermissions.goSettings() },
      ];
  
      if (Platform.OS === 'android') {
        alertButtons.unshift({ text: 'Ask Again', onPress: () => AppPermissions.requiredCameraPermissions() });
      }
  
      Alert.alert(alertTitle, alertMessage, alertButtons);
    },

      // Function to request location permissions and handle the result
  requiredLocationPermissions: async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === 'undetermined') {
      // Location permissions are undetermined, request permissions
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();

      if (newStatus === 'granted') {
        console.log('Location permissions granted.');
      } else if (newStatus === 'denied') {
        console.log('Location permissions denied.');
        AppPermissions.showLocationPermissionAlert();
      }
    } else if (status === 'denied') {
      // Location permissions are denied, show an alert to open settings
      AppPermissions.showLocationPermissionAlert();
    }
  },

  // Function to show an alert to open settings
  showLocationPermissionAlert: () => {
    const alertTitle = 'Permission Required';
    const alertMessage = 'This app needs access to your location to function properly. Please go to the app settings and enable location permissions.';
    const alertButtons = [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => AppPermissions.goSettings() },
    ];

    if (Platform.OS === 'android') {
      alertButtons.unshift({ text: 'Ask Again', onPress: () => AppPermissions.requiredLocationPermissions() });
    }

    Alert.alert(alertTitle, alertMessage, alertButtons);
  },

    // Function to request media permissions and handle the result
    requiredMediaPermissions: async () => {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  
      if (status === 'undetermined') {
        // Media permissions are undetermined, request permissions
        const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
        if (newStatus === 'granted') {
          console.log('Media library permissions granted.');
        } else if (newStatus === 'denied') {
          console.log('Media library permissions denied.');
          AppPermissions.showMediaPermissionAlert();
        }
      } else if (status === 'denied') {
        // Media permissions are denied, show an alert to open settings
        AppPermissions.showMediaPermissionAlert();
      }
    },
  
    // Function to show an alert to open settings
    showMediaPermissionAlert: () => {
      const alertTitle = 'Permission Required';
      const alertMessage = 'This app needs access to your media library to function properly. Please go to the app settings and enable media library permissions.';
      const alertButtons = [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => AppPermissions.goSettings() },
      ];
  
      if (Platform.OS === 'android') {
        alertButtons.unshift({ text: 'Ask Again', onPress: () => AppPermissions.requiredMediaPermissions() });
      }
  
      Alert.alert(alertTitle, alertMessage, alertButtons);
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