import { Platform, StatusBar } from "react-native"
import { StyleSheet } from "react-native"

export const GlobalStyles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})