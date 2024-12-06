import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CreateEventPage = () => {
    return (
        <View>
            <Text>Create a New Event</Text>
            <TextInput placeholder="Event Name" />
            <TextInput placeholder="Event Description" />
            {/* Add more form inputs as needed */}
            <Button title="Create Event" onPress={() => { }} />
        </View>
    );
};

export default CreateEventPage;