import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/src/components/shared/CustomButton'
import { Link, router } from 'expo-router'
import FormField from '@/src/components/shared/FormField';
import { useAuth } from '@/src/context/AuthContext';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email обов\'язковий'),
    password: Yup.string().min(6, 'Password too short').required('Пароль обов\'язковий'),
});

interface IInputValue {
    email: string;
    password: string;
}

const SignIn = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const { authState, onLogin } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
        error: ""
    });
    const [errors, setErrors] = useState<IInputValue>({ email: "", password: "" });

    const login = async (email: string, password: string) => {
        console.log('in login')
        const result = await onLogin!(email, password);
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
            await loginSchema.validate(form, { abortEarly: false });
            setErrors({ email: "", password: "" }); // Clear errors

            setSubmitting(true);
            await login(form.email, form.password);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: IInputValue = { email: "", password: "" }; // Initialize with defaults
                error.inner.forEach((err) => {
                    if (err.path === "email") {
                        newErrors.email = err.message;
                    } else if (err.path === "password") {
                        newErrors.password = err.message;
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
                    <Text className='font-medium text-3xl mb-5'>Увійти</Text>
                    <Text className='text-lg text-slate-600'>
                        Ласкаво просимо назад! Будь ласка, введіть свої облікові дані, щоб отримати доступ до свого акаунту та продовжити пошук подій.
                    </Text>
                </View>

                <View className='py-10 flex gap-3'>
                    <FormField
                        title="Email"
                        placeholder="Введіть email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        keyboardType="email-address"
                        errorMessage={errors.email}
                    />

                    <FormField
                        title="Пароль"
                        placeholder="Введіть пароль"
                        type="password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        errorMessage={errors.password}
                    />
                    {form.error && <Text className='text-red-600 text-center text-lg'>{form.error}</Text>}
                </View>

                <CustomButton onPress={() => { submit() }} additionalStyles={'w-full px-3 text-center'} textAdditionalStyles='text-lg'>Увійти</CustomButton>
                <Link href={'/sign-up'} className='text-blue-500 underline py-3 text-center'>Не маєте акаунта? Зареєструйтеся</Link>
            </View>
        </ScrollView>
    )
}

export default SignIn
