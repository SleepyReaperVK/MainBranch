import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProfileImage from '../Componts/ProfileImage';
import storyAvatarsUnits from '../mockData/Data'; // Import your data.js file

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {storyAvatarsUnits.map((data, index) => (
        <View key={index} style={styles.profileImageContainer}>
          <ProfileImage
            username={data.username}
            profileUri={data.profileUri}
            storyArray={data.storyArray}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 10,
  },
  profileImageContainer: {
    margin: 5, // Adjust the margin value as per your requirement
  },
});

export default HomeScreen;