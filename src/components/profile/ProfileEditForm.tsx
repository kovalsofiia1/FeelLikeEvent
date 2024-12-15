import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "../shared/FormField";
import TagsInput from "../events/TagsInput";
import CustomButton from "../shared/CustomButton";
import { User } from "@/src/redux/user/types";
import { PHONE_PATTERN } from "@/src/constants/patterns";
// import { uk } from "date-fns/locale";
// import DatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // For web
import { uk } from "date-fns/locale";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // For mobile
import * as ImagePicker from 'expo-image-picker';
import { DEFAULT_EVENT_IMAGE } from "@/src/constants/defaultImagePath";


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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleDateChange = (date: Date | null, setFieldValue: any) => {
    setFieldValue("dateOfBirth", date);
  };

  const handleConfirmDate = (date: Date, setFieldValue: any) => {
    setFieldValue("dateOfBirth", date);
    setDatePickerVisibility(false);
  };


  const handlePickImages = async (setFieldValue: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setFieldValue('avatarURL', imageUri);
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
        <View className="p-5 max-w-[600px] w-full ml-auto mr-auto flex gap-4">
          <Text className="font-bold text-blue-500 text-xl mb-4">Редагування профілю</Text>

          <View className="ml-auto mr-auto">
            <Image
              source={values.avatarURL ? { uri: values.avatarURL } : { uri: DEFAULT_EVENT_IMAGE }}
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
                onChange={(date) => handleDateChange(date, setFieldValue)}
                dateFormat="P"
                locale={uk}
                showMonthDropdown
                showYearDropdown
              />
            ) : (
              // Mobile Date Picker
              <View>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setDatePickerVisibility(true)}
                >
                  <Text>
                    {values.dateOfBirth ? values.dateOfBirth.toLocaleString("uk-UA") : "Виберіть дату народження"}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={new Date(values.dateOfBirth)}
                  onConfirm={(date) => handleConfirmDate(date, setFieldValue)}
                  onCancel={() => setDatePickerVisibility(false)}
                />
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
