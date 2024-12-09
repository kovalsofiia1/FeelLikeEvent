import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onPress: () => void;
    additionalStyles?: string;
    isLoading?: boolean;
    isActive?: boolean;
    textAdditionalStyles?: string;
}

const CustomButton = ({ children, onPress, additionalStyles = '', isLoading, isActive = true, textAdditionalStyles }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`${isActive ? 'bg-blue-500 text-white' : 'border border-slate-500 text-slate-500'} min-h-15 rounded-3xl px-6 py-2 self-start ${additionalStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={onPress}
            disabled={isLoading}
        ><Text className={`${isActive ? 'text-white' : 'text-slate-500'} text-md text-center align-middle ${textAdditionalStyles}`}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

export default CustomButton;

const styles = StyleSheet.create({});
