// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import MultipleSelect from '../shared/MultipleSelect';
// import { axiosInst } from '@/src/api/axiosSetUp';

// const EventsFilters = () => {

//     interface Item {
//         label: string, value: string
//     }
//     const [selectedCities, setSelectedCities] = useState<string[]>([]);
//     const [selectedTime, setSelectedTime] = useState<string[]>([]);
//     const [cities, setCities] = useState<Item[]>([]);

//     const [time] = useState([
//         { label: 'Минулі події', value: 'past' },
//         { label: 'Сьогодні', value: 'today' },
//         { label: 'Майбутні події', value: 'future' }
//     ]);

//     const transformCities = (cities: string[]) => {
//         const citiesNew = cities.map((city, index) => {
//             return {
//                 label: city, // Ensure unique key by using index or any unique value
//                 value: city
//             }
//         });
//         setCities(citiesNew)
//     };

//     useEffect(() => {
//         const getCities = async () => {
//             try {
//                 const response = await axiosInst.get('/events/cities', {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 console.log(response);
//                 transformCities(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         getCities();
//     }, [])

//     return (
//         <View className="flex-1 justify-center py-4 bg-gray-100">
//             <Text className="font-bold text-xl mb-4">Фільтри</Text>
//             <View className='flex flex-row gap-1 flex-wrap'>
//                 <MultipleSelect
//                     title={"Оберіть міста"}
//                     items={cities}
//                     selectedItems={selectedCities}
//                     setSelectedItems={setSelectedCities}
//                 />
//                 <MultipleSelect
//                     title={"Оберіть час"}
//                     items={time}
//                     selectedItems={selectedTime}
//                     setSelectedItems={setSelectedTime}
//                 />
//             </View>


//         </View>
//     );
// };

// export default EventsFilters;

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MultipleSelect from '../shared/MultipleSelect';
import { axiosInst } from '@/src/api/axiosSetUp';

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
    const [eventTypes] = useState([
        { label: 'Музика', value: 'music' },
        { label: 'Мистецтво', value: 'art' },
        { label: 'Спорт', value: 'sport' },
    ]);
    const [targetAudiences] = useState([
        { label: 'Дорослі', value: 'adults' },
        { label: 'Діти', value: 'kids' },
        { label: 'Сімейні', value: 'family' },
    ]);
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
        console.log({
            locationFilter: selectedCities.join(','),
            timeFilter: selectedTime.join(','),
            eventType: selectedEventTypes.join(','),
            targetAudience: selectedTargetAudience.join(','),
        })
        // Call the parent callback whenever filters change
        onFiltersChange({
            locationFilter: selectedCities.join(','),
            timeFilter: selectedTime.join(','),
            eventType: selectedEventTypes.join(','),
            targetAudience: selectedTargetAudience.join(','),
        });

    }, [selectedCities, selectedTime, selectedEventTypes, selectedTargetAudience]);

    return (
        <View className="flex-1 justify-center py-4 bg-gray-100">
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
