import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, Text, TextInput, View, Dimensions, Button, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';
import BarcodeScan from '../components/BarcodeScan';
function Main({ navigation }) {
    const [techs, setTechs] = useState('');

    return <>
        <RNCamera style={styles.mapStyle}
            flashMode={RNCamera.Constants.FlashMode.off} //auto, on, off or torch
            autoFocus={RNCamera.Constants.AutoFocus.on} // on or off
            type={RNCamera.Constants.Type.back}//back or front
            zoom={0.0}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.DATA_MATRIX}
        />
        <View style={styles.search}>
            <TextInput
                style={styles.inputSearch}
                placeholder="Localizars Desenho"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={text => setTechs(text)}
            />
            <TouchableOpacity style={styles.button}>
                <Icon name="thumbs-o-up" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.capture}>
            <Icon name="camera" size={30} color="#000" />
        </TouchableOpacity>
    </>
}

export default Main;

const styles = StyleSheet.create({
    capture: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    image: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    bio: {
        color: '#666',
        marginTop: 5,
    },
    techs: {
        marginTop: 5,
    },
    search: {
        position: "absolute",
        top: 20,
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