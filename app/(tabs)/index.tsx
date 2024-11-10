import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../components/shared/GlobalStyles';
import Logo from '@/components/shared/Logo';
import CustomButton from '@/components/shared/CustomButton';
import { router, Redirect } from 'expo-router';
import TopEvents from '@/components/events/TopEvents';
const Home = () => {
    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
            <ScrollView>
                <View className="px-4 py-10">
                    <Text className='font-semibold text-3xl mb-2'>Відкривайте світ подій разом з нами!</Text>
                    <Text className='text-md'>Ласкаво просимо до FeelLikeEvent! Тут ви знайдете все, що потрібно для того, щоб насолоджуватися найцікавішими заходами у вашому місті.</Text>
                    <CustomButton onPress={() => { router.push('/recomendations') }} additionalStyles='w-auto mt-7 mb-4'>Події для вас</CustomButton>
                    <TopEvents></TopEvents>
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})