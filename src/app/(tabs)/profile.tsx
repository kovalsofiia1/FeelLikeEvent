import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/src/components/shared/CustomButton'
import { Redirect, router } from 'expo-router';
import AuthGuard from '@/src/components/auth/AuthGuard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyData, fetchUserData, logOut } from '@/src/redux/user/actions';
import { selectUser, selectLoading, selectError, selectIsLoggedIn } from '@/src/redux/user/selectors';
import { AppDispatch } from '@/src/redux/store';
import ProfileInfoDisplay from '@/src/components/profile/ProfileInfoDisplay';
import ProfileEditForm from '@/src/components/profile/ProfileEditForm';
import Container from '@/src/components/shared/Container';
import { User } from '@/src/redux/user/types';

const Profile = () => {

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [isEditing, setIsEditing] = useState(false);
    const [userProfile, setUserProfile] = useState<User | null>(user);

    useEffect(() => {
        if (isLoggedIn && !user) {
            dispatch(fetchMyData());
        }
    }, [isLoggedIn, dispatch]);

    const handleSave = (updatedProfile: any) => {
        setUserProfile(updatedProfile);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    console.log(user)
    return (
        <AuthGuard>
            <Container>
                <View>
                    {userProfile && <>
                        {isEditing ? (
                            <ProfileEditForm
                                userProfile={userProfile}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        ) : (
                            <View>
                                <ProfileInfoDisplay userProfile={userProfile} />
                                <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
                            </View>
                        )}
                    </>
                    }
                </View>
                {/* <View>
                <Text>Profile</Text>
                <CustomButton onPress={() => logout()}>Logout</CustomButton>
                <Text>{user?.status}</Text>
                {loading && <Text>Loading...</Text>}
                {error && <Text>Error: {error}</Text>}
                {user && <Text>User: {user.name}</Text>}
            </View> */}
            </Container>
        </AuthGuard>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
});
