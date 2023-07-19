import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const CameraPermissionComponent = () => {
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState(null);

  useEffect(() => {
    checkCameraPermission();
    console.log({cameraPermissionStatus});
  },[]);

  const checkCameraPermission = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    setCameraPermissionStatus(status);
    
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setCameraPermissionStatus(status);
  };

  useEffect(() => {
    console.log({cameraPermissionStatus});
    if (cameraPermissionStatus === ImagePicker.PermissionStatus.UNDETERMINED ) {
      showAlert('Ask Permissions',requestCameraPermission);
    }
    if (cameraPermissionStatus === ImagePicker.PermissionStatus.DENIED ) {
      showAlert('Go to Settings', Linking.openSettings);
    }
  },[cameraPermissionStatus]);

  const showAlert = (txt,func) => {
    Alert.alert(
      'Insufficient Permissions',
      'You need to grant camera permissions to use this app.',
      [
        {
          text: txt,
          onPress: func,
        },
      ],
      { cancelable: false }
    );
  };

};

export default CameraPermissionComponent;