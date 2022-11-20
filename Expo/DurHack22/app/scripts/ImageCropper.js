import {useEffect, useState} from "react";
import {Image, TouchableOpacity, Text, StyleSheet, View} from "react-native";

import Slider from "@react-native-community/slider";
import {manipulateAsync} from "expo-image-manipulator";

import PropTypes from "prop-types";

import Colours from "../styles/Colours";

function ImageCropper(props) {
    const [image, setImage] = useState(null);
    const [uri, setUri] = useState(props.uri);
    const [size, setSize] = useState({width: props.width, height: props.height});

    const [minX, setMinX] = useState(0);
    const [minY, setMinY] = useState(0);
    const [maxX, setMaxX] = useState(1);
    const [maxY, setMaxY] = useState(1);

    const [mult, setMult] = useState({x: 1, y: 1});
    const [measured, setMeasured] = useState(false);

    const crop =() => {
        manipulateAsync(uri,
            [{crop: {originX: minX * size.width, originY: minY * size.height, width: (maxX - minX) * size.width, height: (maxY - minY) * size.height}}],
            {base64: true})
            .then(result => {
                setUri(result.uri);
                setSize({width: result.width, height: result.height});
                setMeasured(false);

                setMinX(0); setMinY(0); setMaxX(1); setMaxY(1);

                if(props.onCrop) {
                    props.onCrop(result);
                }
            })
            .catch(error => console.warn(error));
    };

    useEffect(() => {
        if(image && !measured) {
            image.measure((fx, fy, width, height) => {
                if(width > 0 && height > 0) {
                    setMult({x: width, y: height});
                    setMeasured(true);
                }
            });
        }
    });

    return (
        <View>
            <View>
                <Image style={props.style} source={{uri}} ref={ref => setImage(ref)} resizeMode="contain" />
                <View style={[styles.selectionBox, {left: minX * mult.x, top: minY * mult.y, width: (maxX - minX) * mult.x, height: (maxY - minY) * mult.y}]} />
            </View>
            <Slider style={styles.slider} value={0} onValueChange={x => setMinX(x)} thumbTintColor={Colours.darkDarkGrey} minimumTrackTintColor={"white"} maximumTrackTintColor={"white"} />
            <Slider style={styles.slider} value={0} onValueChange={y => setMinY(y)} thumbTintColor={Colours.darkDarkGrey} minimumTrackTintColor={"white"} maximumTrackTintColor={"white"} />
            <Slider style={styles.slider} value={1} onValueChange={x => setMaxX(x)} thumbTintColor={Colours.darkDarkGrey} minimumTrackTintColor={"white"} maximumTrackTintColor={"white"} />
            <Slider style={styles.slider} value={1} onValueChange={y => setMaxY(y)} thumbTintColor={Colours.darkDarkGrey} minimumTrackTintColor={"white"} maximumTrackTintColor={"white"} />
            <TouchableOpacity style={styles.button} onPress={crop}>
                <Text style={styles.buttonText}>Crop</Text>
            </TouchableOpacity>
        </View>
    );
}

ImageCropper.propTypes = {
    style: PropTypes.object,
    uri: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    onCrop: PropTypes.func
};

const styles = StyleSheet.create({
    slider: {
        paddingVertical: 10,
        marginHorizontal: 20
    },

    selectionBox: {
        position: "absolute",

        borderStyle: "dashed",
        borderWidth: 2,
        borderLeftColor: "white",
        borderRightColor: "white"
    },

    button: {
        padding: 15,
        margin: 10,
        backgroundColor: Colours.darkDarkGrey
    },
    buttonText: {
        color: "white",
        fontSize: 20,

        textAlign: "center",
        textAlignVertical: "center",
        includeFontPadding: false
    }
});

export default ImageCropper;