import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CustomButton from '@/src/components/shared/CustomButton'
import { Redirect, router } from 'expo-router';
import AuthGuard from '@/src/components/auth/AuthGuard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyData, fetchUserData, logOut } from '@/src/redux/user/actions';
import { selectUser, selectLoading, selectError, selectIsLoggedIn } from '@/src/redux/user/selectors';
import { AppDispatch } from '@/src/redux/store';

const Profile = () => {

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        if (isLoggedIn && !user) {
            dispatch(fetchMyData());
        }
    }, [isLoggedIn, dispatch]);

    const logout = async () => {

        dispatch(logOut())
            .unwrap()
            .then(() => {
                router.push('/home');
            })
            .catch(() => {
                alert(error);
            });

    }

    return (
        <AuthGuard>
            <View>
                <Text>Profile</Text>
                <CustomButton onPress={() => logout()}>Logout</CustomButton>
                <Text>{user?.status}</Text>
                {loading && <Text>Loading...</Text>}
                {error && <Text>Error: {error}</Text>}
                {user && <Text>User: {user.name}</Text>}
            </View>
        </AuthGuard>
    )
}

export default Profile

const styles = StyleSheet.create({})