import React, { useEffect, useState } from 'react';
import { View, Dimensions, Animated, Button} from 'react-native';
import { Audio } from 'expo-av';

const VoiceMessage3 = ({ audioUri }) => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationValue, setAnimationValue] = useState(new Animated.Value(0));

    useEffect(() => {
        // Load audio file
        async function loadAudio() {
            const { sound } = await Audio.Sound.createAsync(audioUri);
            setSound(sound);
        }

        loadAudio();

        return () => {
            // Clean up resources
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const handlePlayback = async () => {
        if (!sound) return;

        if (isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        // Animate audio visualization
        function animateVisualization() {
            Animated.loop(
                Animated.timing(animationValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
        }

        if (isPlaying) {
            animateVisualization();
        } else {
            animationValue.stopAnimation();
        }
    }, [isPlaying]);

    const interpolatedColor = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 0, 0, 0.5)', 'rgba(255, 0, 0, 1)'],
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View
                style={{
                    width: Dimensions.get('window').width * 0.8,
                    height: 20,
                    backgroundColor: interpolatedColor,
                }}
            />
            <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayback} />
        </View>
    );
}
    export default VoiceMessage3;