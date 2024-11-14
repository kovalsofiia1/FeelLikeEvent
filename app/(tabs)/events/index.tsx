import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Container from '@/components/shared/Container';
import FormField from '@/components/shared/FormField';
import EventsFilters from '@/components/events/EventsFilters';

const EventsPage = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

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
                    keyboardType="email-address"
                />
            </View>

            <EventsFilters></EventsFilters>


            {/* Example of a list of events */}
            <Button title="Create Event" onPress={() => { }} />
            {/* Link to the create page */}
            <Link href="/events/create">Create a new event</Link>
            {/* List of events */}
            <Link href="/events/1">Event 1</Link>
            <Link href="/events/2">Event 2</Link>
        </Container>
    );
};

export default EventsPage;

const styles = StyleSheet.create({})