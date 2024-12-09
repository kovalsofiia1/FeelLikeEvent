import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import Container from '@/src/components/shared/Container';

const BookingPage = () => {
  const { eventId } = useLocalSearchParams();

  return (
    <Container>
      <Text>{eventId}</Text>
    </Container>
  )
}

export default BookingPage

const styles = StyleSheet.create({})