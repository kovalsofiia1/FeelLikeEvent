import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthGuard from '@/src/components/auth/AuthGuard'

const Recommendations = () => {
    return (
        <AuthGuard>
            <View>
                <Text>Recommendations</Text>
            </View>
        </AuthGuard>
    )
}

export default Recommendations

const styles = StyleSheet.create({})