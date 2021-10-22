import React from "react";
import { View, Text } from "react-native";

//the chat component - the main component that will render the UI
export default class Chat extends React.Component {
    render() {
        let name = this.props.route.params.name;

        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello {name}!</Text>
            </View>
        );
    }
}
