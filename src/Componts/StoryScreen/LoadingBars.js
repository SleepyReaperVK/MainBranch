import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { setStoryIndex } from '../../Redux/storySlice';
import LoadingBar from './LoadingBar';

const LoadingBars = ({ storyArray, storyIndex , isPaused}) => {
  const dispatch = useDispatch();

  const handleFinishLoading = (index) => {
    // apon currentBar is Finished
    if (index <= storyIndex && index!=storyArray.length-1) {
      dispatch(setStoryIndex(storyIndex + 1)) 
      console.log('storyIndex',storyIndex);
    } else {
      // All elements have finished loading
      // Handle completion logic here
      console.log('Done');
    }
  };

  return (
    <View style={styles.container}>
  {storyArray.map((_, index) => {
    return (
      <LoadingBar
        key={index}
        Index={index}
        onFinishLoading={handleFinishLoading}
        storyIndex={storyIndex}
        isPaused={isPaused}
      >

      </LoadingBar>
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
    backgroundColor: 'Transperet',
    borderRadius:8,
  },
});

export default LoadingBars;