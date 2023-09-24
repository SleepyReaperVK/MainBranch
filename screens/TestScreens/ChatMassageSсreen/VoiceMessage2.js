import React from 'react' 
import { View } from 'react-native';  
import { Audio } from 'expo-av';
import { Svg, Circle } from 'react-native-svg';
import { useEffect } from 'react';
const VoiceMessage2 = ({ audioUri }) => {
  const audioFile = audioUri;
  useEffect(() => {
   playAudio()
 },[])
    const playAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(audioFile);
        const status = await sound.getStatusAsync();
        console.log('status', status)
        await sound.playAsync();
      } catch (error) {
        console.error('Failed to play audio', error);
      }
  };
     const AudioVisualizer = ({audioUri}) => {
       const waveform = [0.1, 0.1, 0.1, 0.1, 0.1, 0.6]; // Replace with your actual   
       
      
       return (
         <Svg width="200" height="200">
           {waveform.map((amplitude, index) => (
             <Circle
               key={index}
               cx={index * 30}
               cy={100 - amplitude * 100}
               r={5}
               fill="blue"
             />
           ))}
         </Svg>
       );
  };
  
       return (
         <View>
           <AudioVisualizer audioUri={audioUri} />
         </View>
       );

}
   
export default VoiceMessage2