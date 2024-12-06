import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MultipleSelect from '../shared/MultipleSelect';

const EventsFilters = () => {
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [cities] = useState([
        { label: 'Kyiv', value: 'kyiv' },
        { label: 'Lviv', value: 'lviv' },
        { label: 'Odessa', value: 'odessa' },
        { label: 'Kharkiv', value: 'kharkiv' },
    ]);

    const [time] = useState([
        { label: 'Минулі події', value: 'past' },
        { label: 'Сьогодні', value: 'today' },
        { label: 'Майбутні події', value: 'future' }
    ]);
    return (
        <View className="flex-1 justify-center py-4 bg-gray-100">
            <Text className="font-bold text-xl mb-4">Фільтри</Text>
            <View className='flex flex-row gap-1 flex-wrap'>
                <MultipleSelect
                    title={"Оберіть міста"}
                    items={cities}
                    selectedItems={selectedCities}
                    setSelectedItems={setSelectedCities}
                />
                <MultipleSelect
                    title={"Оберіть час"}
                    items={time}
                    selectedItems={selectedTime}
                    setSelectedItems={setSelectedTime}
                />
            </View>


        </View>
    );
};

export default EventsFilters;
