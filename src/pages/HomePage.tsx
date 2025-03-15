
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import { ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/shop?category=${categorySlug}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <FeaturedProducts />
      
      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Shop by Category
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Browse our collections and find what you need
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div 
                key={category.name}
                className="relative overflow-hidden rounded-2xl group h-[300px] cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{category.itemCount} Items</p>
                  <span 
                    className="inline-block py-2 px-4 bg-white/20 backdrop-blur-sm hover:bg-white hover:text-foreground transition-colors rounded-xl text-white text-sm font-medium w-max"
                  >
                    Shop Now
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <feature.icon size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Join Our Newsletter
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Subscribe to our newsletter for exclusive offers, new arrivals, and insider-only discounts.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 w-full px-4 py-3 rounded-xl border border-border focus:border-primary bg-background outline-none transition-colors"
              />
              <button className="btn-primary w-full sm:w-auto whitespace-nowrap">
                Subscribe
              </button>
            </motion.div>
            
            <motion.p 
              className="text-xs text-muted-foreground mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Mock data for categories
const categories = [
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
    name: 'Accessories',
    slug: 'accessories',
    itemCount: 56,
    image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Home & Living',
    slug: 'home-living',
    itemCount: 29,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

// Mock data for features
const features = [
  {
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50',
    icon: Truck,
  },
  {
    title: 'Secure Payment',
    description: 'Safe & secure payment methods',
    icon: Shield,
  },
  {
    title: 'Easy Returns',
    description: '30-day money back guarantee',
    icon: RotateCcw,
  },
  {
    title: 'Premium Support',
    description: '24/7 customer service',
    icon: ShoppingBag,
  },
];
