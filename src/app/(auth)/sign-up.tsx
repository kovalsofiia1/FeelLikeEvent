import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/src/components/shared/CustomButton'
import { Link, router } from 'expo-router'
import FormField from '@/src/components/shared/FormField';
import { createUser } from '@/lib/appwrite';
import { useAuth } from '@/src/context/AuthContext';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('Ім\'я обов\'язкове'),
    lastName: Yup.string().required('Прізвище обов\'язкове'),
    email: Yup.string().email('Некоректний email').required('Email обов\'язковий'),
    password: Yup.string().min(6, 'Пароль має містити мінімум 6 символів').required('Пароль обов\'язковий'),
});

interface IInputValue {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUp = () => {

    const { authState, onRegister } = useAuth();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: ""
    });

    const errorsInitialState = { email: "", password: "", lastName: "", firstName: "" };
    const [errors, setErrors] = useState<IInputValue>({ ...errorsInitialState });

    useEffect(() => {
        if (authState?.authenticated) {
            router.push('/');
        }
    }, [authState])

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        const result = await onRegister!(email, password, firstName, lastName);
        console.log(result)
        if (result && result.error) {
            alert(result.msg);
            setForm({ ...form, error: result.msg });
        }
        else {
            router.push('/');
        }
    }
    const submit = async () => {
        try {
            await registerSchema.validate(form, { abortEarly: false });
            setErrors({ ...errorsInitialState });

            setSubmitting(true);
            await register(form.email, form.password, form.firstName, form.lastName);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: IInputValue = { ...errorsInitialState }; // Initialize with defaults
                error.inner.forEach((err) => {
                    if (err.path === "email") {
                        newErrors.email = err.message;
                    } else if (err.path === "password") {
                        newErrors.password = err.message;
                    } else if (err.path === "firstName") {
                        newErrors.firstName = err.message;
                    } else if (err.path === "lastName") {
                        newErrors.lastName = err.message;
                    }
                });

                setErrors(newErrors); // Correct type assignment
            }
        } finally {
            setSubmitting(false);
        }
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
                        value={form.firstName}
                        handleChangeText={(e) => setForm({ ...form, firstName: e })}
                        keyboardType="default"
                    />

                    <FormField
                        title="Прізвище"
                        placeholder="Введіть прізвище"
                        value={form.lastName}
                        handleChangeText={(e) => setForm({ ...form, lastName: e })}
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
                    {form.error && <Text className='text-red-600 text-center text-lg'>{form.error}</Text>}
                </View>
                <CustomButton onPress={() => { submit() }} additionalStyles={'w-full px-3 text-center'} textAdditionalStyles='text-lg'>Зареєструватися</CustomButton>
                <Link href={'/sign-in'} className='text-blue-500 underline py-3 text-center'>Вже маєте акаунт? Увійдіть</Link>
            </View>
        </ScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({})