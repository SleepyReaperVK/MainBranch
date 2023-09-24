import React, { useState, useRef, useEffect} from 'react';
import { View, Text, TouchableOpacity, Slider, Image } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import VolumeBarsOverlay from './VolumeBarsOverlay';
 

//TODO have the duration to be in V
const VoiceMessage = ({ audioUri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(1);
  const [audioDuration, setAudioDuration] = useState(0);

  const sound = useRef(new Audio.Sound());


useEffect(() => {
  unloadAudio()
  loadAudio();
}, [audioUri]);


  const unloadAudio = async () => {
  try {
    await sound.current.unloadAsync();
  } catch (error) {
    console.error('Error unloading audio: ', error);
    setAudioDuration(0);
  }
  };
  
const loadAudio = async () => {
  try {

    await sound.current.loadAsync({ uri: audioUri });
     await sound.current.getStatusAsync()
      .then(function(result) {
        console.log("duration", result.durationMillis)
        console.log("result",result)
      })
      .catch(console.log('first'));
  } catch (error) {
    console.error('Error loading audio: ', error);
  }
  setAudioDuration(sound.current.durationMillis);
};

  
  
const playPauseAudio = async () => {
  try {
    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
      sound.current.setOnPlaybackStatusUpdate(updateStatus);
      sound.current.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          sound.current.stopAsync(); // Stop the playback when finished
          sound.current.setPositionAsync(0); // Reset the position to start
        }
        updateStatus(status);
      });
    }
    setIsPlaying(!isPlaying);
  } catch (error) {
    console.error('Error playing/pausing audio: ', error);
  }
};

  const updateStatus = status => {
  if (status.isPlaying) {
    console.log("progress", status.positionMillis);
    setPosition(status.positionMillis/1000); // Divide by 1000 to convert to seconds
    setVolume(status.volume);
  }
  };
  
  const handaleIsPaused = () => {
    return !isPlaying
  }

  return (
  <View style={{
    flexDirection: 'column', // To align circle and message horizontally
    alignItems: 'flex-start', // To align circle and message vertically
    marginBottom: 10, // Add some spacing between messages
    flexWrap:'wrap',
  }} >
        {/* Sent Message */}
    <View style={{
        flexDirection: 'row-reverse',
      alignItems: 'center', // To align circle and message content vertically
    }}>
      <View style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#0078fe",
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* Placeholder Image */}
          <Image
            source={{uri:"http://cdn.onlinewebfonts.com/svg/img_74203.png"}}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={{
        backgroundColor: "#0078fe",
        padding: 10,
        marginLeft: 8,
        borderRadius: 20,
        maxWidth: '50%',
        alignSelf: 'flex-end',
      }}>
        <Text style={{ fontSize: 16, color: "#fff" }}>hello</Text>
      </View>
    </View>

    {/* Received Message */}
    <View style={{
      flexDirection: 'row',
      alignItems: 'center', // To align circle and message content vertically
    }}>
      <View style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#dedede",
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* Placeholder Image */}
          <Image
            source={{uri:"https://static.vecteezy.com/system/resources/previews/000/424/425/original/vector-web-icon.jpg"}}
            style={{
            width: 32,
            height: 32,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={{
        backgroundColor: "#dedede",
        padding: 10,
        marginLeft: 8,
        borderRadius: 20,
        maxWidth: '50%',
        alignSelf: 'flex-start',
      }}>
        <Text style={{ fontSize: 16, color: "#000" }}>hello2312321</Text>
      </View>
    </View>
  
    
      <View style={{
        flexDirection: 'row', flexWrap: 'wrap', paddingBottom:20}}>
      <TouchableOpacity onPress={playPauseAudio}>
        <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} />
        </TouchableOpacity>
        <Slider
        style={{ width: 150, marginTop: 10 }}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={value => sound.current.setVolumeAsync(value)}
      />
        {/* TODO make the loading to be vertical bars and not horizontal , change animation duration to 1 sec / to the 3 sec.. */}
       <VolumeBarsOverlay secondesArray={[0,1,2,3,4,5,8,6,7,9,10,11,12,13,14,15,16,17,18]} second={position} isPaused={handaleIsPaused} />
      </View>
      </View>
  );
};

export default VoiceMessage;




                    



