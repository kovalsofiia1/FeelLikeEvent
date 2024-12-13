import { StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, Stack } from 'expo-router';
import AdminGuard from '@/src/components/auth/AdminGuard';

const AdminLayout = () => {
  const navigation = useNavigation();
  return (
    <AdminGuard>
      <Stack>
        {/* Define Tab Screens */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

      </Stack>
      {/* <CustomTabBar></CustomTabBar> */}
    </AdminGuard>
  )
}

export default AdminLayout

const styles = StyleSheet.create({})