import React, { Component } from 'react';
import { StyleSheet, Alert, Text, TextInput, View, Dimensions, Button, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';

export default class BarcodeScan extends Component {

    constructor(props) {
        super(props);
        this.handleTourch = this.handleTourch.bind(this);
        this.state = { torchOn: false }
    }

    onBarCodeRead = (e) => {
        console.log(e.type + " Barras: " + e.data);
        Alert.alert("Tipo: " + e.type, "Barras: " + e.data);
    }

    takePicture = async () => {
        try {
            if (this.RNCamera) {
                const options = {
                    quality: 0.85,
                    fixOrientation: true,
                    forceUpOrientation: true,
                    writeExif: true,
                    base64: true
                };
                const data = await this.RNCamera.takePictureAsync(options)
                alert(data.uri);
            }
        }
        catch (err) {
            Alert.alert("Error", "Failed to take picture: " + (err.message || err));
            return;
        }
    }

    render() {
        return <>
            <View style={styles.container}>
                <RNCamera
                    whiteBalance={RNCamera.Constants.WhiteBalance.auto}
                    type={RNCamera.Constants.Type.back} //back or front
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    style={styles.preview}
                    flashMode={this.state.torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.RNCamera = cam}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        //console.log(barcodes);
                    }}>

                </RNCamera>
                <View style={styles.overlayTop} />
                <View style={styles.bottomOverlay}>
                    <TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}>
                        <Image style={styles.cameraIcon}
                            source={this.state.torchOn === true ? require('../../images/flasher_on.png') : require('../../images/flasher_off.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.overlayBottom} />
            </View>
        </>
    }
    handleTourch(value) {
        if (value === true) {
            this.setState({ torchOn: false });
        } else {
            this.setState({ torchOn: true });
        }
    }
}
const styles = StyleSheet.create({
    overlayTop: {
        position: 'absolute',
        height: '30%',
        //width: Dimensions.get('window').width,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    overlayBottom: {
        bottom: 0,
        position: 'absolute',
        height: '30%',
        //width: Dimensions.get('window').width,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cameraIcon: {
        margin: 5,
        height: 40,
        width: 40
    },
    bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    search: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    inputSearch: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 16,
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: '#27ae60',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
});