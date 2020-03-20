import React, { Component } from 'react';

import { StatusBar, Modal, AsyncStorage } from 'react-native';

import { RNCamera } from 'react-native-camera';

import {
    Container,
    AnnotationContainer,
    AnnotationText,
    NewButtonContainer,
    ButtonsWrapper,
    CancelButtonContainer,
    SelectButtonContainer,
    ButtonText,
    Marker,
    ModalContainer,
    ModalImagesListContainer,
    ModalImagesList,
    ModalImageItem,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    ContinueButtonText,
    TakePictureButtonContainer,
    TakePictureButtonLabel,
    DataButtonsWrapper,
    MarkerContainer,
    MarkerLabel,
    Form,
    Input,
    DetailsModalFirstDivision,
    DetailsModalSecondDivision,
    DetailsModalThirdDivision,
    DetailsModalBackButton,
    DetailsModalPrice,
    DetailsModalRealtyTitle,
    DetailsModalRealtySubTitle,
    DetailsModalRealtyAddress,
} from './styles';

export default class Main extends Component {
    state = {
        locations: [],
        newRealty: false,
        cameraModalOpened: false,
        dataModalOpened: false,
        detailsModalOpened: false,
        realtyDetailed: null,
        realtyData: {
            location: {
                latitude: null,
                longitude: null,
            },
            name: 'Teste',
            price: '10000',
            address: 'Rua zero, 0',
            images: [],
        },
    };

    handleNewRealtyPress = () => this.setState({ newRealty: !this.state.newRealty })

    handleCameraModalClose = () => this.setState({ cameraModalOpened: !this.state.cameraModalOpened })

    handleDataModalClose = () => this.setState({
        dataModalOpened: !this.state.dataModalOpened,
        cameraModalOpened: false,
    })

    handleDetailsModalClose = index => this.setState({
        detailsModalOpened: !this.state.detailsModalOpened,
        realtyDetailed: index,
    })

    handleTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
            const data = await this.camera.takePictureAsync(options)
            const { realtyData } = this.state;
            this.setState({
                realtyData: {
                    ...realtyData,
                    images: [
                        ...realtyData.images,
                        data,
                    ]
                }
            })
        }
    }

    handleInputChange = (index, value) => {
        const { realtyData } = this.state;
        switch (index) {
            case 'name':
                this.setState({
                    realtyData: {
                        ...realtyData,
                        name: value,
                    }
                });
                break;
            case 'address':
                this.setState({
                    realtyData: {
                        ...realtyData,
                        address: value,
                    }
                });
                break;
            case 'price':
                this.setState({
                    realtyData: {
                        ...realtyData,
                        price: value,
                    }
                });
                break;
        }
    }

    saveRealty = async () => {
        try {
            const {
                realtyData: {
                    name,
                    address,
                    price,
                    location: {
                        latitude,
                        longitude
                    },
                    images
                }
            } = this.state;

            /*const newRealtyResponse = await api.post('/properties', {
                title: name,
                address,
                price,
                latitude: Number(latitude.toFixed(6)),
                longitude: Number(longitude.toFixed(6)),
            });

            const imagesData = new FormData();

            images.forEach((image, index) => {
                imagesData.append('image', {
                    uri: image.uri,
                    type: 'image/jpeg',
                    name: `${newRealtyResponse.data.title}_${index}.jpg`
                });
            });

            await api.post(
                `/properties/${newRealtyResponse.data.id}/images`,
                imagesData,
            ); */

            this.handleDataModalClose()
            this.setState({ newRealty: false });
        } catch (err) {
            console.log(err);
        }
    }

    handleGetCameraPress = async () => {
        try {
            this.setState({
                cameraModalOpened: true,
            });
        } catch (err) {
            console.log(err);
        }
    }

    renderConditionalsButtons = () => (
        !this.state.newRealty ? (
            <NewButtonContainer onPress={this.handleNewRealtyPress}>
                <ButtonText>Novo</ButtonText>
            </NewButtonContainer>
        ) : (
                <ButtonsWrapper>
                    <SelectButtonContainer onPress={this.handleGetCameraPress}>
                        <ButtonText>Abrir Camera</ButtonText>
                    </SelectButtonContainer>
                    <CancelButtonContainer onPress={this.handleNewRealtyPress}>
                        <ButtonText>Cancelar</ButtonText>
                    </CancelButtonContainer>
                </ButtonsWrapper>
            )
    )

    renderImagesList = () => (
        this.state.realtyData.images.length !== 0 && (
            <ModalImagesListContainer>
                <ModalImagesList horizontal>
                    {this.state.realtyData.images.map(image => (
                        <ModalImageItem
                            key={image.id}
                            source={{ uri: image.uri }}
                            resizeMode="stretch" />
                    ))}
                </ModalImagesList>
            </ModalImagesListContainer>
        )
    )

    renderDetailsImagesList = () => (
        this.state.detailsModalOpened && (
            <ModalImagesList horizontal>
                {this.state.locations[this.state.realtyDetailed].images.map(image => (
                    <ModalImageItem
                        key={image.id}
                        source={{ uri: `http://10.0.3.2:3333/images/${image.path}` }}
                        resizeMode="stretch"
                    />
                ))}
            </ModalImagesList>
        )
    )

    renderCameraModal = () => (
        <Modal
            visible={this.state.cameraModalOpened}
            transparent={true}
            animationType="slide"
            onRequestClose={this.handleCameraModalClose}
        >
            <ModalContainer>
                <ModalContainer>
                    <RNCamera
                        ref={camera => {
                            this.camera = camera;
                        }}
                        style={{ flex: 1 }}
                        type={RNCamera.Constants.Type.back}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        flashMode={RNCamera.Constants.FlashMode.off}
                    />
                    <TakePictureButtonContainer onPress={this.handleTakePicture}>
                        <TakePictureButtonLabel />
                    </TakePictureButtonContainer>
                </ModalContainer>
                {this.renderImagesList()}
                <ModalButtons>
                    <CameraButtonContainer onPress={this.handleCameraModalClose}>
                        <CancelButtonText>Cancelar</CancelButtonText>
                    </CameraButtonContainer>
                    <CameraButtonContainer onPress={this.handleDataModalClose}>
                        <ContinueButtonText>Continuar</ContinueButtonText>
                    </CameraButtonContainer>
                </ModalButtons>
            </ModalContainer>
        </Modal>
    )

    renderDataModal = () => (
        <Modal
            visible={this.state.dataModalOpened}
            transparent={false}
            animationType="slide"
            onRequestClose={this.handleDataModalClose}
        >
            <ModalContainer>
                {this.renderImagesList()}
                <Form>
                    <Input
                        placeholder="Nome do Imóvel"
                        value={this.state.realtyData.name}
                        onChangeText={name => this.handleInputChange('name', name)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        placeholder="Endereço"
                        value={this.state.realtyData.address}
                        onChangeText={address => this.handleInputChange('address', address)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        placeholder="Preço"
                        value={this.state.realtyData.price}
                        onChangeText={price => this.handleInputChange('price', price)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Form>
                <DataButtonsWrapper>
                    <SelectButtonContainer onPress={this.saveRealty}>
                        <ButtonText>Salvar</ButtonText>
                    </SelectButtonContainer>
                    <CancelButtonContainer onPress={this.handleDataModalClose}>
                        <ButtonText>Cancelar</ButtonText>
                    </CancelButtonContainer>
                </DataButtonsWrapper>
            </ModalContainer>
        </Modal>
    )

    renderDetailsModal = () => (
        <Modal
            visible={this.state.detailsModalOpened}
            transparent={false}
            animationType="slide"
            onRequestClose={this.handleDetailsModalClose}
        >
            <ModalContainer>
                <DetailsModalFirstDivision>
                    <DetailsModalBackButton onPress={() => this.handleDetailsModalClose(null)}>
                        Voltar
                    </DetailsModalBackButton>
                </DetailsModalFirstDivision>
                <DetailsModalSecondDivision>
                    <DetailsModalRealtyTitle>
                        {this.state.detailsModalOpened
                            ? this.state.locations[this.state.realtyDetailed].title
                            : ''
                        }
                    </DetailsModalRealtyTitle>
                    <DetailsModalRealtySubTitle>Casa mobiliada com 3 quartos + quintal</DetailsModalRealtySubTitle>
                    <DetailsModalRealtyAddress>
                        {this.state.detailsModalOpened
                            ? this.state.locations[this.state.realtyDetailed].address
                            : ''
                        }
                    </DetailsModalRealtyAddress>
                    {this.renderDetailsImagesList()}
                </DetailsModalSecondDivision>
                <DetailsModalThirdDivision>
                    <DetailsModalPrice>R$ {this.state.detailsModalOpened
                        ? this.state.locations[this.state.realtyDetailed].price
                        : 0
                    }</DetailsModalPrice>
                </DetailsModalThirdDivision>
            </ModalContainer>
        </Modal>
    )

    render() {
        return (
            <Container>
                {this.renderConditionalsButtons()}
                {this.renderCameraModal()}
                {this.renderDataModal()}
                {this.renderDetailsModal()}
            </Container>
        );
    }
}