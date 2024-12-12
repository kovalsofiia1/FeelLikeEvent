import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import FormField from '../shared/FormField';
import CustomButton from '../shared/CustomButton';
import { Tag } from '@/src/redux/events/types';

interface Props {
  tagsList: string[],
  changeList: (val: string[]) => void
}

const TagsInput = ({ tagsList, changeList }: Props) => {
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>(tagsList);

  // Add a new tag
  const addTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag(''); // Clear the input field
      changeList([...tags, tag.trim()]);
    }
  };

  // Remove a tag by index
  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    changeList(newTags);
  };

  return (
    <View style={styles.container}>
      {/* Input and Add Button */}
      <Text className="text-base text-gray-500 pb-2">Додайте теги до події, щоб користувачі могли легше вас знайти</Text>
      <View className="flex flex-row gap-2 items-center pb-4">
        <FormField
          title="Тег"
          value={tag}
          placeholder="Введіть тег"
          keyboardType="default"
          handleChangeText={(val: string) => setTag(val)}
          otherStyles="flex-1" // Optional: Ensure FormField takes available space
        />
        <CustomButton onPress={addTag} additionalStyles='self-end'>Додати</CustomButton>
      </View>

      {/* List of Tags */}

      <ScrollView style={styles.tagList}>
        <View className='flex flex-row flex-wrap gap-2'>
          {tags.map((item, index) => (
            <View className="text-sm bg-blue-200 rounded-full px-2 py-1 text-gray-600 mr-2 min-w-8 text-center flex flex-row gap-1" key={item}>
              <Text style={styles.tagText}>{item}</Text>
              <TouchableOpacity onPress={() => removeTag(index)}>
                <Text className='font-bold text-gray-600'>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TagsInput;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tagList: {
    maxHeight: 90
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  tagText: {
    marginRight: 8,
    color: '#333',
  },
  deleteText: {
    color: '#f00',
    fontWeight: 'bold',
  },
});
