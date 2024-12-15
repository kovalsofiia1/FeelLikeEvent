// import React, { useState } from "react";
// import { Button, View, Text } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const MobileDateTimePickerComponent = ({ value, onChange }) => {
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const handleDateChange = (e, selectedDate) => {
//     const currentDate = selectedDate || value;
//     onChange({ ...value, date: currentDate }); // Set selected date
//     setShowDatePicker(false); // Close date picker
//   };

//   const handleTimeChange = (e, selectedTime) => {
//     const currentTime = selectedTime || value;
//     onChange({ ...value, time: currentTime }); // Set selected time
//     setShowTimePicker(false); // Close time picker
//   };

//   return (
//     <View>
//       <Text>Select Date and Time</Text>

//       {/* Date Picker Button */}
//       <Button title={`Pick Date: ${value.date.toLocaleDateString()}`} onPress={() => setShowDatePicker(true)} />
//       {showDatePicker && (
//         <DateTimePicker
//           value={value.date}
//           mode="date"
//           is24Hour={true}
//           onChange={handleDateChange}
//         />
//       )}

//       {/* Time Picker Button */}
//       <Button title={`Pick Time: ${value.time.toLocaleTimeString()}`} onPress={() => setShowTimePicker(true)} />
//       {showTimePicker && (
//         <DateTimePicker
//           value={value.time}
//           mode="time"
//           is24Hour={true}
//           onChange={handleTimeChange}
//         />
//       )}
//     </View>
//   );
// };

// export default MobileDateTimePickerComponent;



import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  initialDate: Date;
  setDate: (date: Date) => void;
}

const MobileDatePicker = ({ initialDate, setDate }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity
        onPress={showDatePicker}
      >
        <Text>{initialDate ? initialDate.toLocaleString('uk-UA') : 'Виберіть час'}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={initialDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default MobileDatePicker

// const styles = StyleSheet.create({})