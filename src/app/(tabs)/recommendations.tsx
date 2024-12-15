import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthGuard from '@/src/components/auth/AuthGuard'
import Container from '@/src/components/shared/Container'
import RecommendationsForm from '@/src/components/recommendations/RecommendationsForm'
import CustomButton from '@/src/components/shared/CustomButton'
import EventList from '@/src/components/events/EventList'
import { Event } from '@/src/redux/events/types'

const Recommendations = () => {
    const [searchResults, setSearchResults] = useState<Event[]>([]);
    const [showForm, setShowForm] = useState(true);
    // Function to handle the form submission and set the results
    const handleSearchSubmit = (data: any) => {
        console.log('Search Data:', data);
        // Simulate fetching search results based on form data

        setSearchResults([]);
        setShowForm(false);
    };

    return (
        <AuthGuard>
            <Container>
                <Text className="text-3xl text-blue-500 font-bold mb-4">Знайдіть події для вашого настрою та інтересів</Text>
                {showForm ?
                    <RecommendationsForm onSearchSubmit={handleSearchSubmit}></RecommendationsForm>
                    :
                    <CustomButton onPress={() => setShowForm(true)} isActive={false} additionalStyles='self-end'>Шукати події</CustomButton>
                }
                {searchResults.length ? <EventList eventsList={searchResults}></EventList> : <></>}
            </Container>
        </AuthGuard>
    )
}

export default Recommendations

const styles = StyleSheet.create({})