import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logo from './Logo'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const Header = () => {
    return (
        <View className='flex flex-row justify-between items-center px-4 py-2'>
            <Logo></Logo>
            <View className='flex flex-row gap-2 justify-end items-center'>
                <CustomButton onPress={() => { router.push('/sign-in') }} isActive={false} additionalStyles='w-auto px-3'>Увійти</CustomButton>
                <CustomButton onPress={() => { router.push('/sign-up') }} additionalStyles='w-auto px-3'>Зареєструватися</CustomButton>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})