import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Event } from '@/src/redux/events/types'
import { getDate } from '@/src/utils/dateTime'
import { DEFAULT_EVENT_IMAGE } from '@/src/constants/defaultImagePath'

interface Props {
    event: Event
}

const EventItem = ({ event }: Props) => {
    return (
        <View className="border border-gray-300 rounded-lg p-4 w-72 shadow-md bg-white" style={{ backgroundColor: 'white' }}>
            {/* Image Placeholder */}
            <View className="bg-gray-200 h-32 w-full rounded-lg mb-4">
                <Image
                    source={{ uri: (event.images && event.images.length > 0 ? event.images[0] : DEFAULT_EVENT_IMAGE) }} // Placeholder image URL
                    className="h-full w-full rounded-lg"
                    resizeMode="cover"
                />
            </View>

            {/* Title */}
            <Text className="text-lg font-semibold mb-1">{event.name}</Text>

            {/* Description */}
            <Text className="text-sm text-gray-600 mb-2">
                {event.description}
            </Text>

            {/* Location */}
            <Text className="text-sm text-gray-800 mb-1">
                Де? {event.location ? (typeof event.location === 'string' ? event.location : event.location?.city) : 'Онлайн'}
            </Text>

            {/* Date */}
            <Text className="text-sm text-gray-800 mb-2">
                Коли? {getDate(event.startDate)}
            </Text>

            {/* "More" Link */}
            <TouchableOpacity
                onPress={() => { router.push(`/events/${event._id}`) }}
            >
                <Text className="text-blue-500 text-sm font-medium">Більше...</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EventItem

const styles = StyleSheet.create({})