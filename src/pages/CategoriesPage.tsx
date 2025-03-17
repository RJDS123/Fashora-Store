
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

// Create a data store to persist category data
const useCategoryStore = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('eazyshop-categories');
    return savedCategories ? JSON.parse(savedCategories) : {
      featured: featuredCategories,
      all: allCategories
    };
  });

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('eazyshop-categories', JSON.stringify(categories));
  }, [categories]);

  return { categories, setCategories };
};

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { categories } = useCategoryStore();
  
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/shop?category=${categorySlug}`);
    toast.info(`Browsing ${categorySlug.replace('-', ' ')} category`);
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our extensive collection of products organized by category
          </p>
        </motion.div>
        
        {/* Featured Categories */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.featured.map((category, index) => (
              <div 
                key={index}
                onClick={() => handleCategoryClick(category.slug)}
                className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                  <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80 mb-4">{category.description}</p>
                  <span className="inline-flex items-center py-2 px-4 bg-white/20 backdrop-blur-sm hover:bg-white hover:text-foreground transition-colors rounded-xl text-white text-sm font-medium w-max">
                    Shop Now <ChevronRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8">All Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.all.map((category, index) => (
              <motion.div 
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
                whileHover={{ y: -5 }}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="aspect-square bg-muted">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.itemCount} Products
                  </p>
                  <span className="text-primary text-sm font-medium flex items-center">
                    Browse Category <ChevronRight size={16} className="ml-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Mock data
const featuredCategories = [
  {
    name: 'Summer Collection',
    slug: 'summer-collection',
    description: 'Lightweight and breathable pieces perfect for the warmer months',
    image: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'Tech Essentials',
    slug: 'tech-essentials',
    description: 'The latest gadgets and devices to enhance your digital lifestyle',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

const allCategories = [
  {
    name: 'Clothing',
    slug: 'clothing',
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    itemCount: 38,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    itemCount: 29,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    itemCount: 56,
    image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    itemCount: 31,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    itemCount: 27,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Books & Media',
    slug: 'books-media',
    itemCount: 19,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];
