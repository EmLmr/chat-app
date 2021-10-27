import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

//the chat component - the main component that will render the UI
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        });
    }

    //saves previously sent messages
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        //variable to hold the username and background color, passed as props on the Start screen
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        let bgColor = this.props.route.params.backgroundColor;

        return (
            <View style={[styles.container, { backgroundColor: bgColor }]}>
                {/* <Text style={styles.greetings}>Hi, {name}!</Text> */}
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    // greetings: {
    //     fontSize: 40,
    //     fontWeight: '300',
    //     color: '#fff',
    //     position: 'absolute',
    //     top: 10,
    // },
});
