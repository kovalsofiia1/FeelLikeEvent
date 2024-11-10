import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Logo = () => {
    return (
        <View className='flex flex-row py-2 px-4'>
            <Text className='text-blue-500 text-xl font-bold'>Feel</Text>
            <Text className="italic text-blue-500 text-lg">like</Text>
            <Text className="text-black text-xl font-bold">Event</Text>
        </View>
    )
}

export default Logo;

const styles = StyleSheet.create({})