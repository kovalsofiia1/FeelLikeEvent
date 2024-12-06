import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    children: ReactNode;
}

const SafeAreaWrapper = ({ children }: Props) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            {children}
        </View>
    )
}

export default SafeAreaWrapper

const styles = StyleSheet.create({})