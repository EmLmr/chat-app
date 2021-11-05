import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

class CustomActions extends Component {
    //actions available to user
    onActionPress = () => {
        const options = ['Choose image from gallery', 'Take photo', 'Share location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        return this.pickImage();
                    case 1:
                        console.log('user wants to take a photo');
                        return this.takePhoto();
                    case 2:
                        console.log('user wants to get their location');
                        return this.getLocation();
                    default:
                }
            }
        );
    };

    //let's user pick an image - switch case 0
    pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        try {
            if (status === 'granted') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: 'Images',
                }).catch((error) => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    //let's user take a photo - switch case 1
    takePhoto = async () => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.CAMERA);
        try {
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync().catch((error) => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    //let's user share their location - switch case 2
    getLocation = async () => {
        try {
            const locationPermission = await Location.requestForegroundPermissionsAsync();
            if (locationPermission.granted) {
                const locationResult = await Location.getCurrentPositionAsync().catch((err) => console.error(err));
                const longitude = JSON.stringify(locationResult.coords.longitude);
                const latitude = JSON.stringify(locationResult.coords.latitude);
                if (locationResult) {
                    this.props.onSend({
                        location: {
                            longitude: longitude,
                            latitude: latitude,
                        },
                    });
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    render() {
        return (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel="More options"
                accessibilityHint="Let’s you choose to send an image or your geolocation."
                style={[styles.container]}
                onPress={this.onActionPress}
            >
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CustomActions;

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

CustomActions.contextTypes = {
    //actionSheet is what pops up when the "+" button is pressed
    actionSheet: PropTypes.func,
};
