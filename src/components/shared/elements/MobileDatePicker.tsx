import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  initialDate: Date;
  setDate: (date: Date) => void;
  mode?: "date" | "datetime"
}

const MobileDatePicker = ({ initialDate, setDate, mode = "datetime" }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(new Date(date));
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
        mode={mode}
        date={initialDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default MobileDatePicker
