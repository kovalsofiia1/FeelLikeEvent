// app/[...rest].tsx

import React, { useEffect } from 'react';
import { Redirect, useRouter } from 'expo-router';
import SafeAreaWrapper from '../components/shared/SafeAreaWrapper';
import Container from '../components/shared/Container';
import { Text, View } from 'react-native';
import CustomButton from '../components/shared/CustomButton';
import Loader from '../components/shared/Loader';

const UnknownRoute = () => {
  const router = useRouter();

  if (true) {
    return <Redirect href="/home" />;
  }

  return <Loader></Loader>;
  // return <SafeAreaWrapper>
  //   <Container>
  //     <View className='flex justify-center items-center gap-2 h-full flex-1'>
  //       <Text>Page not found</Text>
  //       <CustomButton onPress={() => router.push('/home')} additionalStyles='text-center'>Go to main page</CustomButton>
  //     </View>
  //   </Container>
  // </SafeAreaWrapper>
};

export default UnknownRoute;
