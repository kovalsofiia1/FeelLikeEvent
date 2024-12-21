import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Booking } from '@/src/redux/events/types'

interface Props {
  bookings: Booking[]
}

const Bookings = ({ bookings }: Props) => {
  return (
    <ScrollView style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, width: '100%', maxHeight: 300 }}>
      <Text className='font-bold text-md pb-2'>Бронювання</Text>
      <View className='flex flex-col gap-2'>
        {bookings.length ?
          (bookings.map((booking) => (
            <View className='shadow-sm border border-slate-300 p-1' key={booking._id}>
              <Text>Ім'я: {booking.userId.name} {booking.additionalInformation.name !== booking.userId.name && `(${booking.additionalInformation.name})`}</Text>
              <Text>Email: {booking.userId.email}</Text>
              <Text>Номер телефону: {booking.additionalInformation.phoneNumber}</Text>
              <Text>К-сть квитків: {booking.tickets}</Text>

            </View>
          ))
          ) :
          <Text className='py-4'>Поки немає бронювань</Text>
        }
      </View>
    </ScrollView>
  )
}

export default Bookings

const styles = StyleSheet.create({})