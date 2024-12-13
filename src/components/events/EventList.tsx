import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventItem from './EventItem'
import { Event } from '@/src/redux/events/types'

interface Props {
    eventsList: Event[]
}

const EventList = ({ eventsList }: Props) => {
    return (
        <View className='py-4 flex flex-row flex-wrap gap-3 justify-center'>
            {eventsList.length && eventsList.map((event) => (
                <EventItem key={event._id} event={event} />
            ))}
        </View>
    )
}

export default EventList

const styles = StyleSheet.create({})