import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Event } from '@/src/redux/events/types'

interface Props {
    event: Event
}

const EventItem = ({ event }: Props) => {
    return (
        <View className="border border-gray-300 rounded-lg p-4 w-72 shadow-sm">
            {/* Image Placeholder */}
            <View className="bg-gray-200 h-32 w-full rounded-lg mb-4">
                <Image
                    source={{ uri: `${event.images && event.images[0]}` || 'https://via.placeholder.com/150' }} // Placeholder image URL
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
                Де? {typeof event.location === 'string' ? event.location : event.location?.city}
            </Text>

            {/* Date */}
            <Text className="text-sm text-gray-800 mb-2">
                Коли? {event.startDate}
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