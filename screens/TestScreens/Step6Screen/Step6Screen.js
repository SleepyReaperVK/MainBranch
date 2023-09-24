import  React, { useState , useEffect } from 'react';
import { View, SafeAreaView, StyleSheet ,StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibraryAsync } from 'expo-image-picker';

//TEMP Working Step6 Scren
const Step6Screen = () => {
    const [imgArr, setImgArr] = useState([])
    const navigation = useNavigation();
    /**
   * Function to open the gallery and select an image.
   */
    const openGallery = async (setImageUri) => {
        console.log("open");
    const result = await launchImageLibraryAsync();
        if (!result.canceled) {
        const newImageUri = result.assets[0].uri;
        setImageUri(newImageUri);
        setImgArr([...imgArr, newImageUri]); //async func
        }
    }

    const removeImg = (imgUri) => {
        const newImgArray = imgArr.filter(item => item !== imgUri);
        setImgArr(newImgArray)

        // const newImgArray = [];
        // for (let i = 0; i < imgArr.length; i++) {
        //     if (imgArr[i] !== imgUri) {
        //         newImgArray.push(imgArr[i]);
        //     }
        //     setImgArr(newImgArray)
        // }
    }
  
    const handleValidPress = () => {
        if (imgArr.length == 0) {
            console.log("meet Validation requirements ")
        }
        else {
            navigation.navigate('Step7', imgArr);
        console.log("imgArr",imgArr)
        }
        
    }

 // TODO convert width:height to Parentage 
    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
            
            </View>
    </SafeAreaView>
    );

};

export default Step6Screen;


const styles = StyleSheet.create({
    safeView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
     container: {
        flex: 1,
        flexWrap: 'wrap',
         flexDirection: 'row',
         justifyContent:'space-around',
    },
    imgContainer: {
        flex: 0.5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor:'black'
    },
})