import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MultipleSelect from '../shared/MultipleSelect';
import { axiosInst } from '@/src/api/axiosSetUp';

const EventsFilters = () => {

    interface Item {
        label: string, value: string
    }
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [cities, setCities] = useState<Item[]>([]);

    const [time] = useState([
        { label: 'Минулі події', value: 'past' },
        { label: 'Сьогодні', value: 'today' },
        { label: 'Майбутні події', value: 'future' }
    ]);

    const transformCities = (cities: string[]) => {
        const citiesNew = cities.map((city, index) => {
            return {
                label: city, // Ensure unique key by using index or any unique value 
                value: city
            }
        });
        setCities(citiesNew)
    };

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await axiosInst.get('/events/cities', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
                transformCities(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCities();
    }, [])

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
