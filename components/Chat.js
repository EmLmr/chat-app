import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

//the chat component - the main component that will render the UI
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //variable to hold the username and background color, passed as props on the Start screen
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        let bgColor = this.props.route.params.backgroundColor;

        return (
            <View style={[styles.container, { backgroundColor: bgColor }]}>
                <Text style={styles.greetings}>Hi, {name}!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    greetings: {
        fontSize: 40,
        fontWeight: '300',
        color: '#fff',
        position: 'absolute',
        top: 10,
    },
});
