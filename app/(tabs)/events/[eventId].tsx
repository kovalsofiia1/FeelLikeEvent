import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// The type for the eventId parameter
type RouteParams = {
    eventId: string;
};

const EventDetailsPage = () => {
    const { eventId } = useLocalSearchParams(); // Get eventId from the route params

    return (
        <View>
            <Text>Event Details for {eventId}</Text>
        </View>
    );
};

export default EventDetailsPage;