import React from "react";
import { View, TextInput, Button } from "react-native";

//the start/homepage component
export default class Start extends React.Component {
    //starting with an empty state so that user can enter their own name
    constructor(props) {
        super(props);
        this.state = { name: "" };
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TextInput
                    style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    placeholder="Type your name"
                />
                {/*will open the Chat screen + pass the user input (name) as props to appear on the Chat screen*/}
                <Button
                    title="Go to Chat"
                    onPress={() => this.props.navigation.navigate("Chat", { name: this.state.name })}
                />
            </View>
        );
    }
}
