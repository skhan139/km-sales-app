import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../assets/styles/home.styles'; // Updated path to the styles folder in assets

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to K&M Sales!</Text>
      <Text style={styles.subtitle}>Explore our products and manage your account easily.</Text>
    </View>
  );
}