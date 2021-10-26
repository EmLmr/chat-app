import React from "react";
import { View, Text } from "react-native";

//the chat component - the main component that will render the UI
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //holds the user's name, passed as props on the Start screen
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        let bgColor = this.props.route.params.backgroundColor;

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: bgColor,
                }}
            >
                <Text>Hello, {name}!</Text>
            </View>
        );
    }
}
