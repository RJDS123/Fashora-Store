
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden relative">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <motion.span 
              className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Summer Collection 2023
            </motion.span>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight md:leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover Our <span className="text-primary">Premium</span> Shopping Experience
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Explore our curated collection of high-quality products. From fashion to electronics, find everything you need with ease.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/shop" className="btn-primary group">
              Shop Now
              <ArrowRight size={16} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/categories" className="btn-outline">
              Explore Categories
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div>
              <h4 className="text-3xl font-bold">50+</h4>
              <p className="text-muted-foreground text-sm">Brands</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">100+</h4>
              <p className="text-muted-foreground text-sm">Products</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">24/7</h4>
              <p className="text-muted-foreground text-sm">Support</p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Premium products"
              className="w-full h-[500px] object-cover object-center"
            />
          </div>
          
          <motion.div 
            className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-primary blur-3xl opacity-20 z-0"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          ></motion.div>
          
          <motion.div 
            className="absolute -top-8 -right-8 w-60 h-60 rounded-full bg-secondary blur-3xl opacity-10 z-0"
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a 
            href="#featured" 
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-sm mb-2">Scroll to Discover</span>
            <motion.div 
              className="w-0.5 h-8 bg-primary/50 rounded-full"
              animate={{ 
                scaleY: [0.3, 1, 0.3], 
                opacity: [0.2, 1, 0.2],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            ></motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
