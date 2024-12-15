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