import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import Container from '@/src/components/shared/Container';
import TagsList from '@/src/components/shared/tags/TagsList';
import CustomButton from '@/src/components/shared/CustomButton';
import CommentsSection from '@/src/components/shared/CommentsSection';

type RouteParams = {
    eventId: string;
};

const EventDetailsPage = () => {
    const { eventId } = useLocalSearchParams(); // Get eventId from the route params

    return (
        <Container>
            {/* Header */}

            <View className="bg-gray-200 h-32 w-full rounded-lg mb-4">
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image URL
                    className="h-full w-full rounded-lg"
                    resizeMode="cover"
                />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">
                Майстер-клас з гончарства
            </Text>
            {/* Rating and Price */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-600">Рейтинг: 4.75</Text>
                <Text className="text-green-600 font-bold">Ціна: 300 грн.</Text>
            </View>

            {/* Tags */}
            <TagsList tags={["Творчість", "Розвиток", "Кераміка", "Гончарство"]}></TagsList>

            {/* Description */}
            <Text className="text-gray-700 mb-6">
                Долучайтеся до майстер-класу з живопису для початківців! Усі матеріали
                надаються. Навчіться основам живопису разом з професійним художником і
                створіть свій перший шедевр.
            </Text>

            <View className="mb-6">
                <Text className="text-gray-900 font-bold mb-2">Деталі:</Text>
                <Text className="text-gray-700">
                    <Text className="font-bold">Дата:</Text> 15 листопада 2024
                </Text>
                <Text className="text-gray-700">
                    <Text className="font-bold">Час:</Text> 18:00 - 20:00
                </Text>
                <Text className="text-gray-700">
                    <Text className="font-bold">Кількість людей:</Text> до 20
                </Text>
                <Text className="text-gray-700">
                    <Text className="font-bold">Місто:</Text> м.Київ, Київська обл.
                </Text>
                <Text className="text-gray-700">
                    <Text className="font-bold">Місце:</Text> Арт-студія "Кольоровий світ", вул. Бандери, 30А
                </Text>
                <Text className="text-gray-700">
                    <Text className="font-bold">Організатор:</Text> Софія Коваль
                </Text>
            </View>

            {/* Booking Info */}
            <Text className="text-gray-700 mb-6">
                Вже заброньовано: 5/20 місць
            </Text>

            {/* Buttons */}
            <View className="flex-row gap-2">
                <CustomButton onPress={() => { router.push('/') }}>Забронювати</CustomButton>
                <CustomButton onPress={() => { }} isActive={false}>Зберегти</CustomButton>
            </View>

            <CommentsSection></CommentsSection>
        </Container>
    );
};

export default EventDetailsPage;