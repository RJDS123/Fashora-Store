
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal, Search, Grid3X3, LayoutGrid } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { PageLoader } from '@/components/Loader';
import { useToast } from "@/components/ui/use-toast";

// Mock product data
const products = [
  {
    id: '1',
    name: 'Premium Leather Jacket',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    isNew: true,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    isSale: true,
    discount: 15,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Slim Fit Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    isNew: true,
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Smartwatch with Heart Rate Monitor',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    isSale: true,
    discount: 10,
    rating: 4.0,
  },
  {
    id: '5',
    name: 'Lightweight Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Footwear',
    isNew: false,
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    isSale: false,
    rating: 4.3,
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
    isNew: true,
    rating: 4.1,
  },
  {
    id: '8',
    name: 'Vintage Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Clothing',
    isSale: true,
    discount: 20,
    rating: 4.4,
  },
];

// Filter and sort options
const categories = ['All Categories', 'Clothing', 'Electronics', 'Footwear', 'Accessories', 'Beauty', 'Home & Living', 'Sports & Fitness', 'Books & Media'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular', 'Rating'];

// Helper function to convert slug to proper category name
const slugToCategory = (slug: string): string => {
  const categoryMap: {[key: string]: string} = {
    'clothing': 'Clothing',
    'electronics': 'Electronics',
    'footwear': 'Footwear',
    'accessories': 'Accessories',
    'beauty': 'Beauty',
    'home-living': 'Home & Living',
    'sports-fitness': 'Sports & Fitness',
    'books-media': 'Books & Media',
    'summer-collection': 'Clothing', // Map collections to their main category
    'tech-essentials': 'Electronics'
  };
  
  return categoryMap[slug] || 'All Categories';
};

export default function ShopPage() {
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [gridView, setGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Get category from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categorySlug = params.get('category');
    
    if (categorySlug) {
      const categoryName = slugToCategory(categorySlug);
      setSelectedCategory(categoryName);
      
      // Show toast notification when filtering by category
      toast({
        title: `Browsing ${categoryName}`,
        description: categoryName === 'All Categories' 
          ? "Showing all products" 
          : `Filtered to show only ${categoryName} products`
      });
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.search, toast]);
  
  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0; // Newest or Popular
    }
  });
  
  if (isLoading) {
    return <PageLoader />;
  }
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {selectedCategory === 'All Categories' ? 'Shop All Products' : `Shop ${selectedCategory}`}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {selectedCategory === 'All Categories' 
              ? 'Browse our entire collection of high-quality products'
              : `Explore our collection of ${selectedCategory.toLowerCase()} items`}
          </p>
        </motion.div>
        
        {/* Search and Filter Controls */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary outline-none transition-colors"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${gridView ? 'bg-foreground text-background' : 'border border-border'}`}
                onClick={() => setGridView(true)}
              >
                <Grid3X3 size={18} />
              </button>
              <button 
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${!gridView ? 'bg-foreground text-background' : 'border border-border'}`}
                onClick={() => setGridView(false)}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                className="md:hidden w-10 h-10 rounded-xl border border-border flex items-center justify-center"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>
          
          <div className={`filters ${filtersOpen ? 'block' : 'hidden md:flex'} flex-col md:flex-row justify-between gap-4 p-4 md:p-0`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Category:</span>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-background border border-border rounded-xl px-4 py-2 pr-10 focus:border-primary outline-none transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={16} />
                </div>
              </div>
              
              <div className="md:ml-4 flex items-center">
                <span className="text-sm font-medium mr-2">Sort by:</span>
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="appearance-none bg-background border border-border rounded-xl px-4 py-2 pr-10 focus:border-primary outline-none transition-colors"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={16} />
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">
                Showing {sortedProducts.length} products
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Products Grid */}
        <motion.div 
          className={`grid ${gridView ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
                isSale={product.isSale}
                discount={product.discount}
                rating={product.rating}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <Filter size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
