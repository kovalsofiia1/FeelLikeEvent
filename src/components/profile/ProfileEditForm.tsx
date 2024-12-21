import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "../shared/FormField";
import TagsInput from "../events/TagsInput";
import CustomButton from "../shared/CustomButton";
import { User } from "@/src/redux/user/types";
import { PHONE_PATTERN } from "@/src/constants/patterns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // For web
import { uk } from "date-fns/locale";
import * as ImagePicker from 'expo-image-picker';
import { DEFAULT_AVATAR_IMAGE, DEFAULT_EVENT_IMAGE } from "@/src/constants/defaultImagePath";
import { isWeb } from "@/src/utils/storage";
import MobileDatePicker from "../shared/elements/MobileDatePicker";


// Валідація з використанням Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ім'я обов'язкове"),
  description: Yup.string(),
  dateOfBirth: Yup.date().optional().max(new Date(), "Дата народження не може бути в майбутньому"),
  email: Yup.string().email("Невірний формат електронної пошти").required("Email обов'язковий"),
  phoneNumber: Yup.string().matches(PHONE_PATTERN, "Невірний номер телефону"),
  interests: Yup.array().min(1, "Має бути хоча б один інтерес"),
});

type ProfileEditFormProps = {
  userProfile: User;
  onSave: (updatedProfile: any) => void;
  onCancel: () => void;
};

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  userProfile,
  onSave,
  onCancel,
}) => {

  const handleDateChange = (date: Date | null, setFieldValue: any) => {
    setFieldValue("dateOfBirth", date);
  };

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
          aspect: [3, 3],                            // Aspect ratio for cropping
          quality: 1,                                // Image quality
        });
      }
      else {
        result = await ImagePicker.launchImageLibraryAsync({
          // mediaTypes: ImagePicker.MediaType.Image,// Correct usage for images
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
      }
      // Handle the result
      if (!result.canceled && result.assets?.length > 0) {
        const selectedUri = result.assets[0].uri;
        setFieldValue('avatarURL', selectedUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('An error occurred while picking the image. Please try again.');
    }
  };

  return (
    <Formik
      initialValues={{
        name: userProfile.name || '',
        description: userProfile.description || '',
        dateOfBirth: userProfile.dateOfBirth || new Date(),
        email: userProfile.email || '',
        phoneNumber: userProfile.phoneNumber || '',
        interests: userProfile.interests || [],
        avatarURL: userProfile.avatarURL || ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSave(values)}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View className="p-5 max-w-[600px] w-full ml-auto mr-auto flex gap-4" style={styles.container}>
          <Text className="font-bold text-blue-500 text-xl mb-4">Редагування профілю</Text>

          <View className="ml-auto mr-auto">
            <Image
              source={values.avatarURL ? { uri: values.avatarURL } : { uri: DEFAULT_AVATAR_IMAGE }}
              className="w-[200px] h-[200px] rounded-3xl mb-4"
            />
            <CustomButton onPress={() => handlePickImages(setFieldValue)} isActive={true}>
              Вибрати зображення
            </CustomButton>
          </View>

          <FormField
            title={"Ім'я"}
            value={values.name}
            handleChangeText={handleChange("name")}
            errorMessage={touched.name && errors.name}
          />

          <FormField
            title={"Про мене"}
            placeholder="Розкажіть щось про себе"
            value={values.description}
            handleChangeText={handleChange("description")}
            errorMessage={touched.description && errors.description}
          />

          <View className="relative z-20">
            <Text className="text-base text-gray-500 pb-2">Дата народження</Text>
            {Platform.OS === "web" ? (
              // Web Date Picker
              <DatePicker
                selected={new Date(values.dateOfBirth)}
                onChange={(date) => { console.log(date); handleDateChange(date, setFieldValue) }}
                dateFormat="P"
                locale={uk}
                showMonthDropdown
                showYearDropdown
              />
            ) : (
              // Mobile Date Picker

              <View>
                <MobileDatePicker initialDate={new Date(values.dateOfBirth)} setDate={(date) => setFieldValue('dateOfBirth', date)} mode="date" />
              </View>
            )}
            {touched.dateOfBirth && errors.dateOfBirth && (
              <Text style={{ color: 'red' }}>
                {String(errors.dateOfBirth)}
              </Text>
            )}
          </View>

          <FormField
            title={"Email"}
            value={values.email}
            handleChangeText={handleChange("email")}
            errorMessage={touched.email && errors.email}
          />

          <FormField
            title={"Номер телефону"}
            value={values.phoneNumber}
            placeholder="+380"
            handleChangeText={handleChange("phoneNumber")}
            errorMessage={touched.phoneNumber && errors.phoneNumber}
          />

          <TagsInput
            tagsList={values.interests}
            showMessage={false}
            title="Інтереси"
            changeList={(list) => setFieldValue("interests", list)}
          />

          <View style={styles.buttonContainer}>
            <CustomButton onPress={onCancel} isActive={false}>Відмінити</CustomButton>
            <CustomButton onPress={() => onSave(values)}>Зберегти</CustomButton>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default ProfileEditForm;
