import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/shared/CustomButton';
import { router } from 'expo-router';
import TopEvents from '@/components/events/TopEvents';
import Container from '@/components/shared/Container';
const Home = () => {
    return (
        <Container>
            <View className="px-4 pt-4">
                <Text className='font-semibold text-5xl mb-10 mt-10'>Відкривайте світ подій разом з нами!</Text>
                <Text className='text-lg'>Ласкаво просимо до FeelLikeEvent! Тут ви знайдете все, що потрібно для того, щоб насолоджуватися найцікавішими заходами у вашому місті.</Text>
                <CustomButton onPress={() => { router.push('/recomendations') }} additionalStyles='w-auto mt-7 mb-4'>Події для вас</CustomButton>
                <TopEvents></TopEvents>
            </View>
        </Container>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})