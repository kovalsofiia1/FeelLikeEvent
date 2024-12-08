import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { loadTokenFromStorage } from '@/src/redux/user/actions';

interface Props {
  children: React.ReactNode
}

const AllContentWrapper = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, []);

  return (
    <>
      {children}
    </>
  )
}

export default AllContentWrapper

const styles = StyleSheet.create({})