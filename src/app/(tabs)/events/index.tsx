import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, router } from 'expo-router';
import Container from '@/src/components/shared/Container';
import FormField from '@/src/components/shared/FormField';
import EventsFilters from '@/src/components/events/EventsFilters';
import CustomButton from '@/src/components/shared/CustomButton';
import EventList from '@/src/components/events/EventList';
import { icons } from '@/src/constants';
import { fetchEvents } from '@/src/redux/events/actions';
import { selectEvents, selectTopEvents } from '@/src/redux/events/selectors';
import { AppDispatch } from '@/src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
const EventsPage = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const events = useSelector(selectEvents);
    useEffect(() => {
        dispatch(fetchEvents());
    }, [])

    const handleSearch = (query: string): void => {
        setSearchQuery(query);
    }

    return (
        <Container>
            <View className='flex justify-between align-center py-4'>
                <Text className="text-3xl text-blue-500 font-bold">Усі події</Text>
                <FormField
                    placeholder='Шукайте події'
                    value={searchQuery}
                    handleChangeText={(e) => handleSearch(e)}
                    keyboardType="default"
                />
            </View>

            <EventsFilters></EventsFilters>

            <View className='flex flex-row gap-2 justify-end items-center'>
                <TouchableOpacity onPress={() => { setIsFavorite((prevState) => !prevState) }}>
                    <Image
                        source={isFavorite ? icons.redHeart : icons.heart}
                        resizeMode='contain'
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
                <CustomButton onPress={() => { router.push('/events/create') }} additionalStyles='px-3'>+</CustomButton>
            </View>

            <Text className='font-bold text-xl text-center'>{isFavorite ? 'Улюблені події' : 'Усі події'}</Text>
            <EventList eventsList={events} />
        </Container>
    );
};

export default EventsPage;

const styles = StyleSheet.create({})