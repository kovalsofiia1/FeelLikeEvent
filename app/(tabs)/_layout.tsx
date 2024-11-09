import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { icons } from '../../constants';

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
                style={{ tintColor: color, width: 24, height: 24 }}  // Updated style
            />
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: focused ? '600' : '400',  // Adjusted font weights
                }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={'Home'} focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="events"
                    options={{
                        title: "Events",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={'Events'} focused={focused} />
                        ),
                        tabBarLabel: 'Events',  // Explicitly set the label
                    }}
                />
                <Tabs.Screen
                    name="recomendations"
                    options={{
                        title: "For you",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={'For you'} focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={'Profile'} focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="events/create"
                    options={{
                        title: "crete",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={'create'} focused={focused} />
                        ),
                        tabBarStyle: { display: 'none' },
                    }}
                />
                <Tabs.Screen
                    name="events/edit/[eventId]"
                    options={{
                        title: "edit",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={'edit'} focused={focused} />
                        ),
                        tabBarStyle: { display: 'none' },
                    }}
                />
                <Tabs.Screen
                    name="events/[eventId]"
                    options={{
                        title: "event",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name={'event'} focused={focused} />
                        ),
                        tabBarStyle: { display: 'none' },
                    }}

                />

            </Tabs>
        </>
    )
}

export default TabsLayout

const styles = StyleSheet.create({})