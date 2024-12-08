import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/src/components/shared/CustomButton'
import { Link, router, useRouter } from 'expo-router'
import FormField from '@/src/components/shared/FormField';
import { useAuth } from '@/src/context/AuthContext';
import * as Yup from 'yup';
import { AppDispatch } from '@/src/redux/store';
import { selectUser, selectLoading, selectError, selectIsLoggedIn } from '@/src/redux/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '@/src/redux/user/actions';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Некоректний email').required('Email обов\'язковий'),
    password: Yup.string().min(6, 'Пароль має містити мінімум 6 символів').required('Пароль обов\'язковий'),
});

interface IInputValue {
    email: string;
    password: string;
}

const SignIn = () => {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [isSubmitting, setSubmitting] = useState(false);
    // const { authState, onLogin } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<IInputValue>({ email: "", password: "" });

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/home');
        }
    }, [isLoggedIn])

    // const login = async (email: string, password: string) => {
    //     console.log('in login')
    //     const result = await onLogin!(email, password);
    //     console.log(result)
    //     if (result && result.error) {
    //         alert(result.msg);
    //         setForm({ ...form, error: result.msg });
    //     }
    //     else {
    //         router.push('/home');
    //     }
    // }

    const submit = async () => {
        try {
            await loginSchema.validate(form, { abortEarly: false });
            setErrors({ email: "", password: "" }); // Clear errors

            setSubmitting(true);

            dispatch(logIn(form))
                .unwrap()
                .then(() => {
                    router.push('/home');
                })

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

                setErrors(newErrors);
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
                    {loading && <Text>Loading...</Text>}
                    {error && <Text className='text-red-600'>{error}</Text>}
                </View>

                <CustomButton onPress={() => { submit() }} additionalStyles={'w-full px-3 text-center'} textAdditionalStyles='text-lg'>Увійти</CustomButton>
                <Link href={'/sign-up'} className='text-blue-500 underline py-3 text-center'>Не маєте акаунта? Зареєструйтеся</Link>
            </View>
        </ScrollView>
    )
}

export default SignIn
