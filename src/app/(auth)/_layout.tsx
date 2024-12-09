import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return (

        <Stack>
            <Stack.Screen
                name="sign-in"
                options={{
                    headerShown: false,
                    title: "Sign In",
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    headerShown: false,
                    title: "Sign Up",
                }}
            />
        </Stack>

    )
}

export default AuthLayout

const styles = StyleSheet.create({})