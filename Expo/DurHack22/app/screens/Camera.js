import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";

import { Camera, CameraType } from 'expo-camera';

import Global from "../styles/Global";

function Camera() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    return (
        <SafeAreaView style={Global.screen}>
            <View style={Global.container}>
                <Text>Hello, World!</Text>
            </View>
        </SafeAreaView>
    );
}

export default Camera;