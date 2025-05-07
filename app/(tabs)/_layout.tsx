import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; // Import icons from expo/vector-icons
import styles from '../../assets/styles/_layout.styles'; // Correct path to the styles folder in the assets directory
import { CartProvider } from '../../context/CartContext'; // Correct path to CartContext

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Use the color directly here
          headerShown: false,
          tabBarStyle: styles.tabBarStyle, // Use styles for tabBarStyle
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />, // Use Ionicons for the icon
          }}
        />

        {/* Cart Tab */}
        <Tabs.Screen
          name="cart"
          options={{
            title: 'My Cart',
            tabBarIcon: ({ color }) => <Ionicons name="cart" size={28} color={color} />, // Use Ionicons for the icon
          }}
        />

        {/* Account Tab */}
        <Tabs.Screen
          name="account"
          options={{
            title: 'My Account',
            tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />, // Use Ionicons for the icon
          }}
        />

        {/* Product Gallery Tab */}
        <Tabs.Screen
          name="productgallery"
          options={{
            title: 'Products',
            tabBarIcon: ({ color }) => <Ionicons name="grid" size={28} color={color} />, // Use Ionicons for the icon
          }}
        />
      </Tabs>
    </CartProvider>
  );
}