import AuthGuard from '@/src/components/auth/AuthGuard';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CreateEventPage = () => {
	return (
		<AuthGuard>
			<View>
				<Text>Create a New Event</Text>
				<TextInput placeholder="Event Name" />
				<TextInput placeholder="Event Description" />
				<Button title="Create Event" onPress={() => { }} />
			</View>
		</AuthGuard>
	);
};

export default CreateEventPage;