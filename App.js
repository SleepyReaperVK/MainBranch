import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/Screens/HomeScreen';
import StoryScreen from './src/Screens/StoryScreen';
import store from './src/Redux/store';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Story" component={StoryScreen} 
         options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
    </Provider>
    
  );
}