import React from 'react';
import { TextInput, TextInputProps, Text, View, StyleSheet, useColorScheme } from 'react-native';
import { theme } from '../styles/theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
}

export function Input({ label, style, ...rest }: InputProps) {

  const deviceTheme = useColorScheme();
  const isDarkMode = deviceTheme === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: currentTheme.text }]}>
          {label}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input, 
          {backgroundColor: currentTheme.inputBackground, color: currentTheme.text},
          style
        ]}
        placeholderTextColor={currentTheme.inputPlaceholder}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500'
  },

  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16
  }
});