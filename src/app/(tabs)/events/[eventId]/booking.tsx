import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { bookEvent, getEventById } from '@/src/redux/events/actions';
import { selectCurrentEvent } from '@/src/redux/events/selectors';
import { selectUser } from '@/src/redux/user/selectors';
import { useLocalSearchParams, router } from 'expo-router';
import Container from '@/src/components/shared/Container';
import CustomButton from '@/src/components/shared/CustomButton';
import FormField from '@/src/components/shared/FormField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PHONE_PATTERN, USERNAME_PATTERN } from '@/src/constants/patterns';

// Define validation schema with Yup

const BookingPage = () => {
  const { eventId } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const currentEvent = useSelector(selectCurrentEvent);
  const user = useSelector(selectUser);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(USERNAME_PATTERN, "Ім'я повинне містити тільки літери!")
      .required("Ім'я є обов'язковим"),
    phone: Yup.string()
      .matches(PHONE_PATTERN, 'Невірний формат телефону')
      .required("Номер телефону є обов'язковим"),
    tickets: Yup.number()
      .min(1, 'Кількість квитків повинна бути більше 0')
      .max(currentEvent?.availableSeats!, `Недостатньо місць! Вільно тільки ${currentEvent?.availableSeats}`)
      .required('Кількість квитків є обов\'язковою'),
    comment: Yup.string().optional(),
  });

  // Effect to fetch event details if needed
  useEffect(() => {
    if (!eventId) {
      router.push('/events');
    }
    if (!currentEvent || currentEvent._id !== eventId) {
      dispatch(getEventById(eventId as string));
    }
  }, [eventId]);

  const handleBook = (values: any) => {
    const data = {
      tickets: values.tickets,
      additionalInformation: {
        name: values.name,
        phoneNumber: values.phone,
        ...(values.comment && { comment: values.comment })
      }
    }
    dispatch(bookEvent({ eventId_: eventId as string, isBooked: !!currentEvent?.booking, data }))
      .unwrap()
      .then(() => {
        router.push(`/events/${eventId}`)
      })
      .catch(() => {
        alert('Щось пішло не так, спробуйте знову!');
      })
  };

  return (
    <Container>
      <View className="max-w-[800px]">
        <Text className="font-medium text-3xl mb-5 flex flex-col">Забронювати подію <Text className="text-blue-500">"{currentEvent?.name}"</Text></Text>
        <Text className="text-lg text-slate-600 mb-4">Ти на крок ближче до чудово проведеного часу разом з нами! Заповни, будь ласка, наступні дані, щоб ми змогли з тобою зв’язатися!</Text>

        <Formik
          initialValues={{
            name: user?.name || '',
            phone: '',
            tickets: 1, // Make sure tickets is a number, not a string
            comment: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleBook}
        >
          {({ values, handleChange, handleSubmit, errors, touched, isValid, dirty }) => (
            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16 }}>
              <FormField
                title="Ім'я"
                placeholder="Ім'я"
                value={values.name}
                handleChangeText={handleChange('name')}
                keyboardType="default"
                errorMessage={touched.name && errors.name || ''} // Display error message
              />
              <FormField
                title="Номер телефону"
                placeholder="+380"
                value={values.phone}
                handleChangeText={handleChange('phone')}
                keyboardType="phone-pad"
                errorMessage={touched.phone && errors.phone || ''} // Display error message
              />
              <FormField
                title="Кількість квитків"
                placeholder="Кількість квитків"
                value={values.tickets.toString()} // Convert to string for the input
                handleChangeText={handleChange('tickets')}
                keyboardType="numeric"
                errorMessage={touched.tickets && errors.tickets || ''} // Display error message
              />
              <FormField
                title="Коментар"
                placeholder="Коментар"
                value={values.comment}
                handleChangeText={handleChange('comment')}
                keyboardType="default"
                errorMessage={touched.comment && errors.comment || ''} // Display error message
              />

              <CustomButton onPress={handleSubmit} additionalStyles="mt-4">Забронювати</CustomButton>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default BookingPage;

const styles = StyleSheet.create({});
