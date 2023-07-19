import React, { useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MediaPermissionComponent = () => {
  const [mediaPermissionStatus, setMediaPermissionStatus] = useState(null);

  useEffect(() => {
    checkMediaPermission();
  }, []);

  const checkMediaPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    setMediaPermissionStatus(status);
  };

  const requestMediaPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setMediaPermissionStatus(status);
  };

  const showAlert = () => {
    Alert.alert(
      'Insufficient Permissions',
      'You need to grant media permissions to use this feature.',
      [
        {
          text: 'Ask Permissions',
          onPress: requestMediaPermission,
        },
      ],
      { cancelable: false }
    );
  };

};

export default MediaPermissionComponent;