import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/src/components/shared/CustomButton'
import { Redirect, router } from 'expo-router';
import AuthGuard from '@/src/components/auth/AuthGuard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyData, fetchUserData, logOut, updateMyData } from '@/src/redux/user/actions';
import { selectUser, selectLoading, selectError, selectIsLoggedIn } from '@/src/redux/user/selectors';
import { AppDispatch } from '@/src/redux/store';
import ProfileInfoDisplay from '@/src/components/profile/ProfileInfoDisplay';
import ProfileEditForm from '@/src/components/profile/ProfileEditForm';
import Container from '@/src/components/shared/Container';
import { UpdateUser, User, UserState } from '@/src/redux/user/types';

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

    const handleSave = async (updatedProfile: User) => {
        try {
            console.log(updatedProfile);

            const formData = new FormData();

            // Add text fields to FormData
            formData.append("name", updatedProfile.name);
            formData.append("email", updatedProfile.email);

            if (updatedProfile.description) {
                formData.append("description", updatedProfile.description);
            }

            if (updatedProfile.phoneNumber) {
                formData.append("phoneNumber", updatedProfile.phoneNumber);
            }

            if (updatedProfile.dateOfBirth) {
                formData.append("dateOfBirth", new Date(updatedProfile.dateOfBirth).toISOString());
            }

            if (updatedProfile.interests && updatedProfile.interests.length > 0) {
                formData.append("interests", JSON.stringify(updatedProfile.interests));
            }

            // Handle avatar image
            if (updatedProfile.avatarURL) {
                // Convert image URI to blob and append it
                const blob = await fetch(updatedProfile.avatarURL).then((res) => res.blob());
                formData.append("avatars", blob, "avatar.jpg");
            }

            // const imagePromises = updatedProfile.avatarURL.map(async (uri, index) => {
            //     const blob = await fetch(uri).then((res) => res.blob());
            //     formData.append('avatars', blob, `image_${index}.jpg`);
            // });

            // await Promise.all(imagePromises);
            // Log FormData contents (for debugging)
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Dispatch the updateMyData action with the FormData
            dispatch(updateMyData(formData))
                .then(() => {
                    setIsEditing(false);
                })
                .catch(() => {
                    alert("Сталася помилка при спробі оновити профіль!");
                });
        } catch (error) {
            console.error("Error while saving profile:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    console.log(user)
    return (
        <AuthGuard>
            <Container>
                <View>
                    {user && <>
                        {isEditing ? (
                            <ProfileEditForm
                                userProfile={user}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        ) : (
                            <View className='flex'>
                                <CustomButton onPress={() => setIsEditing(true)} additionalStyles='self-end'>Редагувати</CustomButton>
                                <ProfileInfoDisplay userProfile={user} />
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
