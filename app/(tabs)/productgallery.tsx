import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, FlatList, Image } from 'react-native';
import products from '../../data/Products'; // Corrected path to match file casing

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
}

const categories = [
  { title: 'Tip Jars', category: 'tip jars' },
  { title: 'Knife Boards', category: 'knife boards' },
  { title: 'Elimination Games', category: 'elimination games' },
  { title: 'Instant Winners', category: 'instant winners' },
  { title: 'Bonus Boards', category: 'bonus boards' },
  { title: 'All Products', category: 'all' },
];

export default function ProductGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts =
    selectedCategory === 'all' || !selectedCategory
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory &&
            typeof product.image === 'string' && 
            product.image.trim() !== ''
        );

  return (
    <View style={styles.container}>
      {selectedCategory === null ? (
        // Explore View
        <View>
          <Text style={styles.title}>Explore Our Products</Text>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryButton}
              onPress={() => setSelectedCategory(category.category)}
            >
              <Text style={styles.categoryText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Product Gallery View
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {selectedCategory === 'all' ? 'All Products' : `Products in ${selectedCategory}`}
          </Text>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
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
  categoryButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});