import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AuthGuard from '@/src/components/auth/AuthGuard';
import Container from '@/src/components/shared/Container';
import 'react-datepicker/dist/react-datepicker.css';
import { axiosInst } from '@/src/api/axiosSetUp';
import { router, useLocalSearchParams } from 'expo-router';
import { FormValues } from '@/src/types/eventForm';

import { selectCurrentEvent } from '@/src/redux/events/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { getEventById } from '@/src/redux/events/actions';
import EventForm from '@/src/components/events/EventForm';

const EditEventPage = () => {
  // const router = useRouter();
  const { eventId } = useLocalSearchParams(); // Fetch eventId from the URL
  const currentEvent = useSelector(selectCurrentEvent);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!currentEvent) {
      dispatch(getEventById(eventId as string))
        .unwrap()
        .catch(() => {
          console.log('error')
        })
    }
  }, [currentEvent]);

  const initialValues = {
    name: currentEvent?.name || '',
    description: currentEvent?.description || '',
    eventType: currentEvent?.eventType || "LECTURE",
    tags: currentEvent?.tags || [],
    maxAttendees: currentEvent?.totalSeats || 0,
    targetAudience: currentEvent?.targetAudience || "ADULTS",
    isOnline: !!currentEvent?.isOnline || false,
    link: currentEvent?.isOnline || '',
    price: currentEvent?.price || 0,
    country: currentEvent?.location ? (typeof currentEvent?.location === 'string' ? currentEvent?.location : currentEvent?.location?.country) : '',
    city: currentEvent?.location ? (typeof currentEvent?.location === 'string' ? currentEvent?.location : currentEvent?.location?.city) : '',
    locationAddress: currentEvent?.location ? (typeof currentEvent?.location === 'string' ? currentEvent?.location : currentEvent?.location?.address) : '',
    place: currentEvent?.location ? (typeof currentEvent?.location === 'string' ? currentEvent?.location : currentEvent?.location?.place) : '',
    startTime: currentEvent?.startDate ? new Date(currentEvent.startDate) : new Date(),
    endTime: currentEvent?.endDate ? new Date(currentEvent.endDate) : new Date(),
    images: currentEvent?.images || [],
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log('in submit')
      const formData = new FormData();

      // Add text data
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('eventType', values.eventType);
      formData.append('targetAudience', values.targetAudience);
      formData.append('price', values.price.toString());
      formData.append('totalSeats', values.maxAttendees.toString());
      formData.append('tags', JSON.stringify(values.tags));

      if (values.isOnline) {
        formData.append('isOnline', values.link);
        formData.append(
          'location',
          JSON.stringify({})
        );
      } else {
        formData.append(
          'location',
          JSON.stringify({
            country: values.country,
            city: values.city,
            address: values.locationAddress,
            place: values.place,
          })
        );
      }

      formData.append('startDate', values.startTime.toISOString());
      formData.append('endDate', values.endTime.toISOString());

      // Add images asynchronously
      const imagePromises = values.images.map(async (uri, index) => {
        const blob = await fetch(uri).then((res) => res.blob());
        formData.append('images', blob, `image_${index}.jpg`);
      });

      await Promise.all(imagePromises);

      try {
        const response = await axiosInst.put(`/events/${eventId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        router.push(`/events/${eventId}`)
      } catch (err) {
        alert('Сталася помилка при створенні події!')
      }
    } catch (error) {
      console.error('Error while submitting:', error);
    }
  };

  return (
    <AuthGuard>
      <Container>
        <View>
          <EventForm initialValues={initialValues} handleSubmit={handleSubmit} title='Редагувати подію'></EventForm>
        </View>
      </Container>
    </AuthGuard>
  );
};

export default EditEventPage;


const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  datePickerButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePickerButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

