// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
// import FormField from "../shared/FormField";
// import TagsInput from "../events/TagsInput";
// import { User } from "@/src/redux/user/types";
// import CustomButton from "../shared/CustomButton";

// type ProfileEditFormProps = {
//   userProfile: User;
//   onSave: (updatedProfile: any) => void;
//   onCancel: () => void;
// };

// const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
//   userProfile,
//   onSave,
//   onCancel,
// }) => {
//   const [editedProfile, setEditedProfile] = useState(userProfile);

//   const handleInputChange = (field: keyof typeof userProfile, value: string | string[]) => {
//     setEditedProfile({ ...editedProfile, [field]: value });
//   };

//   return (
//     <View style={styles.container}>
//       <Text className='font-bold text-blue-500 text-xl mb-4'>Редагування профілю</Text>
//       <View className="ml-auto mr-auto">
//         <Image source={{ uri: userProfile?.avatarURL || '' }} className="border w-[200px] h-[200px] rounded-xl mb-4" />
//         <CustomButton onPress={() => { }}>Змінити фото профілю</CustomButton>
//       </View>
//       <FormField
//         title={"Ім'я"}
//         value={editedProfile.name}
//         handleChangeText={(text) => handleInputChange("name", text)}
//       />
//       <FormField
//         title={"Про мене"}
//         value={editedProfile.description || ''}
//         handleChangeText={(text) => handleInputChange("description", text)}
//       />
//       <FormField
//         title={"Дата народження"}
//         value={editedProfile.dateOfBirth || ''}
//         handleChangeText={(text) => handleInputChange("dateOfBirth", text)}
//       />

//       <FormField
//         title={"Email"}
//         value={editedProfile.email}
//         handleChangeText={(text) => handleInputChange("email", text)}
//       />

//       {/* <Text style={styles.label}>Interests:</Text> */}
//       <TagsInput tagsList={editedProfile.interests} showMessage={false} title="Інтереси" changeList={(list) => handleInputChange(
//         "interests",
//         list
//       )} />


//       <View style={styles.buttonContainer}>
//         <CustomButton onPress={onCancel} isActive={false}>Відмінити</CustomButton>
//         <CustomButton onPress={() => onSave(editedProfile)}>Зберегти</CustomButton>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   label: {
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     flexDirection: "row",
//     gap: 8,
//     justifyContent: "flex-end",
//   },
// });

// export default ProfileEditForm;


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

// Регулярний вираз для номера телефону (приклад для українських номерів)
const phonePattern = /^(?:\+380\d{9}|\d{10})$/;

// Валідація з використанням Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Ім'я обов'язкове"),
  description: Yup.string(),
  dateOfBirth: Yup.date().optional().max(new Date(), "Дата народження не може бути в майбутньому"),
  email: Yup.string().email("Невірний формат електронної пошти").required("Email обов'язковий"),
  phoneNumber: Yup.string().matches(PHONE_PATTERN, "Невірний номер телефону").required("Номер телефону обов'язковий"),
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
  const [selectedDate, setSelectedDate] = useState(userProfile.dateOfBirth || new Date());

  const handleDateChange = (date: Date | null, setFieldValue: any) => {
    if (date) {
      setSelectedDate(date);
    }
    setFieldValue("dateOfBirth", date);
  };

  const handleConfirmDate = (date: Date, setFieldValue: any) => {
    setFieldValue("dateOfBirth", date);
    setDatePickerVisibility(false);
  };


  return (
    <Formik
      initialValues={{
        name: userProfile.name || '',
        description: userProfile.description || '',
        dateOfBirth: userProfile.dateOfBirth || '',
        email: userProfile.email || '',
        phoneNumber: userProfile.phoneNumber || '',
        interests: userProfile.interests || [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSave(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text className="font-bold text-blue-500 text-xl mb-4">Редагування профілю</Text>
          <View className="ml-auto mr-auto">
            <Image source={{ uri: userProfile?.avatarURL || '' }} className="border w-[200px] h-[200px] rounded-xl mb-4" />
            <CustomButton onPress={() => { }}>Змінити фото профілю</CustomButton>
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

          <Text className="text-base text-gray-500 pb-2">Дата народження</Text>
          {Platform.OS === "web" ? (
            // Web Date Picker
            <DatePicker
              selected={new Date(selectedDate)}
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
                  {selectedDate ? selectedDate.toLocaleString("uk-UA") : "Виберіть дату народження"}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={new Date(selectedDate)}
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
            <CustomButton onPress={handleSubmit}>Зберегти</CustomButton>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
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
