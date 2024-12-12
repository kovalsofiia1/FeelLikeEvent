import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import EventList from './EventList'
import { fetchEvents } from '@/src/redux/events/actions'
import { selectEvents, selectTopEvents } from '@/src/redux/events/selectors'
import { AppDispatch } from '@/src/redux/store'
import { useDispatch, useSelector } from 'react-redux'

const TopEvents = () => {
    const dispatch = useDispatch<AppDispatch>();
    const topEvents = useSelector(selectEvents);
    useEffect(() => {
        dispatch(fetchEvents({ page: 1 }));
    }, [])
    return (
        <View>
            <Text className={`text-xl text-center mb-2 font-bold`}>Найпопулярніші події</Text>
            <Link href="/events" className='text-md underline text-right text-gray-400'>Переглянути усі</Link>
            <EventList eventsList={topEvents.events}></EventList>
        </View >
    )
}

export default TopEvents

const styles = StyleSheet.create({})