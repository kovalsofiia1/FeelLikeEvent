import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import CustomButton from '@/src/components/shared/CustomButton';
import { Link, Redirect, useRouter } from 'expo-router';
import FormField from '@/src/components/shared/FormField';
import * as Yup from 'yup';
import { AppDispatch } from '@/src/redux/store';
import { selectLoading, selectError, selectIsLoggedIn } from '@/src/redux/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@/src/redux/user/actions';
import Container from '@/src/components/shared/Container';

const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('Ім\'я обов\'язкове'),
    lastName: Yup.string().required('Прізвище обов\'язкове'),
    email: Yup.string().email('Некоректний email').required('Email обов\'язковий'),
    password: Yup.string().min(6, 'Пароль має містити мінімум 6 символів').required('Пароль обов\'язковий'),
});

const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return <Redirect href="/home" />;
    }

    const handleSubmit = async (
        values: { firstName: string; lastName: string; email: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            dispatch(register(values))
                .unwrap()
                .then(() => {
                    router.push('/home');
                });
        } catch (err) {
            // Handle errors from Redux if needed
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container>
            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, marginBottom: 16, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
                <View>
                    <Text className="font-medium text-3xl mb-5">Зареєструватися</Text>
                    <Text className="text-lg text-slate-600">
                        Дякуємо за ваш інтерес до нашої платформи! Для реєстрації нам потрібна певна інформація. Будь ласка, надайте наступні дані.
                    </Text>
                </View>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <View className="py-10 flex gap-2">
                            <FormField
                                title="Ім'я"
                                placeholder="Введіть ім'я"
                                value={values.firstName}
                                handleChangeText={handleChange('firstName')}
                                // onBlur={handleBlur('firstName')} // Added onBlur
                                keyboardType="default"
                                errorMessage={touched.firstName && errors.firstName ? errors.firstName : ''}
                            />
                            <FormField
                                title="Прізвище"
                                placeholder="Введіть прізвище"
                                value={values.lastName}
                                handleChangeText={handleChange('lastName')}
                                // onBlur={handleBlur('lastName')} // Added onBlur
                                keyboardType="default"
                                errorMessage={touched.lastName && errors.lastName ? errors.lastName : ''}
                            />
                            <FormField
                                title="Email"
                                placeholder="Введіть email"
                                value={values.email}
                                handleChangeText={handleChange('email')}
                                // onBlur={handleBlur('email')} // Added onBlur
                                keyboardType="email-address"
                                errorMessage={touched.email && errors.email ? errors.email : ''}
                            />
                            <FormField
                                title="Пароль"
                                placeholder="Введіть пароль"
                                type="password"
                                value={values.password}
                                handleChangeText={handleChange('password')}
                                // onBlur={handleBlur('password')} // Added onBlur
                                errorMessage={touched.password && errors.password ? errors.password : ''}
                            />
                            {loading && <Text>Loading...</Text>}
                            {error && <Text className="text-red-600">{error}</Text>}
                            <CustomButton
                                onPress={handleSubmit as () => void}
                                additionalStyles="w-full px-3 text-center"
                                textAdditionalStyles="text-lg"
                                isDisabled={isSubmitting || loading}
                            >
                                {isSubmitting || loading ? 'Завантаження...' : 'Зареєструватися'}
                            </CustomButton>
                        </View>
                    )}
                </Formik>
                <Link href="/sign-in" className="text-blue-500 underline py-3 text-center">
                    Вже маєте акаунт? Увійдіть
                </Link>
            </View>
        </Container >
    );
};

export default SignUp;

const styles = StyleSheet.create({});
