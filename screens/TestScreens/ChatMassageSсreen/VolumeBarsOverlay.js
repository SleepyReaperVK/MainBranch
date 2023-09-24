import React from 'react';
import { View, StyleSheet } from 'react-native';
import VolumeBar from './VolumeBar';

const VolumeBarsOverlay = ({ secondesArray, second , isPaused}) => {


  const handleFinishLoading = (index) => {
    // apon currentBar is Finished
    if (index <= second && index!=secondesArray.length-1) {
      console.log('second',second);
    } else {
      // All elements have finished loading
      // Handle completion logic here
      console.log('Done');
    }
  };

  return (
    <View style={styles.container}>
  {secondesArray.map((_, index) => {
    return (
      <VolumeBar
        key={index}
        Index={index}
        onFinishLoading={handleFinishLoading}
        second={second}
        isPaused={isPaused}
        />
    );
  })}
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignContent:'flex-start',
    width: '100%',
    height: 12,
    backgroundColor: 'black',
    borderRadius:8,
  },
});

export default VolumeBarsOverlay;