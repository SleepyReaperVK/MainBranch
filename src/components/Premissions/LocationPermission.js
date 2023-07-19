import React, { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationPermissionComponent = () => {
  const [locationPermissionStatus, setLocationPermissionStatus] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setLocationPermissionStatus(status);
  };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermissionStatus(status);
  };

  const showAlert = () => {
    Alert.alert(
      'Insufficient Permissions',
      'You need to grant location permissions to use this feature.',
      [
        {
          text: 'Ask Permissions',
          onPress: requestLocationPermission,
        },
      ],
      { cancelable: false }
    );
  };

};

export default LocationPermissionComponent;
