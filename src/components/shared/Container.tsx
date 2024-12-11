import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <ScrollView>
            <View className="px-4 pt-4">
                {children}
            </View>
        </ScrollView>
    )
}

export default Container

const styles = StyleSheet.create({})
