import React, { useState, useRef } from 'react';
import { FlatList, Modal, StyleSheet, Alert, Text, TextInput, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FTP from 'react-native-ftp';
import { BASE_FTP_URL, BASE_FTP_LOGIN, BASE_FTP_PASSWORD } from '../../Config/config';
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
    const [cameraModalOpenedHorizontal, setCameraModalHorizontalOpened] = useState(false);
    const [cameraModalOpenedVertical, setCameraModalVerticalOpened] = useState(false);
    const [flashOn, setFlashOn] = useState(false)
    const [link, setLink] = useState([]);

    const onBarCodeRead = (e) => {
        try {
            console.log(e.type + " Barras: " + e.data);
            setNum_ordem(e.data);
            setCameraModalHorizontalOpened(false);
            setCameraModalVerticalOpened(false);
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
        FTP.setup(BASE_FTP_URL, 21)
        FTP.login(BASE_FTP_LOGIN, BASE_FTP_PASSWORD).then(
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

    const renderCameraModalHorizontal = () => (
        <Modal
            visible={cameraModalOpenedHorizontal}
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
                    <TouchableOpacity onPress={() => setCameraModalHorizontalOpened(false)}>
                        <IconMaterial name="close" size={40} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </ModalContainer>
        </Modal>
    )
    const renderCameraModalVertical = () => (
        <Modal
            visible={cameraModalOpenedVertical}
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
                        {/*<Image style={styles.flasherIcon} source={flashOn === true ? require('../../images/flasher_on.png') : require('../../images/flasher_off.png')} />*/}
                        <IconMaterial name={flashOn === true ? "flash-on" : "flash-off"} size={40} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.overlayBottom} />
                <ModalButtons>
                    <CameraButtonContainer onPress={() => setCameraModalVerticalOpened(false)}>
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
                        onPress: () => setCameraModalHorizontalOpened(true)
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
                    style={styles.button}>
                    <Icon name="search" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
            {renderCameraModalVertical()}
            {renderCameraModalHorizontal()}
            {renderList()}
            <View style={{ flex: 1, flexDirection: 'row', maxHeight: 100, height: 100 }}>
                <View style={{ flex: 1 }}>
                    <TakePictureButtonContainer onPress={() => { setCameraModalVerticalOpened(true); }} style={{ right: 10 }}>
                        <TakePictureButtonLabel>
                            <Icon name="camera" size={25} color="#000" />
                            <Text style={{ fontSize: 9, color: '#333' }}>Vertical</Text>
                        </TakePictureButtonLabel>
                    </TakePictureButtonContainer>
                </View>
                <View style={{ flex: 1 }}>
                    <TakePictureButtonContainer onPress={() => { setCameraModalHorizontalOpened(true); }} style={{ left: 10 }}>
                        <TakePictureButtonLabel>
                            <Icon name="camera" size={25} color="#000" style={{ transform: [{ rotate: "90deg" }] }} />
                            <Text style={{ fontSize: 9, color: '#333' }}>Horizontal</Text>
                        </TakePictureButtonLabel>
                    </TakePictureButtonContainer>
                </View>
            </View>
            {/*<TakePictureButtonContainer onPress={() => { setCameraModalOpened(true); }}>
                <TakePictureButtonLabel>
                    <Icon name="camera" size={30} color="#000" />
                </TakePictureButtonLabel>
            </TakePictureButtonContainer>*/}
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