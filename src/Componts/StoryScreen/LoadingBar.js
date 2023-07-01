import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingBar = ({ Index, onFinishLoading, storyIndex, isPaused }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const progressAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (Index >= storyIndex) {
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
    }

    const duration = Index === storyIndex ? 3000 : 0;
    let animation;

    if (duration > 0 && !isPaused) {
      animation = Animated.timing(progressAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      });

      animation.start(({ finished }) => {
        if (finished) {
          onFinishLoading(Index);
        }
      });
    } else {
      progressAnimation.setValue(0); // Set animation value to 0 if duration is 0 or isPaused is true
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [Index, onFinishLoading, progressAnimation, storyIndex, isPaused]);

  return (
    <View style={styles.loadingBarContainer}>
      <Animated.View
        style={[
          styles.loadingBar,
          {
            width: progressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange:
              Index === storyIndex ? ['0%', '100%'] : isCompleted ? ['100%', '100%'] : ['0%', '0%'],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBarContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 2,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 8,
    marginEnd:4,
  },
  loadingBar: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#FF0000', // Red color
  },
});

export default LoadingBar;
