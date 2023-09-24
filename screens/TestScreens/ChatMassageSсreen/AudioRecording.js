import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

const AudioRecording = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [recording, setRecording] = useState();
  const [recordingUri , setRecordingUri] = useState();

  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setIsRecordingActive(true);
    } catch (error) {
      console.error('Error starting recording: ', error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsRecordingActive(false);
    try {
      await recording.stopAndUnloadAsync();
     setRecordingUri(recording.getURI());
    } catch (error) {
      console.error('Error stopping recording: ', error);
    }
  };

  const saveRecording = () => {
    if (recordingUri) {
      onSave('voice', recordingUri);
    }
  };

  return (
    <View>
      {!isRecordingActive ? (
        <TouchableOpacity onPress={startRecording}>
          <FontAwesome name="microphone" size={30} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={stopRecording}>
          <FontAwesome name="stop-circle" size={30} />
        </TouchableOpacity>
      )}
      {isRecording && <Text>Recording...</Text>}
        {recordingUri && !isRecording && (
        <TouchableOpacity  onPress={saveRecording}>
          <Text>Save Recording</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AudioRecording;