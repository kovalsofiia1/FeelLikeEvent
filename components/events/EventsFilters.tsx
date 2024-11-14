import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const EventsFilters = () => {
    const [open, setOpen] = useState(false);
    const [selectedCities, setSelectedCities] = useState([]);
    const [items, setItems] = useState([
        { label: 'Kyiv', value: 'kyiv' },
        { label: 'Lviv', value: 'lviv' },
        { label: 'Odessa', value: 'odessa' },
        { label: 'Kharkiv', value: 'kharkiv' },
    ]);

    return (
        <View className="flex-1 justify-center items-center p-4 bg-gray-100">
            <Text className="font-bold text-xl mb-4">Filters</Text>
            <DropDownPicker
                open={open}
                value={selectedCities}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedCities}
                setItems={setItems}
                multiple={true}
                mode="BADGE"
                badgeColors="#2196F3"
                badgeTextStyle={{ color: 'white' }}
                style={{
                    backgroundColor: '#FAFAFA',
                    borderBlockColor: 'grey',
                    minHeight: 30,
                    width: 150,
                    borderRadius: 14,
                    zIndex: open ? 1000 : 1,  // Set high zIndex when open
                }}
                textStyle={{ color: 'black' }}
                dropDownContainerStyle={{
                    backgroundColor: '#1E3A8A',
                    zIndex: open ? 1000 : 1,
                }}
                listMode="MODAL" // Or "MODAL" to avoid stacking issues
            />
            <Text className="mt-2 text-black">Selected Cities: {selectedCities.join(', ')}</Text>
        </View>
    );
};

export default EventsFilters;
