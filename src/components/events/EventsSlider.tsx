import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventItem from './EventItem'
import { Event } from '@/src/redux/events/types';

interface Props {
  eventsList: Event[]
}

const EventsSlider = ({ eventsList }: Props) => {
  return (
    <View className="py-4 flex flex-row gap-3 justify-start overflow-x-auto w-full">
      {eventsList.length ? (
        eventsList.map((event) => (
          <EventItem key={event._id} event={event} /> // Ensure EventItem has a fixed width
        ))
      ) : (
        <Text className="text-lg text-slate-600">Події відсутні</Text>
      )}
    </View>
  )
}

export default EventsSlider

const styles = StyleSheet.create({})