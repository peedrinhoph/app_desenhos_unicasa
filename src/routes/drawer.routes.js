import React from 'react';
import { BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import Main from '../pages/Main';
import CodeType from '../pages/BarcodeScan';
import TestCad from '../pages/Cad';
import WebView from '../pages/Webview';

const Drawer = createDrawerNavigator();

const exit = () => {
    BackHandler.exitApp();
    return true;
}

function getHeaderTitle(route) {
    const routeName = route.state ? route.state.routes[route.state.index].name : "Home";
    switch (routeName) {
        case "Home": return "Inicio";
        case "TypeDrawer": return "Meu Código";
        case "TestCad": return "Cadastro";
        case "WebView": return "Web View";
    }
}

export default function DrawerRoutes({ navigation, route }) {

    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <Drawer.Navigator
            hideStatusBar={false}
            //statusBarAnimation="fade"
            drawerType="slide"
            //overlayColor="transparent"
            sceneContainerStyle={{flex:1}}
            drawerContentOptions={{
                activeTintColor: '#FFF',
                activeBackgroundColor: '#27ae60',
                labelStyle: {
                    fontWeight: 'bold',
                    fontSize: 15
                },
                itemStyle: { marginVertical: 5 },
            }}
            drawerStyle={{
                backgroundColor: '#FFF',
                width: "70%",
            }}
        >
            <Drawer.Screen
                options={{
                    title: 'Inicio',
                    //drawerLabel: 'Home'
                    drawerIcon: () => (<Icon style={[{ color: '#445' }]} size={20} name={'home'} />)
                }}
                name="Home"
                component={Main}
            />
            <Drawer.Screen
                options={{
                    title: 'Meu Código',
                    drawerIcon: () => (<Icon style={[{ color: '#445' }]} size={20} name={'barcode'} />)
                }}
                name="TypeDrawer"
                component={CodeType}
            />
            <Drawer.Screen
                options={{
                    title: 'Cadastro Teste',
                    drawerIcon: () => (<Icon style={[{ color: '#445' }]} size={20} name={'free-code-camp'} />)
                }}
                name="TestCad"
                component={TestCad}
            />
            <Drawer.Screen
                options={{
                    title: 'Web View',
                    drawerIcon: () => (<Icon style={[{ color: '#445' }]} size={20} name={'chrome'} />)
                }}
                name="WebView"
                component={WebView}
            />
            <Drawer.Screen
                options={{
                    title: 'Sair',
                    drawerIcon: () => (<Icon style={[{ color: '#445' }]} size={20} name={'sign-out'} />),

                }}
                name="Sair"
                component={exit}
            />
        </Drawer.Navigator>
    );
}