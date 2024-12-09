import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs, useNavigation, useRouter } from 'expo-router'

import { icons } from '@/src/constants';
import Header from '@/src/components/shared/Header';
import CustomTabBar from '@/src/components/shared/CustomTabBar';

interface TabIconProps {
    icon: any,
    color: string,
    name: string,
    focused: boolean
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image
                source={icon}
                resizeMode="contain"
                style={{ tintColor: color, width: 24, height: 24 }}
            />
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: focused ? '600' : '400',
                }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    const navigation = useNavigation();
    return (
        <>

            <Stack>
                {/* Define Tab Screens */}
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen name="events/index" options={{ headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
                <Stack.Screen name="recommendations" options={{ headerShown: false }} />
                <Stack.Screen name="events/[eventId]" options={{ headerShown: false }} />
                <Stack.Screen name="events/[eventId]/booking" options={{ headerShown: false }} />
            </Stack>
            <CustomTabBar></CustomTabBar>
        </>
    )
}

export default TabsLayout

const styles = StyleSheet.create({})