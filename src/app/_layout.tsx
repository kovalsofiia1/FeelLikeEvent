import React from 'react';
import "../../global.css";
import { Stack, useRouter, SplashScreen } from 'expo-router';
import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
// import dotenv from 'dotenv';
// import GlobalProvider from "@/src/context/GlobalProvider";
// import Logo from '@/src/components/shared/Logo';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { View } from 'react-native';
// import { GlobalStyles } from '@/src/components/shared/GlobalStyles';
import SafeAreaWrapper from '@/src/components/shared/SafeAreaWrapper';
import Header from '@/src/components/shared/Header';
// import { AuthProvider } from '@/src/context/AuthContext';
import { Provider } from 'react-redux';
import store, { AppDispatch } from '../redux/store';
import { loadTokenFromStorage } from '../redux/user/actions';
import { useDispatch } from 'react-redux';
import AllContentWrapper from '../components/shared/AllContentWrapper';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <AllContentWrapper>
        <SafeAreaWrapper>
          <Header></Header>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="[...rest]" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaWrapper>
      </AllContentWrapper>
    </Provider>
  )
}

export default RootLayout
