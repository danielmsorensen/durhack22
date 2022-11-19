import {StyleSheet} from "react-native";

import Colours from "./Colours";

export default StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colours.background
    },

    container: {
        flex: 1,
        paddingHorizontal: "5%"
    },
});