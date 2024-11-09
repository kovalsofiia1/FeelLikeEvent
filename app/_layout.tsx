import React from 'react'
import "../global.css"
import { Stack, useRouter } from 'expo-router'
import { useFonts } from 'expo-font'

const RootLayout = () => {
  const router = useRouter();

  // React.useEffect(() => {
  //   // Automatically redirect to the '/home' route
  //   router.replace('/home');
  // }, [router]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    </Stack>
  )
}

export default RootLayout
