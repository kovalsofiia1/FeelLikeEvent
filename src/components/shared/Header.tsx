import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import CustomButton from './CustomButton'
import { router, useRouter, useSegments } from 'expo-router'
import { useAuth } from '@/src/context/AuthContext'
import { icons } from '@/src/constants'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/src/redux/user/selectors'

const Header = () => {
    // const { authState } = useAuth();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const segments = useSegments();
    const router = useRouter();
    const isAuthPage = segments.join('/') === '(auth)/sign-in' || segments.join('/') === '(auth)/sign-up';

    const [shouldShowControls, setShouldShowControls] = useState(false);

    // Dynamically determine if controls should be shown
    useEffect(() => {
        setShouldShowControls(!isLoggedIn && !isAuthPage);
        console.log(!isLoggedIn && !isAuthPage);
    }, [isLoggedIn, isAuthPage]); // The component re-renders when these values change

    // const shouldShowControls = !isLoggedIn && !isAuthPage;

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
                    </TouchableOpacity>
                }
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