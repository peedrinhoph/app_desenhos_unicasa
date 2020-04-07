import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Modal, StyleSheet, Alert, Text, TextInput, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FTP from 'react-native-ftp';

import api from '../../services/api';

import {
    ModalContainer,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    CameraButtonContainerVertical,
    CancelButtonTextVertical,
    TakePictureButtonContainer,
    TakePictureButtonLabel,
    Nav
} from './styles';

export default function Main({ navigation }) {
    const [num_ordem, setNum_ordem] = useState('');
    const [cameraModalOpened, setCameraModalOpened] = useState(false);
    const [flashOn, setFlashOn] = useState(false)
    const [link, setLink] = useState([]);

    const onBarCodeRead = (e) => {
        try {
            console.log(e.type + " Barras: " + e.data);
            setNum_ordem(e.data);
            setCameraModalOpened(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleTourch = (value) => {
        if (value === true) {
            setFlashOn(false);
        } else {
            setFlashOn(true);
        }
    }

    const onButtonpress = (desenho_link) => {
        console.log(desenho_link);
        FTP.setup("172.16.1.123", 21)
        FTP.login("desenhos", "@$desenhos").then(
            (result) => {
                FTP.downloadFile(`${desenho_link}`, "/storage/emulated/0/Download")
                    .then((result) => {
                        //console.log(result);
                        Alert.alert(
                            'Download Concluído!',
                            'Seu arquivo está em Downloads.',
                            [
                                {
                                    text: 'OK'
                                }
                            ],
                            { cancelable: true },
                        );
                    })
                    .catch(error => alert(error));
            }
        )
    }

    const renderCameraModalVertical = () => (
        <Modal
            visible={cameraModalOpened}
            transparent={true}
            animationType="slide"
        >
            <ModalContainer>
                <RNCamera
                    zoom={0.0}
                    whiteBalance={RNCamera.Constants.WhiteBalance.auto}
                    type={RNCamera.Constants.Type.back} //back or front
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    style={styles.CameraPreview}
                    flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                    onBarCodeRead={onBarCodeRead}
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
                />
                <View style={styles.overlayTopVertical} />
                <View style={styles.overlayBottomVertical} />
                <View style={{
                    width: 50,
                    height: 50,
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    transform: [
                        { rotate: "90deg" },
                    ]
                }}>
                    <TouchableOpacity onPress={() => handleTourch(flashOn)}>
                        <IconMaterial name={flashOn === true ? "flash-on" : "flash-off"} size={40} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={{
                    bottom: 0,
                    width: 35,
                    height: 40,
                    alignSelf: 'flex-end',
                    position: 'absolute',
                }}>
                    <TouchableOpacity onPress={() => setCameraModalOpened(false)}>
                        <IconMaterial name="close" size={40} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </ModalContainer>
        </Modal>
    )
    const renderCameraModal = () => (
        <Modal
            visible={cameraModalOpened}
            transparent={false}
            animationType="slide"
        >
            <ModalContainer>
                <RNCamera
                    zoom={0.0}
                    whiteBalance={RNCamera.Constants.WhiteBalance.auto}
                    type={RNCamera.Constants.Type.back} //back or front
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    style={styles.CameraPreview}
                    flashMode={flashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                    onBarCodeRead={onBarCodeRead}
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
                //googleVisionBarcodeMode={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE}
                />
                <View style={styles.overlayTop} />
                <View style={styles.flasherBottom}>
                    <TouchableOpacity onPress={() => handleTourch(flashOn)}>
                        <Image style={styles.flasherIcon}
                            source={flashOn === true ? require('../../images/flasher_on.png') : require('../../images/flasher_off.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.overlayBottom} />
                <ModalButtons>
                    <CameraButtonContainer onPress={() => setCameraModalOpened(false)}>
                        <CancelButtonText>Cancelar Leitura</CancelButtonText>
                    </CameraButtonContainer>
                </ModalButtons>

            </ModalContainer>
        </Modal>
    )

    const input = useRef(null);
    const getFocusInput = () => {
        input.current.focus();
    }
    
    async function getCard() {
        if (!num_ordem) {
            Alert.alert(
                'Oops...',
                'Você não leu uma ordem!',
                [
                    {
                        text: 'Ler Agora',
                        onPress: () => setCameraModalOpened(true)
                    },
                    {
                        text: 'Digitar',
                        onPress: () => getFocusInput()
                    },
                ],
                { cancelable: false },
            );
        } else {
            const apiResponse = await api.get('/api/desenho/' + num_ordem);
            {
                apiResponse.data.map(rest => (
                    console.log(rest['LINK']),
                    console.log(rest['ITEM']),
                    console.log(rest['MASC'])
                ))
            }
            setNum_ordem('');
            setLink(apiResponse.data);
            //const { LINK, ITEM, MASC } = apiResponse.data[0];
            //console.log('COD ITEM:' + ITEM + ' MASCARA:' + MASC + ' LOCAL:' + LINK);
            //Alert.alert("SUCCESS", 'COD ITEM:' + ITEM + ' MASCARA:' + MASC + ' LOCAL:' + LINK);
        }
    };
    const FlatListItemSeparator = () => <View style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.5)"
    }} />;

    const renderList = () => (
        <FlatList
            style={styles.list}
            data={link}
            keyExtractor={item => item['ITEM']}
            showsVerticalScrollIndicator={true}
            renderItem={renderItem}
            ItemSeparatorComponent={FlatListItemSeparator}
        />
    );

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <TouchableOpacity
                onPress={() => onButtonpress(item['LINK'])}
            //onPress={() => navigation.navigate('Webview', { desenho_link: item['LINK'] })}
            >
                <Text style={styles.item}>{item['ITEM']}</Text>
                <Text style={styles.masc}>{item['MASC']}</Text>
                <Text numberOfLines={1} style={styles.link}>{item['LINK']}</Text>
            </TouchableOpacity>
        </View>
    );

    return <>
        <View style={styles.mapStyle}>
            <View style={styles.search}>
                <TextInput
                    keyboardType="numeric"
                    style={styles.inputSearch}
                    placeholder="Localizar Desenho"
                    placeholderTextColor="#999"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    value={num_ordem}
                    onChangeText={text => setNum_ordem(text)}
                    autoFocus={true}
                    ref={input}
                />
                <TouchableOpacity
                    onPress={() => { getCard() }}
                    //onPress={() => { onButtonpress() }}
                    style={styles.button}>
                    <Icon name="search" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
            {renderCameraModalVertical()}
            {renderList()}
            <TakePictureButtonContainer onPress={() => { setCameraModalOpened(true); }}>
                <TakePictureButtonLabel>
                    <Icon name="camera" size={30} color="#000" />
                </TakePictureButtonLabel>
            </TakePictureButtonContainer>
        </View>

    </>
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 20,
        marginTop: '22%',
        marginBottom: '15%',
    },
    listItem: {
        backgroundColor: '#DDD',
        marginTop: 10,
        borderRadius: 4,
        padding: 10,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    item: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    masc: {
        fontSize: 15,
        color: '#333',
        marginTop: 3,
    },
    link: {
        fontSize: 13,
        color: '#999',
        fontWeight: 'bold',
    },
    flasherIcon: {
        margin: 5,
        height: 40,
        width: 40
    },
    flasherBottom: {
        position: "absolute",
        height: "100%",
    },
    overlayTop: {
        position: 'absolute',
        height: '25%',
        //width: Dimensions.get('window').width,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    overlayBottom: {
        bottom: 0,
        position: 'absolute',
        height: '35%',
        //width: Dimensions.get('window').width,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    overlayTopVertical: {
        position: 'absolute',
        height: '100%',
        //width: Dimensions.get('window').width,
        width: '30%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    overlayBottomVertical: {
        //bottom: 0,
        right: 0,
        position: 'absolute',
        height: '100%',
        //width: Dimensions.get('window').width,
        width: '30%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    CameraPreview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    mapStyle: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
        elevation: 13,
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: '#27ae60',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        elevation: 13,
    }
});