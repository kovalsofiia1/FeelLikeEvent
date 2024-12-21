import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import CustomButton from '@/src/components/shared/CustomButton';
import { Link, Redirect, useRouter } from 'expo-router';
import FormField from '@/src/components/shared/FormField';
import * as Yup from 'yup';
import { AppDispatch } from '@/src/redux/store';
import { selectLoading, selectError, selectIsLoggedIn } from '@/src/redux/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '@/src/redux/user/actions';
import Container from '@/src/components/shared/Container';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Некоректний email').required('Email обов\'язковий'),
    password: Yup.string().min(6, 'Пароль має містити мінімум 6 символів').required('Пароль обов\'язковий'),
});

const SignIn = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return <Redirect href="/home" />;
    }

    const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            dispatch(logIn(values))
                .unwrap()
                .then(() => {
                    router.push('/home');
                });
        } catch (err) {
            // Handle submission errors if needed
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container>
            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, marginBottom: 16, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
                <View>
                    <Text className="font-medium text-3xl mb-5">Увійти</Text>
                    <Text className="text-lg text-slate-600">Ласкаво просимо назад! Будь ласка, введіть свої облікові дані, щоб отримати доступ до свого акаунту та продовжити пошук подій.</Text>
                </View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <View className="py-10 flex gap-2">
                            <View className="flex gap-2">
                                <FormField
                                    title="Email"
                                    placeholder="Введіть email"
                                    value={values.email}
                                    handleChangeText={handleChange('email')}
                                    keyboardType="email-address"
                                    errorMessage={touched.email && errors.email ? errors.email : ''}
                                />
                                <FormField
                                    title="Пароль"
                                    placeholder="Введіть пароль"
                                    type="password"
                                    value={values.password}
                                    handleChangeText={handleChange('password')}
                                    errorMessage={touched.password && errors.password ? errors.password : ''}
                                />
                            </View>
                            {loading && <Text style={{ fontSize: 16 }}>Loading...</Text>}
                            {error && <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>}
                            <CustomButton
                                onPress={handleSubmit as () => void}
                                additionalStyles="w-full px-3 text-center"
                                textAdditionalStyles="text-lg"
                                isDisabled={isSubmitting || loading}
                            >
                                {isSubmitting || loading ? 'Завантаження...' : 'Увійти'}
                            </CustomButton>
                        </View>
                    )}
                </Formik>
                <Link href="/sign-up" className="text-blue-500 underline py-3 text-center">
                    Не маєте акаунта? Зареєструйтеся
                </Link>
            </View>
        </Container>
    );
};

export default SignIn;
