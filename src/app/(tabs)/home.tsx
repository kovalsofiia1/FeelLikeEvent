import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import CustomButton from '@/src/components/shared/CustomButton';
import { router } from 'expo-router';
import TopEvents from '@/src/components/events/TopEvents';
import Container from '@/src/components/shared/Container';


const Home = () => {

    return (
        <Container>
            <View className="pt-4">
                <Text className='font-semibold text-5xl mb-10 mt-10'>Відкривайте світ <Text className='text-blue-500 italic'>подій</Text> разом з нами!</Text>
                <Text className='text-lg'>Ласкаво просимо до FeelLikeEvent! Тут ви знайдете все, що потрібно для того, щоб насолоджуватися найцікавішими заходами у вашому місті.</Text>
                <CustomButton onPress={() => { router.push('/recommendations') }} additionalStyles='w-auto mt-7 mb-4'>Події для вас</CustomButton>
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