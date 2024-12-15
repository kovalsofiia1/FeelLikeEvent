import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HorizontalLineProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({
  color = '#fff', // Default color (light gray)
  thickness = 1,   // Default thickness (1px)
  marginVertical = 10, // Default margin
}) => {
  return <View style={[styles.line, { borderColor: color, borderWidth: thickness, marginVertical }]} />;
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    borderTopWidth: 1, // The horizontal line will be created using borderTopWidth
  },
});

export default HorizontalLine;
