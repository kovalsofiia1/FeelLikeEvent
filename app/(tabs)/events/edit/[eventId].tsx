import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const EditEventPage = () => {
    // const router = useRouter();
    const { eventId } = useLocalSearchParams(); // Fetch eventId from the URL

    return (
        <View>
            <Text>Edit Event {eventId}</Text>
            <TextInput placeholder="Event Name" />
            <TextInput placeholder="Event Description" />
            {/* Add form inputs with current values pre-filled */}
            <Button title="Save Changes" onPress={() => { }} />
        </View>
    );
};

export default EditEventPage;