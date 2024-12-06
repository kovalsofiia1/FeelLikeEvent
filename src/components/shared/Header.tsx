import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Logo from './Logo'
import CustomButton from './CustomButton'
import { router, useRouter, useSegments } from 'expo-router'
import { useAuth } from '@/src/context/AuthContext'
import { icons } from '@/src/constants'

const Header = () => {
    const { authState } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const isAuthPage = segments.join('/') === '(auth)/sign-in' || segments.join('/') === '(auth)/sign-up';

    const shouldShowControls = !authState?.authenticated && !isAuthPage;

    return (
        <View className='flex flex-row justify-between items-center px-4 py-2 flex-wrap gap-1'>
            <View className='flex flex-row gap-2 items-center'>
                {!isAuthPage &&
                    <TouchableOpacity onPress={() => { router.back() }}>
                        <Image
                            source={icons.leftArrow}
                            resizeMode='contain'
                            style={{ width: 16, height: 16 }}
                        />
                    </TouchableOpacity>}
                <Logo></Logo>
            </View>
            {shouldShowControls && <View className='flex flex-row gap-2 justify-end items-center'>
                <CustomButton onPress={() => { router.push('/sign-in') }} isActive={false} additionalStyles='w-auto px-3'>Увійти</CustomButton>
                {/* <CustomButton onPress={() => { router.push('/sign-up') }} additionalStyles='w-auto px-3'>Зареєструватися</CustomButton> */}
            </View>}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})