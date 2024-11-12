import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from '@/components/shared/CustomButton'
import { router } from 'expo-router'
const SignIn = () => {
    return (
        <View className='px-4 py-20 flex-1'>
            <View className=''>
                <Text className='font-medium text-3xl mb-5'>Увійти</Text>
                <Text className='text-lg text-slate-600'>
                    Ласкаво просимо назад! Будь ласка, введіть свої облікові дані, щоб отримати доступ до свого акаунту та продовжити пошук подій.
                </Text>
            </View>

            <View className='py-10 flex gap-3'>
                <View className='border border-slate-400 rounded-3xl px-4 py-2'>
                    <TextInput
                        placeholder={'Email'}
                        className='p-0'
                        placeholderTextColor={'#838383'}
                    />
                </View>
                <View className='border border-slate-400 rounded-3xl px-4 py-2'>
                    <TextInput
                        placeholder={'Password'}
                        className='p-0'
                        placeholderTextColor={'#838383'}
                    />
                </View>
            </View>
            <CustomButton onPress={() => { router.push('/') }} additionalStyles={'w-full px-3 text-center'} textAdditionalStyles='text-lg'>Увійти</CustomButton>
        </View>
    )
}

export default SignIn
