import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import CustomButton from './CustomButton'
import { router, useRouter, useSegments } from 'expo-router'
import { icons } from '@/src/constants'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/src/redux/user/selectors'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/src/redux/store'
import { logOut } from '@/src/redux/user/actions'

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const segments = useSegments();
    const router = useRouter();
    const isAuthPage = segments.join('/') === '(auth)/sign-in' || segments.join('/') === '(auth)/sign-up';
    const dispatch = useDispatch<AppDispatch>();

    const [shouldShowControls, setShouldShowControls] = useState(false);

    // Dynamically determine if controls should be shown
    useEffect(() => {
        setShouldShowControls(!isLoggedIn && !isAuthPage);
        console.log(!isLoggedIn && !isAuthPage);
    }, [isLoggedIn, isAuthPage]); // The component re-renders when these values change

    const handlePress = () => {

        if (router.canGoBack()) {
            router.back();
        } else {
            router.push('/home');
        }
    };

    const logout = async () => {

        dispatch(logOut())
            .unwrap()
            .then(() => {
                router.push('/home');
            })
            .catch((error) => {
                alert(error);
            });

    }

    return (
        <View className='flex flex-row justify-between items-center px-4 py-2 flex-wrap gap-1'>
            <View className='flex flex-row gap-2 items-center'>
                {!isAuthPage &&
                    <TouchableOpacity onPress={() => { handlePress() }}>
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
            </View>}
            {isLoggedIn && <CustomButton isActive={false} onPress={() => logout()}>Вийти</CustomButton>}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})