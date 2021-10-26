import React from "react";
import {
    View,
    Button,
    TextInput,
    Text,
    Alert,
    ImageBackground,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

//variables holding the background image and user icon
const background = require("../assets/background-img.png");
const icon = require("../assets/user-icon.png");

//the start/homepage component
export default class Start extends React.Component {
    //starting with an empty state so that user can enter their own name
    constructor(props) {
        super(props);
        this.state = { name: "" };
    }

    // Check for username
    goToChat = (name) => {
        if (name == "") {
            return Alert.alert("Please enter your name!");
        }
        this.props.navigation.navigate("Chat", {
            name: this.state.name,
        });
    };

    render() {
        return (
            <ImageBackground style={styles.bgImage} resizeMode="cover" source={background}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome!</Text>

                    <View style={styles.mainBox}>
                        <View style={styles.usernameBox}>
                            <Image style={styles.usernameIcon} source={icon} />
                            <TextInput
                                style={styles.usernameText}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder="Please type your name..."
                                placeholderTextColor="#757083"
                                opacity="0.5"
                            />
                        </View>

                        {/*button to start chatting*/}
                        <View>
                            <TouchableOpacity
                                onPress={() => this.goToChat(this.state.name)}
                                style={styles.button}
                                accessible={true}
                                accessibilityLabel="Go to chat"
                                accessibilityHint="Takes you to the chat screen."
                                accessibilityRole="button"
                            >
                                <Text style={styles.buttonText}>Start Chatting</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column-reverse",
        alignItems: "center",
    },

    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#fff",
        position: "absolute",
        top: 100,
    },

    bgImage: {
        width: "100%",
        height: "100%",
        flex: 1,
    },

    mainBox: {
        width: "88%",
        height: 320,
        marginBottom: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },

    usernameBox: {
        flex: 1,
        width: "88%",
    },

    usernameIcon: {
        position: "absolute",
        top: 45,
        left: 15,
    },

    usernameText: {
        top: 25,
        height: 60,
        borderColor: "#757083",
        borderWidth: 2,
        fontSize: 16,
        fontWeight: "300",
        paddingLeft: 45,
        borderRadius: 10,
    },

    button: {
        flex: 1,
        position: "absolute",
        bottom: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#757083",
        width: "88%",
        height: 60,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
});
