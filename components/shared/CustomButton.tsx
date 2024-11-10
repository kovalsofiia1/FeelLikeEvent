import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onPress: () => void;
    additionalStyles?: string; // Only if using NativeWind or similar for Tailwind classes
    isLoading?: boolean;
}

const CustomButton = ({ children, onPress, additionalStyles = '', isLoading }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-blue-500 min-h-15 rounded-xl px-4 py-1 self-start ${additionalStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={onPress}
            disabled={isLoading}

        >
            <Text className={`text-white text-md align-middle`}>{children}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton;

const styles = StyleSheet.create({});
