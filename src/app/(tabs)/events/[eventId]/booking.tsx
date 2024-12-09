import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const BookingPage = () => {
  const { eventId } = useLocalSearchParams();

  return (
    <View>
      <Text>BookingPage for event {eventId}</Text>
    </View>
  )
}

export default BookingPage

const styles = StyleSheet.create({})