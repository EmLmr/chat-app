import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, SystemMessage, Day, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
//detect internet connection
import NetInfo from '@react-native-community/netinfo';
//share media and location
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

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
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            image: null,
            location: null,
            // loggedInText: 'Please wait, you are getting logged in...',
        };

        //check that referenceChatMessages is not null or undefined
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        //reference to messages stored in Firebase
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.referenceUserMessages = null;
    }

    componentDidMount() {
        //variable to hold user's name, passed as props from the Start screen
        const { name } = this.props.route.params;
        //setting up the screen title
        this.props.navigation.setOptions({ title: name });

        //check if device is online
        NetInfo.fetch().then((connection) => {
            if (connection.isConnected) {
                this.setState({ isConnected: true });

                //reference message collection in db
                this.unsubscribe = this.referenceChatMessages
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(this.onCollectionUpdate);

                //create new user if no user is signed in
                this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        firebase.auth().signInAnonymously();
                    }
                    //update user state with currently active user data
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                            avatar: 'https://placeimg.com/140/140/any',
                        },
                    });

                    //create a reference to the active user's messages in Firebase
                    this.referenceUserMessages = firebase
                        .firestore()
                        .collection('messages')
                        .where('uid', '==', this.state.uid);
                });
                //saving messages locally to asyncStorage
                this.saveMessages();
            } else {
                this.setState({ isConnected: false });
                //obtaining messages from asyncStorage
                this.getMessages();
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.authUnsubscribe();
    }

    //retrieves data from "messages" collection and stores it
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            const data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text || '',
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages,
        });
    };

    // add messages to database
    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: message.user,
            uid: this.state.uid,
            image: message.image || null,
            location: message.location || null,
        });
    }

    //saves previously sent messages
    onSend(messages = []) {
        this.setState(
            (previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }),
            () => {
                //save new messages to db
                this.addMessage();
                //save new messages to local async storage
                this.saveMessages();
            }
        );
    }

    //get messages from local async storage when offline
    async getMessages() {
        let messages = '';
        try {
            messages = (await AsyncStorage.getItem('messages')) || [];
            this.setState({
                messages: JSON.parse(messages),
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    //save messages to local async storage when offline
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: [],
            });
        } catch (error) {
            console.log(error.message);
        }
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

    //hide input toolbar if user is offline
    renderInputToolbar(props) {
        if (this.state.isConnected) {
            return <InputToolbar {...props} />;
        }
    }

    renderCustomActions(props) {
        return <CustomActions {...props} />;
    }

    renderCustomView(props) {
        const { currentMessage } = props;

        //send location property if it is present
        if (currentMessage.location) {
            return (
                <MapView
                    style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
        // //send image property if it is present
        // if (currentMessage.image) {
        //     return (
        //         <Image
        //             style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
        //             source={{ uri: currentMessage.image.uri }}
        //         />
        //     );
        // }
    }

    render() {
        //variable to hold background color, passed as props from the Start screen
        let bgColor = this.props.route.params.backgroundColor;

        return (
            <View style={[styles.container, { backgroundColor: bgColor }]}>
                {/*chat interface*/}
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderSystemMessage={this.renderSystemMessage.bind(this)}
                    renderDay={this.renderDay.bind(this)}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={this.state.user}
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
