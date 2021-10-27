import React from "react";
import { View, TextInput, Text, Alert, ImageBackground, Image, StyleSheet, TouchableOpacity } from "react-native";

//variables holding the background image and user icon
const background = require("../assets/background-img.png");
const icon = require("../assets/user-icon.png");

//the start/homepage component
export default class Start extends React.Component {
    //starting with an empty state so that user can enter their own name
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            bgColor: "#757083",
        };
    }

    // check for username
    goToChat = (name) => {
        if (name == "") {
            return Alert.alert("Please enter your name!");
        }
        this.props.navigation.navigate("Chat", {
            name: this.state.name,
            backgroundColor: this.state.bgColor,
        });
    };

    render() {
        return (
            <ImageBackground style={styles.bgImage} resizeMode="cover" source={background}>
                <View style={styles.container}>
                    <Text style={styles.title}>Let's chat!</Text>
                    <View style={styles.mainBox}>
                        {/*where the user inputs their name*/}
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

                        {/*where user picks a background color*/}
                        <View style={styles.colorPaletteContainer}>
                            <Text style={styles.colorPaletteText}>Choose Background Color:</Text>
                            <View style={styles.colorPicker}>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Black color"
                                    accessibilityHint="To choose black as a background color for the chat."
                                    style={[styles.colors, styles.black]}
                                    onPress={() => this.setState({ bgColor: "#090C08" })}
                                ></TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Dark purple color"
                                    accessibilityHint="To choose dark purple as a background color for the chat."
                                    style={[styles.colors, styles.purple]}
                                    onPress={() => this.setState({ bgColor: "#474056" })}
                                ></TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Dusty blue color"
                                    accessibilityHint="To choose dusty blue as a background color for the chat."
                                    style={[styles.colors, styles.blue]}
                                    onPress={() => this.setState({ bgColor: "#8A95A5" })}
                                ></TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Dusty green color"
                                    accessibilityHint="To choose dusty green as a background color for the chat."
                                    style={[styles.colors, styles.green]}
                                    onPress={() => this.setState({ bgColor: "#B9C6AE" })}
                                ></TouchableOpacity>
                            </View>
                        </View>

                        {/*button to start chatting*/}
                        <View>
                            <TouchableOpacity
                                onPress={() => this.goToChat(this.state.name)}
                                style={[styles.button, { backgroundColor: this.state.bgColor }]}
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

    // white box on start screen
    mainBox: {
        width: "88%",
        height: 320,
        marginBottom: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
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
    },

    colorPaletteContainer: {
        position: "absolute",
        alignSelf: "center",
    },

    colorPaletteText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
    },

    colorPicker: {
        flexDirection: "row",
        marginTop: 15,
        width: "92%",
    },

    colors: {
        width: 45,
        height: 45,
        marginRight: 20,
        borderRadius: 45 / 2,
        margin: 5,
    },

    black: {
        backgroundColor: "#090C08",
    },

    purple: {
        backgroundColor: "#474056",
    },

    blue: {
        backgroundColor: "#8A95A5",
    },

    green: {
        backgroundColor: "#B9C6AE",
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
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
});
