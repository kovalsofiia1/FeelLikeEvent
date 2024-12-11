import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import Container from '@/src/components/shared/Container';
import TagsList from '@/src/components/shared/tags/TagsList';
import CustomButton from '@/src/components/shared/CustomButton';
import CommentsSection from '@/src/components/shared/CommentsSection';
// import { bookEvent, saveEvent } from '@/src/services/eventsService';
import Loader from '@/src/components/shared/Loader';
import { Event } from '@/src/redux/events/types';
import { getDate, getTime } from '@/src/utils/dateTime';
import { useSelector } from 'react-redux';
import { selectUser } from '@/src/redux/user/selectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { selectCurrentEvent } from '@/src/redux/events/selectors';
import { bookEvent, deleteEventById, getEventById, saveEvent } from '@/src/redux/events/actions';
import { handleNotLoggedIn } from '@/src/utils/notLoggedIn';

type RouteParams = {
    eventId: string;
};

const EventDetailsPage = () => {
    const { eventId } = useLocalSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const user = useSelector(selectUser);

    const dispatch = useDispatch<AppDispatch>();
    const currentEvent = useSelector(selectCurrentEvent);

    useEffect(() => {
        if (eventId) {
            setIsLoading(true);
            dispatch(getEventById(eventId as string))
                .unwrap()
                .catch((err) => {
                    setError(err.message || "Failed to load event details");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }, [eventId]);



    const handleSaveEvent = async () => {
        if (!user) {
            handleNotLoggedIn();
            return;
        }
        dispatch(saveEvent({ eventId: currentEvent?._id as string, isSaved: currentEvent?.isSaved! }));
    }

    const handleBooking = async () => {
        if (!user) {
            handleNotLoggedIn();
            return;
        }
        if (currentEvent?.booking) {
            dispatch(bookEvent({ eventId_: currentEvent?._id as string, isBooked: !!currentEvent?.booking, data: {} }));
        }
        else {
            router.push(`/events/${currentEvent!._id}/booking`);
        }
    }

    const handleDelete = async () => {
        if (!user) {
            handleNotLoggedIn();
            return;
        }

        if (user._id !== currentEvent?.createdBy._id) {
            alert('У вас немає прав видалити дану подію')
        }

        dispatch(deleteEventById(eventId as string))
            .unwrap()
            .then(() => {
                router.push('/events')
            })
            .catch(() => {
                alert('Сталася помилка при видалені події!');
            })
    }

    return (
        <Container>
            {isLoading ? <Loader /> :
                (currentEvent ? <>
                    <View className="bg-gray-200 h-32 w-full rounded-lg mb-4">
                        <Image
                            source={{ uri: `${currentEvent.images && currentEvent.images[0]}` || 'https://via.placeholder.com/150' }}
                            className="h-full w-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className='flex flex-row justify-between'>
                        <View>
                            <Text className="text-2xl font-bold text-gray-900 mb-2">
                                {currentEvent.name}
                            </Text>
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-green-600 font-bold">{currentEvent.price ? `Ціна: ${currentEvent.price} грн.` : 'Безкоштовно'}</Text>
                            </View>
                        </View>
                        {user?._id === currentEvent.createdBy._id &&
                            <View className='flex flex-row gap-2'>
                                <CustomButton onPress={() => router.push(`/events/${eventId}/edit`)} isActive={false}>Редагувати</CustomButton>
                                <CustomButton onPress={() => handleDelete()}>Видалити</CustomButton>
                            </View>
                        }
                    </View>

                    <TagsList tags={currentEvent.tags || []}></TagsList>


                    <Text className="text-gray-700 mb-6">
                        {currentEvent.description}
                    </Text>

                    <View className="mb-6">
                        <Text className="text-gray-900 font-bold mb-2">Деталі:</Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Дата:</Text> {(getDate(currentEvent.startDate) === getDate(currentEvent.endDate)) ? `${getDate(currentEvent.startDate)}` : `${getDate(currentEvent.startDate)} - ${getDate(currentEvent.endDate)}`}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Час:</Text> {getTime(currentEvent.startDate)} - {getTime(currentEvent.endDate)}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-bold">Кількість людей:</Text> до {currentEvent.totalSeats}
                        </Text>
                        {currentEvent.location ? (
                            typeof currentEvent.location === 'string' ? (
                                <Text className="text-gray-700">
                                    <Text className="font-bold">Адреса:</Text> {currentEvent.location}
                                </Text>
                            ) : (
                                <>
                                    <Text className="text-gray-700">
                                        <Text className="font-bold">Країна:</Text> {currentEvent.location.country}
                                    </Text>
                                    <Text className="text-gray-700">
                                        <Text className="font-bold">Місто:</Text> {currentEvent.location.city}
                                    </Text>
                                    <Text className="text-gray-700">
                                        <Text className="font-bold">Адреса:</Text> {currentEvent.location.address}
                                    </Text>
                                    <Text className="text-gray-700">
                                        <Text className="font-bold">Місце:</Text> {currentEvent.location.place}
                                    </Text>
                                </>
                            )
                        ) : (
                            <Text className="text-gray-700">
                                <Text className="font-bold">Місце:</Text> {currentEvent.isOnline}
                            </Text>
                        )}
                        <Text className="text-gray-700">
                            <Text className="font-bold">Організатор:</Text> {currentEvent.createdBy.name}
                        </Text>
                    </View>


                    <Text className="text-gray-700 mb-6">
                        Вже заброньовано: {currentEvent.totalSeats - currentEvent.availableSeats}/{currentEvent.totalSeats} місць
                    </Text>

                    <View className="flex-row gap-2">
                        {currentEvent.booking && <Text>Ви забронювали {currentEvent.booking.tickets} квитків </Text>}
                        <CustomButton onPress={() => { handleBooking() }}>{currentEvent.booking ? 'Скасувати бронювання' : 'Забронювати'}</CustomButton>
                        <CustomButton onPress={() => { handleSaveEvent() }} isActive={false}>{currentEvent.isSaved ? 'Видалити зі збережених' : 'Зберегти'}</CustomButton>
                    </View>

                    <CommentsSection></CommentsSection>
                </>
                    :
                    <View>
                        <Text>Вибачте! На жаль, дана подія зараз не доступна!</Text>
                    </View>
                )
            }
        </Container >
    );
};

export default EventDetailsPage;