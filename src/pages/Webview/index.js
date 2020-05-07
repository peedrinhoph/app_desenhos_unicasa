import React from 'react';
import { Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Loading } from "./styles";

function Profile({ route, navigation }) {
    //const { desenho_link } = route.params;
    //console.log(desenho_link);
    const url = `file:///storage/emulated/0/Download/20200310_092009.jpg`;
    const urlimg = `file:///storage/emulated/0/Download/Luz.pdf`;
    const linkedin = `http://www.linkedin.com/in/pedro-pereira-62056883`;
    return <WebView
        source={{ uri: `${linkedin}` }}
        //source={{ uri: `${desenho_link}`}}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        textZoom={100}
        renderError={errorName => console.log(errorName)}
        originWhitelist={["https://*", "http://*", "file://*", "sms://*", "ftp://"]}
    />
    
    /*
    return <Image source = {{uri: `file://${url}`}}
    style={{height:200, width:200}}/>
    */
}

export default Profile;