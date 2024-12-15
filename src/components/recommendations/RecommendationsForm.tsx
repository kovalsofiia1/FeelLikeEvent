import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Checkbox from 'expo-checkbox';
import { EventTypeOptions } from '@/src/constants/eventForm/eventTypes';
// import Autocomplete from 'react-native-autocomplete-input';
import Autocomplete from '../shared/elements/Autocomplete';
import { AudienceOptions } from '@/src/constants/eventForm/audience';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // For web
import { uk } from "date-fns/locale";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // For mobile
import CustomButton from '../shared/CustomButton';
import { axiosInst } from '@/src/api/axiosSetUp';

const RecommendationsForm = ({ onSearchSubmit }: { onSearchSubmit: (formData: any) => void }) => {
  const [mood, setMood] = useState('');
  const [dateOption, setDateOption] = useState('');
  const [specificDate, setSpecificDate] = useState<Date | null>(null);
  // const [location, setLocation] = useState('');
  const [online, setOnline] = useState(false);
  const [ageGroup, setAgeGroup] = useState('');
  const [priceOption, setPriceOption] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    console.log('Selected location:', location);
  };


  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await axiosInst.get('/events/cities', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCities();
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSpecificDate(date);
  };

  const handleConfirmDate = (date: Date) => {
    setSpecificDate(date); // Update the state with the selected date
    setDatePickerVisibility(false); // Close the picker
  };

  const handleSubmit = () => {
    const formData: any = {};

    if (mood) {
      formData.mood = mood;
    }

    if (dateOption) {
      formData.dateOption = dateOption;
    }

    if (specificDate) {
      formData.specificDate = specificDate;
    }

    if (selectedLocation) {
      formData.selectedLocation = selectedLocation;
    }

    if (online !== undefined) {  // Check for undefined, assuming online can be false
      formData.online = online;
    }

    if (ageGroup) {
      formData.ageGroup = ageGroup;
    }

    if (priceOption) {
      formData.priceOption = priceOption;
    }

    // Pass form data to parent component
    onSearchSubmit(formData);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Як ви себе почуваєте?</Text>
      <RNPickerSelect
        onValueChange={(value) => setMood(value)}
        items={[
          { label: 'Щасливий', value: 'HAPPY' },
          { label: 'Нейтральний', value: 'NEUTRAL' },
          { label: 'Сумний - Спокійний', value: 'SAD' },
        ]}
        placeholder={{ label: 'Оберіть ваш настрій', value: '' }}
        // value={'HAPPY'}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Коли ви хочете відвідати подію?</Text>
      <RNPickerSelect
        onValueChange={(value) => { setDateOption(value); setSpecificDate(null) }}
        items={[
          { label: 'Сьогодні', value: 'TODAY' },
          { label: 'Завтра', value: 'TOMORROW' },
          { label: 'Цього тижня', value: 'THIS_WEEK' },
          { label: 'Конкретний день', value: 'SPECIFIC_DATE' },
        ]}
        // value={specificDate ? 'specific_date' : ''}
        placeholder={{ label: 'Оберіть дату', value: '' }}
        style={pickerSelectStyles}
      />
      {(dateOption === 'SPECIFIC_DATE' || specificDate) && (
        <View className='relative z-30 pt-2'>
          {Platform.OS === "web" ? (
            // Web Date Picker
            <DatePicker
              selected={specificDate}
              onChange={(date) => handleDateChange(date)} // Pass the selected date to the state handler
              dateFormat="P"
              locale={uk}
              placeholderText='Оберіть дату'
              showMonthDropdown
              minDate={new Date()}
            />
          ) : (
            // Mobile Date Picker
            <View>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text>
                  {specificDate ? specificDate.toLocaleString("uk-UA") : "Виберіть дату"}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={specificDate || new Date()} // Use specificDate directly
                onConfirm={(date) => handleConfirmDate(date)}
                onCancel={() => setDatePickerVisibility(false)}
                minimumDate={new Date()}
              />

            </View>
          )
          }
        </View>
      )
      }

      <Text style={styles.label}>Де ви хочете відвідати подію?</Text>
      <Autocomplete
        data={cities}
        onSelect={handleLocationSelect}
        placeholder="Оберіть місто"
      />
      <View style={styles.checkboxContainer}>
        <Checkbox value={online} onValueChange={setOnline} />
        <Text style={styles.checkboxLabel}>Розглядаю події онлайн</Text>
      </View>

      <Text style={styles.label}>Вкажіть категорію до якої ви належите:</Text>
      <RNPickerSelect
        onValueChange={(value) => setAgeGroup(value)}
        items={AudienceOptions}
        value={''}
        placeholder={{ label: 'Оберіть свою категорію', value: '' }}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Який ціновий діапазон вас цікавить?</Text>
      <RNPickerSelect
        onValueChange={(value) => setPriceOption(value)}
        items={[
          { label: 'Безкоштовні події', value: 'FREE' },
          { label: 'Платні події', value: 'PAID' },
        ]}
        placeholder={{ label: 'Оберіть ціновий діапазон', value: '' }}
        style={pickerSelectStyles}
      />

      <CustomButton onPress={handleSubmit} additionalStyles='self-center mt-4'>Знайти події для мене</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 16
  },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginVertical: 10, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkboxLabel: { marginLeft: 10 },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

const pickerSelectStyles = {
  inputIOS: { fontSize: 16, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, color: '#000', marginBottom: 10 },
  inputAndroid: { fontSize: 16, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, color: '#000', marginBottom: 10 },
};

export default RecommendationsForm;
