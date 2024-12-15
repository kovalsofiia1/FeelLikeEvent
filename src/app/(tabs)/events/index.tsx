import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import Container from '@/src/components/shared/Container';
import FormField from '@/src/components/shared/FormField';
import EventsFilters from '@/src/components/events/EventsFilters';
import CustomButton from '@/src/components/shared/CustomButton';
import { icons } from '@/src/constants';
import { fetchEvents } from '@/src/redux/events/actions';
import { selectEvents } from '@/src/redux/events/selectors';
import { AppDispatch } from '@/src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { handleNotLoggedIn } from '@/src/utils/notLoggedIn';
import { selectIsLoggedIn } from '@/src/redux/user/selectors';
import EventItem from '@/src/components/events/EventItem';
import EventList from '@/src/components/events/EventList';
import useDebounce from '@/src/hooks/useDebounce';
import { isWeb } from '@/src/utils/storage';

const EventsPage = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [filters, setFilters] = useState<any>({}); // Track selected filters
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch<AppDispatch>();
    const events = useSelector(selectEvents);

    useEffect(() => {
        fetchEventsData(currentPage, filters); // Fetch events when page or filters change
    }, [currentPage, filters, debouncedSearchQuery, isFavorite]);

    const fetchEventsData = (page: number, filters: any) => {
        setIsLoading(true);

        // Combine pagination, search query, and filters into the API request
        const params = {
            page,
            pageSize: isWeb ? 8 : 4,
            searchQuery,
            saved: isFavorite.toString(),
            ...filters,
        };

        dispatch(fetchEvents(params))
            .then(() => setIsLoading(false)) // Set loading to false after events are fetched
            .catch(() => setIsLoading(false));
    };

    const handleSearch = (query: string): void => {
        setSearchQuery(query);
    };

    const handleFiltersChange = (newFilters: any) => {
        setFilters(newFilters); // Update filters state when filters change
        setCurrentPage(1); // Reset to the first page
    };

    const handleAdd = () => {
        if (!isLoggedIn) {
            handleNotLoggedIn();
        } else {
            router.push('/events/create');
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1); // Increase page to load more events
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1); // Decrease page if not the first page
        }
    };

    return (
        <Container>
            <View className="flex justify-between align-center py-4 max-w-[800px]">
                <Text className="text-3xl text-blue-500 font-bold mb-4">Усі події</Text>
                <FormField
                    placeholder="Шукайте події"
                    value={searchQuery}
                    handleChangeText={(e) => handleSearch(e)}
                    keyboardType="default"
                />
            </View>

            <EventsFilters onFiltersChange={handleFiltersChange} />

            <View className="flex flex-row gap-2 justify-end items-center">
                <TouchableOpacity onPress={() => { setIsFavorite((prevState) => !prevState); }}>
                    <Image
                        source={isFavorite ? icons.redHeart : icons.heart}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
                <CustomButton onPress={() => { handleAdd(); }} additionalStyles="px-3">+</CustomButton>
            </View>

            <Text className="font-bold text-xl text-center text-white">{isFavorite ? 'Улюблені події' : 'Усі події'}</Text>

            {/* Event List with Pagination */}
            {isLoading ? (
                <View className='flex-1 justify-center items-center'>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <>{
                    !events.events.length ?
                        <View className='flex flex-1 justify-center items-center mt-20'>
                            <Text className='text-bold text-3xl text-center text-white'>На жаль, не знайдено подій за вашим запитом!</Text>
                        </View>
                        :
                        <>
                            <EventList eventsList={events.events}></EventList>
                            {events.events && <View className="flex flex-row justify-center items-center gap-4 mt-4 mb-8">
                                {events.pagination.page > 1 && <CustomButton onPress={handlePrevPage} additionalStyles="px-4 py-2">
                                    Попередня сторінка
                                </CustomButton>}
                                <Text className='text-xl font-bold text-blue-500'>{events.pagination.page}</Text>
                                {events.pagination.page < events.pagination.totalPages && <CustomButton onPress={handleNextPage} additionalStyles="px-4 py-2">
                                    Наступна сторінка
                                </CustomButton>
                                }
                            </View>
                            }
                        </>
                }
                </>
            )}
        </Container>
    );
};

export default EventsPage;

const styles = StyleSheet.create({});
