import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import EventList from './EventList'

const TopEvents = () => {
    return (
        <View>
            <Text className={`text-xl text-center mb-2 font-bold`}>Найпопулярніші події</Text>
            <Link href="/events" className='text-md underline text-right text-gray-400'>Переглянути усі</Link>
            <EventList eventsList={[]}></EventList>
        </View >
    )
}

export default TopEvents

const styles = StyleSheet.create({})