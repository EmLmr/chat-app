import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, SystemMessage, Day } from 'react-native-gifted-chat';

// to be able to use Firebase
const firebase = require('firebase');
require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB-1b3MtyUoBho9cM3wKkTUcdJVc-OeWxM',
    authDomain: 'chat-app-cf-41506.firebaseapp.com',
    projectId: 'chat-app-cf-41506',
    storageBucket: 'chat-app-cf-41506.appspot.com',
    messagingSenderId: '100571290233',
    appId: '1:100571290233:web:50fe4545a7c9a199d312a8',
};

//the chat component - the main component that will render the UI
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            uid: 0,
            // loggedInText: 'Please wait, you are getting logged in...',
        };

        // to connect to Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // reference to messages stored in Firebase
        this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    componentDidMount() {
        // this.setState({
        //     messages: [
        //         {
        //             _id: 1,
        //             text: 'Hello developer',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //                 avatar: 'https://placeimg.com/140/140/any',
        //             },
        //         },
        //         {
        //             _id: 2,
        //             text: `${this.props.route.params.name} has joined the chat!`,
        //             createdAt: new Date(),
        //             system: true,
        //         },
        //     ],
        // });

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            //update user state with currently active user data
            this.setState({
                uid: user.uid,
                messages: [],
                // loggedInText: 'Hello there!',
            });
            // create a reference to the active user's messages in Firebase
            this.referenceChatMessages = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
    }

    //saves previously sent messages
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    //customizes the chat bubbles into the specified color
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    //user's chat bubble
                    right: {
                        backgroundColor: '#647C80',
                    },
                    //other person's chat bubble
                    left: {
                        backgroundColor: '#E6F1F3',
                    },
                }}
            />
        );
    }

    //customizes the system message for better readability
    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                textStyle={{
                    color: this.props.route.params.backgroundColor,
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    padding: 3,
                }}
            />
        );
    }

    //customizes the date appearing at the top of a recent chat
    renderDay(props) {
        return (
            <Day
                {...props}
                textStyle={{
                    color: 'white',
                    fontWeight: 'bold',
                }}
            />
        );
    }

    render() {
        //variable to hold the username and background color, passed as props on the Start screen
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        let bgColor = this.props.route.params.backgroundColor;

        return (
            <View style={[styles.container, { backgroundColor: bgColor }]}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderSystemMessage={this.renderSystemMessage.bind(this)}
                    renderDay={this.renderDay.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {/* fixes keyborad hiding the message input field for older Android devices */}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
