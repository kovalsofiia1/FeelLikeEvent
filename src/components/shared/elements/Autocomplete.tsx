import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing Ionicons

interface AutocompleteProps {
  data: string[];
  onSelect: (item: string) => void;
  placeholder?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ data, onSelect, placeholder }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState<string[]>(data);
  const [isListVisible, setIsListVisible] = useState(false); // State for controlling list visibility

  const handleInputChange = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]); // Hide suggestions if query is empty
    }
  };

  const onFocus = () => {
    setIsListVisible(true); // Show the list when the input is focused
    if (query.length === 0) {
      setFilteredData(data); // Show all cities when input is focused and empty
    } else {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setFilteredData([]); // Hide suggestions after selection
    setIsListVisible(false); // Close the list after selecting an item
    onSelect(item);
  };

  const toggleListVisibility = () => {
    setIsListVisible(prevState => !prevState); // Toggle the visibility of the list
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Type something...'}
          value={query}
          onChangeText={handleInputChange}
          onFocus={onFocus}
        />
        <TouchableOpacity onPress={toggleListVisibility} style={styles.iconContainer}>
          <Ionicons
            name={isListVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {isListVisible && filteredData.length > 0 && (
        <View style={styles.list}>
          {filteredData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 100
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    flex: 1,
  },
  iconContainer: {
    marginLeft: 10,
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{ translateX: -50 }, { translateY: -50 }]
  },
  list: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '100%',
    zIndex: 30,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default Autocomplete;
