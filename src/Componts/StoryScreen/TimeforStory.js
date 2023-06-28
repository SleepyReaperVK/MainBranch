import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const TimeforStory = ({ storyArrayLength, onFinishLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timerId;

    const startTimer = () => {
      timerId = setTimeout(() => {
        setLoading(false);
        onFinishLoading(currentIndex);
      }, 7000); // Hardcoded 7 seconds
    };

    const resetTimer = () => {
      clearTimeout(timerId);
      setLoading(true);
      startTimer();
    };

    startTimer();

    return () => clearTimeout(timerId);
  }, [currentIndex, onFinishLoading]);

  const handlePress = () => {
    setLoading(!loading);
  };

  return (
    <View style={styles.container} onTouchStart={handlePress} onTouchEnd={handlePress}>
      {Array(storyArrayLength)
        .fill()
        .map((_, index) => (
          <View
            key={index}
            style={[styles.loadingBar, index === currentIndex && !loading && styles.finishedLoadingBar]}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    height: 4,
    backgroundColor: '#eee',
  },
  loadingBar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#bbb',
  },
  finishedLoadingBar: {
    backgroundColor: '#00c300',
  },
});

export default TimeforStory;