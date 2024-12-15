import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import EventList from './EventList'
import { fetchEvents, fetchTopEvents } from '@/src/redux/events/actions'
import { selectEvents, selectTopEvents } from '@/src/redux/events/selectors'
import { AppDispatch } from '@/src/redux/store'
import { useDispatch, useSelector } from 'react-redux'

const TopEvents = () => {
    const dispatch = useDispatch<AppDispatch>();
    const topEvents = useSelector(selectTopEvents);
    useEffect(() => {
        dispatch(fetchTopEvents({ limit: 3 }));
    }, [])
    return (
        <View>
            <Text className={`text-xl text-center mb-2 font-bold text-white`}>Найпопулярніші події</Text>
            <Link href="/events" className='text-md underline text-right text-white'>Переглянути усі</Link>
            <EventList eventsList={topEvents}></EventList>
        </View >
    )
}

export default TopEvents

const styles = StyleSheet.create({})