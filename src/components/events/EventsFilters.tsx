import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MultipleSelect from '../shared/MultipleSelect';
import { axiosInst } from '@/src/api/axiosSetUp';
import { AudienceOptions } from '@/src/constants/eventForm/audience';
import { EventTypeOptions } from '@/src/constants/eventForm/eventTypes';

const EventsFilters = ({ onFiltersChange }: { onFiltersChange: (filters: any) => void }) => {
    interface Item {
        label: string;
        value: string;
    }

    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
    const [selectedTargetAudience, setSelectedTargetAudience] = useState<string[]>([]);

    const [cities, setCities] = useState<Item[]>([]);
    const [eventTypes] = useState(EventTypeOptions);
    const [targetAudiences] = useState(AudienceOptions);
    const [time] = useState([
        { label: 'Минулі події', value: 'past' },
        { label: 'Сьогодні', value: 'today' },
        { label: 'Майбутні події', value: 'future' },
    ]);

    const transformCities = (cities: string[]) => {
        const citiesNew = cities.map((city) => ({
            label: city,
            value: city,
        }));
        citiesNew.unshift({ label: 'Онлайн', value: 'online' })
        setCities(citiesNew);
    };

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await axiosInst.get('/events/cities', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                transformCities(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getCities();
    }, []);

    useEffect(() => {
        // Call the parent callback whenever filters change
        onFiltersChange({
            locationFilter: selectedCities.join(','),
            timeFilter: selectedTime.join(','),
            eventType: selectedEventTypes.join(','),
            targetAudience: selectedTargetAudience.join(','),
        });

    }, [selectedCities, selectedTime, selectedEventTypes, selectedTargetAudience]);

    return (
        <View className="flex-1 justify-center py-4">
            <Text className="font-bold text-xl mb-4">Фільтри</Text>
            <View className="flex flex-row gap-1 flex-wrap">
                <MultipleSelect
                    title="Оберіть міста"
                    items={cities}
                    selectedItems={selectedCities}
                    setSelectedItems={setSelectedCities}
                />
                <MultipleSelect
                    title="Оберіть час"
                    items={time}
                    selectedItems={selectedTime}
                    setSelectedItems={setSelectedTime}
                />
                <MultipleSelect
                    title="Оберіть тип події"
                    items={eventTypes}
                    selectedItems={selectedEventTypes}
                    setSelectedItems={setSelectedEventTypes}
                />
                <MultipleSelect
                    title="Оберіть аудиторію"
                    items={targetAudiences}
                    selectedItems={selectedTargetAudience}
                    setSelectedItems={setSelectedTargetAudience}
                />
            </View>
        </View>
    );
};

export default EventsFilters;
