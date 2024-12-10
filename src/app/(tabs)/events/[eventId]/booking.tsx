import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import Container from '@/src/components/shared/Container';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { selectCurrentEvent } from '@/src/redux/events/selectors';
import CustomButton from '@/src/components/shared/CustomButton';
import FormField from '@/src/components/shared/FormField';
import { selectUser } from '@/src/redux/user/selectors';
import { getEventById } from '@/src/redux/events/actions';
import { fetchMyData } from '@/src/redux/user/actions';

const BookingPage = () => {
  const { eventId } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const currentEvent = useSelector(selectCurrentEvent);
  const user = useSelector(selectUser);


  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [comment, setComment] = useState('');
  const [tickets, setTickets] = useState('1');

  useEffect(() => {
    if (!eventId) {
      router.push('/events');
    }
    if (!currentEvent || currentEvent._id !== eventId) {
      dispatch(getEventById(eventId as string));
    }
  }, [eventId])
  const handleBook = async () => {
    alert(`Form submitted: \nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nComment: ${comment}`);
  }

  return (
    <Container>
      <View className='max-w-[800px] '>
        <Text className='font-medium text-3xl mb-5'>Забронювати подію <Text className='text-blue-500'>"{currentEvent?.name}"</Text></Text>
        <Text className='text-lg text-slate-600 mb-4'>Ти на крок ближче до чудово проведеного часу разом з нами! Заповни, будь ласка, наступні дані, щоб ми змогли з тобою зв’язатися!</Text>

        <FormField
          title="Ім'я"
          placeholder="Ім'я"
          value={name}
          handleChangeText={setName}
          keyboardType="default"
        />
        <FormField
          title="Номер телефону"
          placeholder="+380"
          value={phone}
          handleChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <FormField
          title="Email"
          placeholder="Введіть email"
          value={email}
          handleChangeText={setEmail}
          keyboardType="email-address"
        />
        <FormField
          title="Кількість квитків"
          placeholder="Кількість квитків"
          value={tickets.toString()}
          handleChangeText={setTickets}
          keyboardType="numeric"
        />

        <FormField
          title="Коментар"
          placeholder="Коментар"
          value={comment}
          handleChangeText={setComment}
          keyboardType="default"
        />

        <CustomButton onPress={() => handleBook()} additionalStyles='mt-4'>Забронювати</CustomButton>
      </View>
    </Container>
  )
}

export default BookingPage

const styles = StyleSheet.create({});