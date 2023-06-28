import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { setStoryIndex } from '../Redux/storySlice';

const StoryScreen = ({ route }) => {
  const { storyArray } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const storyIndex = useSelector((state) => state.story.storyIndex);
  const navigation = useNavigation();

  const handleSwipeLeft = () => {
    if (currentIndex < storyArray.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentIndex(storyIndex);
  }, [storyIndex]);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', () => {
        dispatch(setStoryIndex(currentIndex));
      });

      return unsubscribe;
    }, [navigation, currentIndex, dispatch])
  );

  const handlePress = (event) => {
    const { locationX } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;

    if (locationX < screenWidth / 2) {
      handleSwipeRight();
    } else {
      handleSwipeLeft();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handlePress}
    >
      <Image source={{ uri: storyArray[currentIndex] }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default StoryScreen;