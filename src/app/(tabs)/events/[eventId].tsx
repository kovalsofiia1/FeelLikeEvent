import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import Container from '@/src/components/shared/Container';
import TagsList from '@/src/components/shared/tags/TagsList';
import CustomButton from '@/src/components/shared/CustomButton';
import CommentsSection from '@/src/components/shared/CommentsSection';
import { getEventById } from '@/src/services/eventsService';
import Loader from '@/src/components/shared/Loader';
import { Event } from '@/src/redux/events/types';
import { getDate, getTime } from '@/src/utils/dateTime';

type RouteParams = {
    eventId: string;
};

const EventDetailsPage = () => {
    const { eventId } = useLocalSearchParams();

    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setIsLoading(true);
                const data = await getEventById(eventId as string); // Fetch event details
                setEvent(data);
            } catch (err: any) {
                setError(err.message || "Failed to load event details");
            } finally {
                setIsLoading(false);
            }
        };

        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    return (
        <Container>
            {isLoading ? <Loader /> :
                (event && <>
                    <View className="bg-gray-200 h-32 w-full rounded-lg mb-4">
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image URL
                            className="h-full w-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 mb-2">
                        {event.name}
                    </Text>
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-green-600 font-bold">Ціна: {event.price} грн.</Text>
                    </View>


                    <TagsList tags={event.tags || []}></TagsList>


                    <Text className="text-gray-700 mb-6">
                        {event.description}
                    </Text>

                    <View className="mb-6">
                        <Text className="text-gray-900 font-bold mb-2">Деталі:</Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Дата:</Text> {getDate(event.startDate)} - {getDate(event.endDate)}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Час:</Text> {getTime(event.startDate)} - {getTime(event.endDate)}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Кількість людей:</Text> до {event.totalSeats}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Місто:</Text> {event.location}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Місце:</Text>{event.location}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Організатор:</Text> {event.createdBy.name}
                        </Text>
                    </View>


                    <Text className="text-gray-700 mb-6">
                        Вже заброньовано: {event.totalSeats - event.availableSeats}/{event.totalSeats} місць
                    </Text>

                    <View className="flex-row gap-2">
                        <CustomButton onPress={() => { router.push(`/events/${event._id}/booking`) }}>Забронювати</CustomButton>
                        <CustomButton onPress={() => { }} isActive={false}>Зберегти</CustomButton>
                    </View>

                    <CommentsSection></CommentsSection>
                </>
                )
            }
        </Container>
    );
};

export default EventDetailsPage;