//___Imported____//
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import {colors} from '../../utils/colors'

const secondsToMillis = (sec) => sec * 1000 ;
const millisToSeconds = (mill) => mill / 1000 ;

export const Countdown = ({ sec = 5, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);
  
const resetTime = ()=>{
  setMillis(secondsToMillis(sec))
};

  const countDown = () => {
    setMillis((prevMillis) => {
        if (prevMillis === 0) {
          clearInterval(interval.current);
          onEnd(resetTime);
          return prevMillis;
        }
        return prevMillis - 100; // set the value to dec each tick
      });
  };

  useEffect(() => {
    setMillis(secondsToMillis(sec));
  }, [sec]);

  useEffect(() => {
    console.log(1-(millis / secondsToMillis(sec)))
    onProgress(1-(millis / secondsToMillis(sec)));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 100);/// seting the time between each tick

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {millisToSeconds(millis)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});