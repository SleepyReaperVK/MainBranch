import React, { useState, useEffect ,useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';


const VolumeBar = ({ Index, onFinishLoading, second, isPaused }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const progressAnimation = useState(new Animated.Value(0))[0];
  const passedTime =useRef(0);

  useEffect(() => {
    console.log(Index >= second);
    console.log('second', second)
    if (Index >= second) {
      setIsCompleted(false);
    } else {
      setIsCompleted(true);
    }

    const duration = Index === second ? 3000 : 0;
    let animation;

    if (duration > 0 && !isPaused) {
      animation = Animated.timing(progressAnimation, {
        toValue: 1,
        duration:duration - passedTime.current,
        useNativeDriver: false,
      });

      animation.start(({ finished }) => {
        if (finished) {
          onFinishLoading(Index);
        }
      });
    } else {
      passedTime.current= progressAnimation._value * duration
      progressAnimation.setValue(progressAnimation._value); // Set animation value to 0 if duration is 0 or isPaused is true
      console.log(passedTime)
    }

    return () => {
      if (animation) {
        animation.stop();

      }
    };
  }, [Index, onFinishLoading, progressAnimation,isPaused]);

  useEffect(()=>{
    if(!isCompleted && Index != second)
    progressAnimation.setValue(0);
    else
    console.log("useEffectAtivated",second)
  },[second]);


  return (
    <View style={styles.loadingBarContainer}>
      <Animated.View
        style={[
          styles.loadingBar,
          {
            width: progressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange:
              Index === second ? ['0%', '100%'] : isCompleted ? ['100%', '100%'] : ['0%', '0%'],
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
    height: '300%',
    borderRadius: 8,
    backgroundColor: '#2f4f4fcc',
    marginEnd:2,
    overflow:'hidden',
    
  },
  loadingBar: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#07AC59CC', // Red color
  },
});

export default VolumeBar;
