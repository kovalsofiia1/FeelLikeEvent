import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/shared/CustomButton'
import { Link, router } from 'expo-router'
import FormField from '@/components/shared/FormField';

interface IInputValue {
    email: string;
    password: string;
}

const SignIn = () => {
    // const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }

        setSubmitting(true);
        router.push('/');
    };

    return (
        <ScrollView>
            <View className='px-4 py-20 flex-1'>
                <View className=''>
                    <Text className='font-medium text-3xl mb-5'>Увійти</Text>
                    <Text className='text-lg text-slate-600'>
                        Ласкаво просимо назад! Будь ласка, введіть свої облікові дані, щоб отримати доступ до свого акаунту та продовжити пошук подій.
                    </Text>
                </View>

                <View className='py-10 flex gap-3'>
                    <FormField
                        title="Email"
                        placeholder='Введіть email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Пароль"
                        placeholder='Введіть пароль'
                        type='password'
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                    />
                </View>
                <CustomButton onPress={() => { submit() }} additionalStyles={'w-full px-3 text-center'} textAdditionalStyles='text-lg'>Увійти</CustomButton>
                <Link href={'/sign-up'} className='text-blue-500 underline py-3 text-center'>Не маєте акаунта? Зареєструйтеся</Link>
            </View>
        </ScrollView>
    )
}

export default SignIn
