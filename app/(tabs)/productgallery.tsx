import React, { useState } from 'react';
import { TouchableOpacity, Text, View, FlatList, Image, TextInput, Button } from 'react-native';
import { useCart } from '../../context/CartContext'; // Correct path to CartContext
import products from '../../data/Products'; // Correct path to the products file
import styles from '../../assets/styles/productgallery.styles'; // Correct path to the styles in the assets folder

// Define the updated categories array
const categories = [
  { category: 'boards', title: 'Boards' },
  { category: 'tip jars', title: 'Tip Jars' },
  { category: 'instant winners', title: 'Instant Winners' },
  { category: 'bingo supplies', title: 'Bingo Supplies' },
  { category: 'elimination games', title: 'Elimination Games' },
  { category: 'chip games', title: 'Chip Games' },
  { category: 'all', title: 'Shop All' },
];

// Define the Product type
interface Product {
  id: number;
  name: string;
  images?: string[];
  image?: string;
  category: string;
  tags: string[];
  takeIn?: string; // Optional
  payout?: string; // Optional
  profit?: string; // Optional
}

const PRODUCTS_PER_PAGE = 10; // Number of products per page

export default function ProductGallery() {
  const { addToCart } = useCart(); // Access the addToCart function from the CartContext
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [searchQuery, setSearchQuery] = useState(''); // Track the search query

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === 'all' || !selectedCategory
      ? products
      : products.filter((product) =>
          product.category.toLowerCase() === selectedCategory
        );

  // Apply search query to filtered products
  const searchedProducts = filteredProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Paginate the products
  const paginatedProducts = searchedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage * PRODUCTS_PER_PAGE < searchedProducts.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Helper function to resolve static image paths
  const resolveImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return { uri: product.images[0] };
    } else if (product.image) {
      return { uri: product.image };
    }
    return require('../../assets/images/kmicologo.png'); // Fallback image
  };

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
              onPress={() => {
                setSelectedCategory(category.category.toLowerCase());
                setCurrentPage(1); // Reset to the first page when a category is selected
              }}
            >
              <Text style={styles.categoryText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Product Gallery View
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {selectedCategory === 'all' ? 'All Products' : `Products in ${selectedCategory}`}
          </Text>

          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search products by name, tags, or category..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setCurrentPage(1); // Reset to the first page when a search query is entered
            }}
          />

          {/* Product List */}
          <FlatList
            data={paginatedProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image
                  source={resolveImage(item)}
                  style={styles.productImage}
                />
                <View>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDetails}>Take In: {item.takeIn || "N/A"}</Text>
                  <Text style={styles.productDetails}>Payout: {item.payout || "N/A"}</Text>
                  <Text style={styles.productDetails}>Profit: {item.profit || "N/A"}</Text>
                  <Button
                    title="Add to Cart"
                    onPress={() => addToCart(item)} // Pass the product object as-is
                  />
                </View>
              </View>
            )}
          />

          {/* Pagination Controls at the Bottom */}
          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
              onPress={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationButtonText}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageIndicator}>{`Page ${currentPage}`}</Text>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                currentPage * PRODUCTS_PER_PAGE >= searchedProducts.length && styles.disabledButton,
              ]}
              onPress={handleNextPage}
              disabled={currentPage * PRODUCTS_PER_PAGE >= searchedProducts.length}
            >
              <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}