import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthGuard from '@/src/components/auth/AuthGuard'
import Container from '@/src/components/shared/Container'
import RecommendationsForm from '@/src/components/recommendations/RecommendationsForm'
import CustomButton from '@/src/components/shared/CustomButton'
import EventList from '@/src/components/events/EventList'
import { Event } from '@/src/redux/events/types'
import { axiosInst } from '@/src/api/axiosSetUp'

const Recommendations = () => {
    const [searchResults, setSearchResults] = useState<Event[]>([]);
    const [showForm, setShowForm] = useState(true);
    // Function to handle the form submission and set the results
    const handleSearchSubmit = async (data: any) => {
        console.log('Search Data:', data);
        // Simulate fetching search results based on form data

        setSearchResults([]);
        setShowForm(false);
        try {
            const resp = await axiosInst.get('/events/recommendations', { params: data })
            setSearchResults(resp.data.events)
        } catch (error) {

        }
    };

    const handleSearch = () => {
        setShowForm(true);
        setSearchResults([]);
    }
    return (
        <AuthGuard>
            <Container>
                <Text className="text-3xl text-blue-500 font-bold mb-4">Знайдіть події для вашого настрою та параметрів</Text>
                {showForm ?
                    <RecommendationsForm onSearchSubmit={handleSearchSubmit}></RecommendationsForm>
                    :
                    <CustomButton onPress={() => handleSearch()} isActive={false} additionalStyles='self-end'>Шукати події</CustomButton>
                }
                {!showForm &&
                    (searchResults.length ? <View>
                        <Text className="font-bold text-xl text-center">{'Події за вашим запитом'}</Text>
                        <EventList eventsList={searchResults}></EventList>
                    </View>
                        : <View className='flex flex-1 justify-center items-center'>
                            <Text className='text-bold text-3xl text-center text-blue-500'>На жаль, не знайдено подій за вашим запитом!</Text>
                        </View>
                    )
                }
            </Container>
        </AuthGuard>
    )
}

export default Recommendations

const styles = StyleSheet.create({})