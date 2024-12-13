import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
    onPress: () => void;
    additionalStyles?: string;
    isLoading?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    textAdditionalStyles?: string;
    type?: string;
}

const CustomButton = ({ children, onPress, additionalStyles = '', isLoading, isActive = true, textAdditionalStyles, isDisabled, type = "button" }: Props) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`${isActive ?
                'bg-blue-500 border border-transparent text-white hover:bg-transparent hover:text-slate-500 hover:border hover:border-slate-500'
                : 'border border-slate-500 text-slate-500 hover:bg-blue-500 hover:text-white'} 
                min-h-15 rounded-3xl px-6 py-2 self-start ${isDisabled ? 'text-blue-300' : ''} 
                ${additionalStyles} ${isLoading ? 'opacity-50' : ''}`}

            onPress={onPress}
            disabled={isLoading || isDisabled}

        >
            <Text className={`${isActive ? 'text-white hover:text-slate-500' : 'text-slate-500 hover:text-white'} text-md text-center align-middle ${textAdditionalStyles}`}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;

const styles = StyleSheet.create({});
