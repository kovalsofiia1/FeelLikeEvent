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


const CreateEventPage = () => {
	const router = useRouter();
	// Handle image picking
	const handlePickImages = async (setFieldValue: any) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: false, // allows multiple images selection
		});

		if (!result.canceled) {
			setFieldValue('images', result.assets.map((asset) => asset.uri)); // Set images to Formik
		}
	};


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

		// Log FormData contents
		for (const [key, value] of formData.entries()) {
			console.log(`${key}:`, value);
		}

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
			console.log(err)
			alert('Сталася помилка при створенні події!')
			router.push(`/events`)
		}
	};

	return (
		<AuthGuard>
			<Container>
				<View>
					<Formik
						initialValues={{
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
						} as FormValues}
						validationSchema={eventValidationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
							<View style={styles.formContainer}>
								<Text style={styles.heading} className='font-bold text-blue-500'>Створити подію</Text>

								{/* Basic Info */}
								<View style={styles.section}>
									<FormField
										title="Назва"
										value={values.name}
										placeholder="Введіть назву події"
										handleChangeText={handleChange('name')}
										errorMessage={touched.name && errors.name}
									/>
									<FormField
										title="Опис події"
										value={values.description}
										placeholder="Опишіть вашу подію"
										handleChangeText={handleChange('description')}
										multiline
										numberOfLines={4}
										errorMessage={touched.description && errors.description}
									/>
								</View>

								<HorizontalLine></HorizontalLine>
								{/* Date Picker */}
								<View style={styles.section} className='relative z-20'>
									<Text className="text-base text-gray-500 pb-2">Час початку</Text>
									{Platform.OS === 'web' ? (
										<DatePicker
											selected={values.startTime}
											onChange={(date: Date | null) => setFieldValue('startTime', date)}
											showTimeSelect
											dateFormat="Pp"
											locale={uk} // Set Ukrainian locale
										/>
									) : (
										<TouchableOpacity
											style={styles.datePickerButton}
											onPress={() => { }}
										>
											<Text>{values.startTime ? values.startTime.toLocaleString('uk-UA') : 'Виберіть час початку'}</Text>
										</TouchableOpacity>
									)}

									<Text className="text-base text-gray-500 pb-2">Час закінчення</Text>
									{Platform.OS === 'web' ? (
										<DatePicker
											selected={values.endTime}
											onChange={(date: Date | null) => setFieldValue('endTime', date)}
											showTimeSelect
											dateFormat="Pp"
											locale={uk}
										/>
									) : (
										<TouchableOpacity
											style={styles.datePickerButton}
											onPress={() => { }}
										>
											<Text>{values.endTime ? values.endTime.toLocaleString('uk-UA') : 'Виберіть час закінчення'}</Text>

											{/* {showStartTimePicker && (
													<DateTimePicker
														value={values.startTime || new Date()}
														mode="datetime"
														is24Hour={true}
														display="default"
														onChange={(e, selectedDate) => {
															setFieldValue('startTime', selectedDate || values.startTime);
															setShowStartTimePicker(false);
														}}
													/>
												)} */}
										</TouchableOpacity>

									)}
								</View>
								<HorizontalLine></HorizontalLine>
								{/* Event Type */}
								<View style={styles.section}>
									<Text className="text-base text-gray-500 pb-2">Тип події</Text>
									<Picker
										selectedValue={values.eventType}
										onValueChange={handleChange('eventType')}
									>
										{EventTypeOptions.map((event) => (
											<Picker.Item key={event.value} label={event.label} value={event.value} />
										))}
									</Picker>
									{touched.eventType && errors.eventType && <Text style={styles.errorText}>{errors.eventType}</Text>}
								</View>

								{/* Audience Picker */}
								<View style={styles.section}>
									<Text className="text-base text-gray-500 pb-2">Цільова аудиторія</Text>
									<Picker
										selectedValue={values.targetAudience}
										onValueChange={handleChange('targetAudience')}
									>
										{AudienceOptions.map((audience) => (
											<Picker.Item key={audience.value} label={audience.label} value={audience.value} />
										))}
									</Picker>
									{touched.targetAudience && errors.targetAudience && <Text style={styles.errorText}>{errors.targetAudience}</Text>}
								</View>


								{/* Price Field */}
								<View style={styles.section}>
									<FormField
										title="Ціна"
										value={values.price.toString()}
										placeholder="Введіть ціну"
										keyboardType="numeric"
										handleChangeText={handleChange('price')}
										errorMessage={touched.price && errors.price}
									/>
								</View>
								{/* Attendies Field */}
								<View style={styles.section}>
									<FormField
										title="Кількість відвідувачів"
										value={values.maxAttendees.toString()}
										placeholder="Введіть кількість осіб"
										keyboardType="numeric"
										handleChangeText={handleChange('maxAttendees')}
										errorMessage={touched.maxAttendees && errors.maxAttendees}
									/>
								</View>
								<HorizontalLine></HorizontalLine>
								{/* Online Event Switch */}
								<View style={styles.section}>
									<Text className="text-base text-gray-500 pb-2">Онлайн подія</Text>
									<Switch
										value={values.isOnline}
										onValueChange={(value: boolean) => {
											setFieldValue('isOnline', value); // Just update the form value
										}}
									/>
									{/* Link field - only show if the event is online */}
									{values.isOnline && (
										<View style={styles.section}>
											<FormField
												title="Посилання на подію"
												value={values.link}
												placeholder="Введіть посилання на подію"
												handleChangeText={handleChange('link')}
												errorMessage={touched.link && errors.link}
											/>
										</View>
									)}
								</View>
								{/* Location Info - Hide if event is online */}
								{!values.isOnline && (
									<View style={styles.section}>
										<FormField
											title="Країна"
											value={values.country}
											placeholder="Введіть країну"
											handleChangeText={handleChange('country')}
											errorMessage={touched.country && errors.country}
										/>
										<FormField
											title="Місто"
											value={values.city}
											placeholder="Введіть місто"
											handleChangeText={handleChange('city')}
											errorMessage={touched.city && errors.city}
										/>
										<FormField
											title="Адреса"
											value={values.locationAddress}
											placeholder="Введіть адресу"
											handleChangeText={handleChange('locationAddress')}
											errorMessage={touched.locationAddress && errors.locationAddress}
										/>
										<FormField
											title="Місце проведення"
											value={values.place}
											placeholder="Введіть назву місця"
											handleChangeText={handleChange('place')}
											errorMessage={touched.place && errors.place}
										/>
									</View>
								)}
								<HorizontalLine></HorizontalLine>
								{/* Image Upload */}
								<View style={styles.section}>
									<Text className="text-base text-gray-500 pb-2">Завантажити зображення</Text>
									{/* <TouchableOpacity
										style={styles.imagePickerButton}
										onPress={() => handlePickImages(setFieldValue)}
									>
										<Text style={styles.imagePickerText}>Вибрати зображення</Text>
									</TouchableOpacity> */}
									<CustomButton onPress={() => handlePickImages(setFieldValue)} isActive={false}>Вибрати зображення</CustomButton>
									{values.images.length > 0 && (
										<View style={styles.imagePreviewContainer}>
											{values.images.map((imageUri, index) => (
												<Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
											))}
										</View>
									)}
								</View>

								<CustomButton onPress={handleSubmit}>Створити подію</CustomButton>
							</View>
						)}
					</Formik>
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
