import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, Text, TextInput, View, Dimensions, Button, Image, TouchableOpacity } from 'react-native';

import BarcodeScan from '../../components/BarcodeScan';
import BarcodeScan1 from '../../components/BarcodeScanOne';
import BarcodeScan2 from '../../components/ModalScan';

function Scan() {
    return <>
        <BarcodeScan />
    </>
}

export default Scan;
