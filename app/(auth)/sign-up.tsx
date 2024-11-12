import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/shared/CustomButton'
import { Link, router } from 'expo-router'
import FormField from '@/components/shared/FormField';
import { createUser } from '@/lib/appwrite';


interface IInputValue {
    name: string;
    email: string;
    password: string;
}

const SignUp = () => {

    // const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.name === "" || form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
        }

        setSubmitting(true);
        createUser();

        // router.push('/');
    };

    return (
        <ScrollView>
            <View className='px-4 py-20 flex-1'>
                <View className=''>
                    <Text className='font-medium text-3xl mb-5'>Зареєструватися</Text>
                    <Text className='text-lg text-slate-600'>
                        Дякуємо за ваш інтерес до нашої платформи! Для реєстрації нам потрібна певна інформація. Будь ласка, надайте наступні дані.
                    </Text>
                </View>

                <View className='py-10 flex gap-2'>
                    <FormField
                        title="Ім'я"
                        placeholder="Введіть ім'я"
                        value={form.name}
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        keyboardType="default"
                    />

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
                <CustomButton onPress={() => { submit() }} additionalStyles={'w-full px-3 text-center'} textAdditionalStyles='text-lg'>Зареєструватися</CustomButton>
                <Link href={'/sign-in'} className='text-blue-500 underline py-3 text-center'>Вже маєте акаунт? Увійдіть</Link>
            </View>
        </ScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({})