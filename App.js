import React from 'react';
import 'react-native-gesture-handler';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import the 2 screen components to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// create the navigator
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                {/*the start/homepage*/}
                <Stack.Screen name="Start" component={Start} />
                {/*the chat page*/}
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
