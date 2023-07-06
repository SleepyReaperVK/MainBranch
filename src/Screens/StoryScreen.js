import React, { useState, useEffect } from 'react';
import {  ImageBackground, View, TouchableOpacity, StyleSheet, Dimensions, TextInput, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { setStoryIndex } from '../Redux/storySlice';
import LoadingBars from '../Componts/StoryScreen/LoadingBars';

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};
// remove  route to redux 
const StoryScreen = ({navigation, route }) => {
  const { storyArray } = route.params;
  const dispatch = useDispatch();
  const storyIndex = useSelector((state) => state.story.storyIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [isLike, setIsLike] = useState(false);
  
  
  const handlePress = (event) => {
    const { locationX } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    if (locationX <= screenWidth / 2) {
      handleSwipeLeft();
      console.log('handleSwipeLeft');
    } else {
      handleSwipeRight();
      console.log('handleSwipeRight');
    }
  };

  const handleSwipeLeft = () => {
    if (storyIndex > 0) {
      dispatch(setStoryIndex(storyIndex - 1));
      console.log('LeftStoryIndex', storyIndex);
    }
  };

  const handleSwipeRight = () => {
    if (storyIndex < storyArray.length - 1) {
      dispatch(setStoryIndex(storyIndex + 1));
      console.log('RightStoryIndex', storyIndex);
    }
  };

  const handleLongPress = () => {
    setIsPaused(true);
    console.log('handleLongPress');
  };

  const handleRelease = () => {
    setIsPaused(false);
    console.log('handleRelease');
  };
  const handleLikePress = () => {
    setIsLike(!isLike)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <ImageBackground source={{ uri: storyArray[storyIndex] }} style={styles.container}>
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress} onLongPress={handleLongPress} onPressOut={handleRelease}>
          <View style={styles.imageBackground}>
            <LoadingBars storyArray={storyArray} storyIndex={storyIndex} isPaused={isPaused} />
            <TouchableOpacity style={styles.xButton} onPress={()=> navigation.goBack()}>
            <Ionicons name="close-circle-outline" color="red" size={32} />
              </TouchableOpacity>
          </View>

          </TouchableOpacity>

          <View style={styles.containerButtom}> 

          <View style={styles.eventInfo}>
              <Card>
                <Text style={{fontSize:16, fontWeight:'bold', color:'rgba(0, 0, 0, 1)'}}>Event Name</Text>
                <Text>Dist</Text>
                <TouchableOpacity style={styles.button}>
                <Text>ToEvent</Text>
              </TouchableOpacity>
              </Card>
            </View>

            
            <View style={styles.row}>
            <TouchableOpacity onPress={handleLikePress}>
            {isLike ? (
              <Ionicons name="heart-sharp" color="red" size={32} />
              ) : (
              <Ionicons name="heart-outline" size={32} />
              )}
              </TouchableOpacity>
              <View style={styles.commentBar}>
              <TouchableOpacity style={{flex:0.2 ,borderWidth:2,
    borderColor:'white', }}>
               <Ionicons name="send-outline" color="red" size={32} />
              </TouchableOpacity>
                <TextInput style={styles.commentInput} placeholder="Send a Message..." color="red" />
              </View>
            </View>
          </View>
        </ImageBackground>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  loadingBar: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerButtom: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width:'10',
    marginRight: 10,
    marginBottom: 15 ,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  xButton :{
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 16,
    backgroundColor:"red" ,
    alignItems:'center',
    size:32,
  },
  commentBar: {
    flex: 1,
    height:'100%',
    flexDirection: "row-reverse",
    alignItems: 'center',
    borderWidth:2,
    borderColor:'white',
  },
  commentInput: {
    flex: 1,
    height:'100%',
    backgroundColor: 'transperent',
  },
  eventInfo: {},
  safeAreaView: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(211, 211, 211, 0.6)',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
});

export default StoryScreen;