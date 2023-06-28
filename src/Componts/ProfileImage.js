import React from 'react';
import { TouchableOpacity, Image ,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileImage = ({ username, profileUri, storyArray }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Story', { storyArray });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{username}</Text>
      <Image  source={{ uri: profileUri }} style={{ width: 100, height: 100 }} />
    </TouchableOpacity>
  );
};

export default ProfileImage;