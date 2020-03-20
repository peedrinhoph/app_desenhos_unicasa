import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
 
/**Opção de Header com back navegação
 * Error: createStackNavigator has been moved to react-navigation-stack. 
 * See https://reactnavigation.org/docs/stack-navigator.html for more details 
 * https://blog.rocketseat.com.br/navegacao-react-native/
 * */
/**createDrawerNavigator */
import Main from './pages/Main';
import Code from './pages/BarcodeScan';
import Teste from './components/ModalScan';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Localizar Desenho'
            }
        },
        Code: {
            screen: Code,
            navigationOptions: {
                title: 'Tipo de Código'
            }
        },
        Teste: {
            screen: Teste,
            navigationOptions: {
                title: 'Teste'
            }
        },
    },
        {
            defaultNavigationOptions: {
                headerTintColor: '#FFF',
                headerStyle: {
                    backgroundColor: '#27ae60',

                }
            }
        })
);

export default Routes;

