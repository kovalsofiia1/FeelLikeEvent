import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/src/components/shared/CustomButton';
import AuthGuard from '@/src/components/auth/AuthGuard';
import Container from '@/src/components/shared/Container';
import FormField from '@/src/components/shared/FormField';
import DatePicker from 'react-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uk } from 'date-fns/locale';
import HorizontalLine from '@/src/components/shared/elements/HorizontalLine';
import { axiosInst } from '@/src/api/axiosSetUp';
import { useRouter } from 'expo-router';
import { AudienceOptions } from '@/src/constants/eventForm/audience';
import { EventTypeOptions } from '@/src/constants/eventForm/eventTypes';
import { FormValues } from '@/src/types/eventForm';

import { eventValidationSchema } from '@/src/types/eventForm';
import EventForm from '@/src/components/events/EventForm';


const CreateEventPage = () => {
	const router = useRouter();


	const handleSubmit = async (values: FormValues) => {
		const formData = new FormData();

		// Add text data
		formData.append('name', values.name);
		formData.append('description', values.description);
		formData.append('eventType', values.eventType);
		formData.append('targetAudience', values.targetAudience);
		formData.append('price', values.price.toString());
		formData.append('totalSeats', values.maxAttendees.toString());
		formData.append('tags', JSON.stringify(values.tags)); // Properly append tags

		if (values.isOnline) {
			// formData.append('isOnline', 'true'); // Set true/false explicitly
			formData.append('isOnline', values.link);
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

		// Submit data
		try {
			const response = await axiosInst.post('/events', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const eventId = response.data.event._id as string;
			router.push(`/events/${eventId}`)
		} catch (err) {
			alert('Сталася помилка при створенні події!')
		}
	};

	const initialValues = {
		name: '',
		description: '',
		eventType: 'LECTURE',
		tags: [],
		maxAttendees: 0,
		targetAudience: 'ADULTS',
		isOnline: false,
		address: '',
		price: 0,
		country: '',
		city: '',
		locationAddress: '',
		place: '',
		startTime: new Date(),
		endTime: new Date(),
		images: [],
		link: '',
	} as FormValues;

	return (
		<AuthGuard>
			<Container>
				<View>
					<EventForm initialValues={initialValues} handleSubmit={handleSubmit} title='Створити подію'></EventForm>
				</View>
			</Container>
		</AuthGuard>
	);
};

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

export default CreateEventPage;
