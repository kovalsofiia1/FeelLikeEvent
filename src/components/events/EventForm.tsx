import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/src/components/shared/CustomButton';
import FormField from '@/src/components/shared/FormField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uk } from 'date-fns/locale';
import HorizontalLine from '@/src/components/shared/elements/HorizontalLine';
import { AudienceOptions } from '@/src/constants/eventForm/audience';
import { EventTypeOptions } from '@/src/constants/eventForm/eventTypes';
import TagsInput from './TagsInput';
import { FormValues } from '@/src/types/eventForm';
import { isWeb } from '@/src/utils/storage';
import MobileDatePicker from '../shared/elements/MobileDatePicker';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Це поле є обов’язковим'),
  description: Yup.string().required('Це поле є обов’язковим'),
  eventType: Yup.string().required('Виберіть тип події'),
  targetAudience: Yup.string().required('Виберіть цільову аудиторію'),
  price: Yup.number().required('Введіть ціну').min(0, 'Ціна не може бути від’ємною'),
  maxAttendees: Yup.number().required('Введіть кількість місць').min(1, 'Кількість місць не може бути меншою 1'),
  country: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  city: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  locationAddress: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  place: Yup.string().test('required-if-not-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (!isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),
  link: Yup.string().url().test('required-if-online', 'Це поле є обов’язковим', function (value) {
    const { isOnline } = this.parent;
    if (isOnline && !value) {
      return this.createError({ message: 'Це поле є обов’язковим' });
    }
    return true;
  }),

  startTime: Yup.date().required('Виберіть час початку').min(new Date(), 'Час початку не може бути в минулому'),
  endTime: Yup.date()
    .required('Виберіть час закінчення')
    .min(Yup.ref('startTime'), 'Час закінчення має бути пізніше часу початку'),
});


interface Props {
  initialValues: FormValues;
  handleSubmit: (values: FormValues) => Promise<void>;
  title: string;
}


const EventForm = ({ initialValues, handleSubmit, title }: Props) => {

  const handlePickImages = async (setFieldValue: any) => {
    try {
      // Request permissions explicitly
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert('Permission to access media library is required!');
        return;
      }

      let result;


      if (isWeb) {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use MediaType as an array
          allowsEditing: true,                       // Optional: enable editing
          aspect: [4, 3],                            // Aspect ratio for cropping
          quality: 1,                                // Image quality
        });
      }
      else {
        result = await ImagePicker.launchImageLibraryAsync({
          // mediaTypes: ImagePicker.MediaType.Image,// Correct usage for images
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
      // Handle the result
      if (!result.canceled && result.assets?.length > 0) {
        const selectedUri = result.assets[0].uri;
        setFieldValue('images', [selectedUri]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('An error occurred while picking the image. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={initialValues as FormValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 100, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, paddingBottom: 100, marginBottom: 16, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }} >
          <Text style={styles.heading} className='font-bold text-blue-500'>{title}</Text>

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

          {/* Time Pickers */}
          {/* Start Time Picker */}
          <Text className="text-base text-gray-500 pb-2">Час початку</Text>
          {Platform.OS === 'web' ? (
            // Web DatePicker component
            <DatePicker
              selected={values.startTime}
              onChange={(date) => setFieldValue('startTime', date)}
              showTimeSelect
              dateFormat="Pp"
              locale={uk}
            />
          ) : (
            <MobileDatePicker initialDate={values.startTime} setDate={(date) => setFieldValue('startTime', date)} />
          )}

          {touched.startTime && errors.startTime && (
            <Text style={{ color: 'red' }}>
              {String(errors.startTime)}
            </Text>
          )}

          {/* End Time Picker */}
          <Text className="text-base text-gray-500 pb-2">Час закінчення</Text>
          {Platform.OS === 'web' ? (
            // Web DatePicker component
            <DatePicker
              selected={values.endTime}
              onChange={(date) => setFieldValue('endTime', date)}
              showTimeSelect
              dateFormat="Pp"
              locale={uk}
            />
          ) : (
            <MobileDatePicker initialDate={values.endTime} setDate={(date) => setFieldValue('endTime', date)}></MobileDatePicker>
          )}

          {touched.endTime && errors.endTime && (
            <Text style={{ color: 'red' }}>
              {String(errors.endTime)}
            </Text>
          )}



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

          <TagsInput
            tagsList={values.tags}
            changeList={(value: string[]) => {
              setFieldValue('tags', value)

            }}
          ></TagsInput>

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
            <CustomButton onPress={() => handlePickImages(setFieldValue)} isActive={false}>Вибрати зображення</CustomButton>
            {values.images.length > 0 && (
              <View style={styles.imagePreviewContainer}>
                {values.images.map((imageUri, index) => (
                  <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
                ))}
              </View>
            )}
          </View>

          <CustomButton onPress={() => { handleSubmit() }}>{title}</CustomButton>
        </View>
      )}
    </Formik>
  )
}

export default EventForm

const styles = StyleSheet.create({
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
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});


