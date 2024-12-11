import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { selectCurrentEvent } from '@/src/redux/events/selectors';
import { useSelector } from 'react-redux';

const EditEventPage = () => {
  // const router = useRouter();
  const { eventId } = useLocalSearchParams(); // Fetch eventId from the URL
  const currentEvent = useSelector(selectCurrentEvent);



  return (
    <View>
      <Text>Edit Event {eventId}</Text>
      <TextInput placeholder="Event Name" />
      <TextInput placeholder="Event Description" />
      <Button title="Save Changes" onPress={() => { }} />
    </View>
  );
};

export default EditEventPage;