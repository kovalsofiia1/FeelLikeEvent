import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EventItem from './EventItem'

interface Props {
    eventsList: []
}

const EventList = ({ eventsList }: Props) => {
    return (
        <View className='py-2'>
            <EventItem />
        </View>
    )
}

export default EventList

const styles = StyleSheet.create({})