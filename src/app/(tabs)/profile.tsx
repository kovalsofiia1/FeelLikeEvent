import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '@/src/components/shared/CustomButton'
import { useAuth } from '@/src/context/AuthContext';
import { router } from 'expo-router';
import AuthGuard from '@/src/components/auth/AuthGuard';

const Profile = () => {
    const { authState, onLogout } = useAuth();
    const logout = async () => {
        const result = await onLogout!();
        if (result && result.error) {
            alert(result.msg);
        }
        else {
            router.push('/home');
        }
    }

    return (
        <AuthGuard>
            <View>
                <Text>Profile</Text>
                <CustomButton onPress={() => logout()}>Logout</CustomButton>
            </View>
        </AuthGuard>
    )
}

export default Profile

const styles = StyleSheet.create({})