import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native';
import { useCart } from '../../context/CartContext'; // Correct path to CartContext

export default function CartScreen() {
  const { cart, removeFromCart } = useCart(); // Access the cart and removeFromCart function from the CartContext

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.subtitle}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemText}>Take In: {item.takeIn}</Text>
                <Text style={styles.cartItemText}>Payout: {item.payout}</Text>
                <Text style={styles.cartItemText}>Profit: {item.profit}</Text>
                <Text style={styles.cartItemText}>Deals Per Case: {item.dealsPerCase}</Text>
                <Text style={styles.cartItemText}>Items: {item.quantity}</Text>
                <Text style={styles.cartItemText}>Cases: {item.caseQuantity}</Text>
                <Button
                  title="Remove"
                  onPress={() => removeFromCart(item.id)}
                  color="red"
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cartItemText: {
    fontSize: 14,
    color: '#555',
  },
});