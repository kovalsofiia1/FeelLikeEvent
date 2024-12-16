import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Logo = () => {
    return (
        <Link href="/home" className="flex flex-row" style={styles.link}>
            <Text className="text-blue-500 text-xl font-bold">Feel</Text>
            <Text className="italic text-blue-500 text-lg">like</Text>
            <Text className="text-black text-xl font-bold">Event</Text>
        </Link>
    );
};

export default Logo;

const styles = StyleSheet.create({
    link: {
        display: 'flex', // Ensure the link behaves as a flex container
        flexDirection: 'row',
        alignItems: 'center',
    },
});
