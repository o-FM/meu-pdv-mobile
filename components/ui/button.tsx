import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#90A681',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
