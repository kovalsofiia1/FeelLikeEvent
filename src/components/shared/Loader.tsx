import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

const Loader = ({ size = 'large', color = '#0000ff', message }: LoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
    backgroundColor: 'rgba(0,0,0,0)', // Semi-transparent background
  },
  message: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
