import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const EventsPage = () => {
    return (
        <View>
            <Text>Events List</Text>
            {/* Example of a list of events */}
            <Button title="Create Event" onPress={() => { }} />
            {/* Link to the create page */}
            <Link href="/events/create">Create a new event</Link>
            {/* List of events */}
            <Link href="/events/1">Event 1</Link>
            <Link href="/events/2">Event 2</Link>
        </View>
    );
};

export default EventsPage;

const styles = StyleSheet.create({})