import {useCallback, useRef, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Pressable, Text, View, StyleSheet, Image} from "react-native";

import {Camera, CameraType} from 'expo-camera';
import {MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";

import Global from "../styles/Global";
import Colours from "../styles/Colours";

function CameraScreen() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const [camera, setCamera] = useState(null);
    const [picture, setPicture] = useState("");

    const flipCamera = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back);
    };

    const takePicture = async () => {
        if(camera) {
            camera.takePictureAsync({
                onPictureSaved: ({uri}) => setPicture(uri)
            }).catch(error => console.warn(error));
        }
    };

    useFocusEffect(useCallback(() => {
        if(!permission || !permission.granted) {
            requestPermission().catch(error => console.warn(error));
        }
    }, []));

    return (
        <SafeAreaView style={[Global.screen, {backgroundColor: picture ? Colours.background : "black"}]}>
            <View style={Global.container}>
                {permission && permission.granted ? (
                    <View style={{flex: 1, justifyContent: "center"}}>
                        {!picture ? (
                            <View style={styles.container}>
                                <Camera style={styles.camera} ref={ref => setCamera(ref)} type={type} />
                                <Pressable style={styles.topButton} onPress={flipCamera}>
                                    <MaterialCommunityIcons name="camera-flip" color="white" size={35} />
                                </Pressable>
                                <Pressable style={styles.bottomButton} onPress={takePicture}>
                                    <MaterialCommunityIcons name="circle-slice-8" color="white" size={75} />
                                </Pressable>
                            </View>
                        ) : (
                            <View style={styles.container}>
                                <Image style={styles.camera} source={{uri: picture}} />
                                <Pressable style={styles.topButton} onPress={() => setPicture("")}>
                                    <MaterialIcons name="arrow-back" color="white" size={35} />
                                </Pressable>
                            </View>
                        )}
                    </View>
                ) : (
                    <Pressable style={styles.button} onPress={requestPermission}>
                        <Text style={styles.buttonText}>Allow Camera Access</Text>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },

    camera: {
        aspectRatio: 3/4,
        width: "100%"
    },

    topButton: {
        position: "absolute",
        top: 0,
        left: 0,

        padding: 10
    },
    bottomButton: {
        position: "absolute",
        bottom: 0,
        alignSelf: "center",

        padding: 10
    },

    button: {
        backgroundColor: Colours.darkDarkGrey,
        width: 100,
        padding: 5
    },

    buttonText: {
        color: Colours.lightGrey,
        textAlign: "center",
        textAlignVertical: "center",
        includeFontPadding: false
    }
});

export default CameraScreen;