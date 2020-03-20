import React from 'react';
import { Button, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator } from '@react-navigation/drawer';
//import Icon from 'react-native-vector-icons/FontAwesome';

//import Main from './pages/Main';
import Code from './pages/BarcodeScan';
import Teste from './pages/BarcodeScan';
import Webview from './pages/Webview'
import DrawerRoute from './routes/drawer.routes';

const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

/*createDrawer = () =>
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Main} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
*/
/*createHomeStack = () =>
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#27ae60',

            }
        }}
    >
        <Stack.Screen
            name="Home"
            children={this.createDrawer}
            options={{
                title: 'Localizar Desenhos',
                headerTintColor: '#FFF',
                headerStyle: {
                    backgroundColor: '#27ae60',

                }
            }}
        />
        <Stack.Screen name="Teste" component={Teste}
            options={{
                title: 'New Test',
                headerTintColor: '#FFF',
                headerStyle: {
                    backgroundColor: '#222222',

                }
            }}
        />
    </Stack.Navigator>*/

function LogoTitle() {
    return (
        <Image
            style={{ width: 40, height: 40 }}
            source={require('./images/3d.png')}
        />
    );
}


const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                initialRouteName="Home"
                screenOptions={{
                    gestureEnabled: true, // Determina se pode voltar a tela arrastando para o lado
                    gestureDirection: 'horizontal',
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#27ae60',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                animation="fade"
            >
                <Stack.Screen
                    name="Home"
                    //children={DrawerRoute}
                    component={DrawerRoute}
                    options={{
                        title: 'Localizar Desenhos',
                        headerTintColor: '#FFF',
                        headerStyle: {
                            backgroundColor: '#27ae60',
                        },
                        //headerRight: props => <LogoTitle {...props} />,
                        /*headerRight: () => (
                            <Button onPress={() => setCount(c => c + 1)} title="Update count" />
                        ),*/
                    }}
                />
                <Stack.Screen
                    name="TypeStack"
                    component={Teste}
                    options={{
                        title: 'Meu Código',
                        headerTintColor: '#FFF',
                        headerStyle: {
                            backgroundColor: '#27ae60'
                        }
                    }}
                />
                <Stack.Screen
                    name="Code"
                    component={Code}
                    options={{
                        title: 'New Code',
                        headerTintColor: '#FFF',
                        headerStyle: {
                            backgroundColor: '#27ae60',
                        }
                    }}
                />
                <Stack.Screen
                    headerMode="none"
                    name="Webview"
                    component={Webview}
                    options={{
                        title: 'Web',
                        headerShown: false,
                        headerTintColor: '#FFF',
                        headerStyle: {
                            backgroundColor: '#27ae60',
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;