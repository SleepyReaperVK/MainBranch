// TEMP  This Screen to be deleted before release or after all features are implemented.


import React from 'react'
import { Button,SafeAreaView, StyleSheet ,StatusBar  } from 'react-native';


const TestGroundStackScreen = ({ navigation }) => {

    const goTo = (path) => {
    navigation.navigate(path);
    };
    const handleStep6 = () => {
        goTo('Step6'); 
    };
    const handleVideoPlayer = () => {
        goTo('VideoPlayer'); 
    };
     const handleCheckMark = () => {
        goTo('CheckMark'); 
    };
     const handleChatMassage = () => {
        goTo('ChatMassage'); 
    };
    return (
        <SafeAreaView style={styles.safeView}>
            <Button title='Step6' onPress={handleStep6} />  
            <Button title='VideoPlayer' onPress={handleVideoPlayer} />
            <Button title='CheckMark' onPress={handleCheckMark} disabled= {false} />
            <Button title='ChatMassage' onPress={handleChatMassage} disabled= {false}/>
       </SafeAreaView>  


    );
}

export default TestGroundStackScreen;

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
})
