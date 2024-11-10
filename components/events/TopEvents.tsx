import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import EventList from './EventList'

const TopEvents = () => {
    return (
        <View>
            <Text className={`text-lg text-center mb-2`}>Найпопулярніші події</Text>
            <Link href="/events" className='text-md underline text-right text-gray-400'>Переглянути усі</Link>
            <EventList eventsList={[]}></EventList>
        </View >
    )
}

export default TopEvents

const styles = StyleSheet.create({})