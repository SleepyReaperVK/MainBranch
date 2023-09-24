import  React, {useState} from 'react';
import { View, SafeAreaView, StyleSheet ,StatusBar, Platform ,Text,Button} from 'react-native';
import VoiceMessage from './VoiceMassage';
import VoiceMessage2 from './VoiceMessage2';
import VoiceMessage3 from './Voicemassage3'
import AudioRecording from './AudioRecording';


const ChatMassageScreen = ({ navigation }) => {
  const [audioUri, setAudioUri] = useState('https://samplelib.com/lib/preview/mp3/sample-3s.mp3');

    function Card({ children ,style }) {
  return <View style={[style,styles.card]}>{children}</View>;
}
  const addMessage = (type, content) => {
  console.log("message type", type);  
  console.log("message content", content);
  setAudioUri(content); // Set the audio URI when a message is added
};

    return (
    <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Card style={{width:250}}>
            <VoiceMessage audioUri={audioUri} />
            {/* <VoiceMessage2 uri={audioUri} />  */}
           <AudioRecording onSave={addMessage} />
          </Card>
        </View>
    </SafeAreaView>
    );

};

export default ChatMassageScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
   card: {
    backgroundColor: 'rgba(211, 211, 211, 0.6)',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
})