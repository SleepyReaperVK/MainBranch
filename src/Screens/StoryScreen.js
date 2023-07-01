import React, { useState, useEffect } from 'react';
import { Button, ImageBackground, View, TouchableOpacity, StyleSheet, Dimensions, TextInput, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { setStoryIndex } from '../Redux/storySlice';
import LoadingBars from '../Componts/StoryScreen/LoadingBars';

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const StoryScreen = ({navigation, route }) => {
  const { storyArray } = route.params;
  const dispatch = useDispatch();
  const storyIndex = useSelector((state) => state.story.storyIndex);
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <ImageBackground source={{ uri: storyArray[storyIndex] }} style={styles.container}>
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress} onLongPress={handleLongPress} onPressOut={handleRelease}>
          <View style={styles.imageBackground}>
            <LoadingBars storyArray={storyArray} storyIndex={storyIndex} isPaused={isPaused} />
            <TouchableOpacity style={[styles.button , {backgroundColor:"red" , width:'8%' } ]} onPress={()=> navigation.goBack()}>
                <Text>X</Text>
              </TouchableOpacity>
          </View>

          </TouchableOpacity>

          <View style={styles.container}> 

          <View style={styles.eventInfo}>
              <Card>
                <Text>Event Name</Text>
                <Text>Dist</Text>
                <TouchableOpacity style={styles.button}>
                <Text>ToEvent</Text>
              </TouchableOpacity>
              </Card>
            </View>

            
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Text>Like</Text>
              </TouchableOpacity>

              <View style={styles.commentBar}>
              <TouchableOpacity style={{flex:0.2}}>
                <Text>Send</Text>
              </TouchableOpacity>
                <TextInput style={styles.commentInput} placeholder="Send a Message..." />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
  },
  button: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  commentBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    flexDirection: "row-reverse",
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
  },
  eventInfo: {},
  safeAreaView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
});

export default StoryScreen;