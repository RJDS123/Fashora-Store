import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart, Share2, Truck, RotateCcw, Shield, StarIcon, Check } from 'lucide-react';
import FeaturedProducts from '@/components/FeaturedProducts';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Mock product data
const product = {
  id: '1',
  name: 'Premium Leather Jacket',
  price: 249.99,
  discount: 15,
  originalPrice: 299.99,
  description: 'Classic, timeless design with premium materials. This leather jacket features a comfortable fit, durable construction, and versatile style that pairs well with any outfit.',
  rating: 4.5,
  reviewCount: 127,
  images: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80&height=1000',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80&height=1200',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80&height=900',
  ],
  colors: ['#000000', '#8B4513', '#708090'],
  sizes: ['S', 'M', 'L', 'XL'],
  features: [
    'Premium full-grain leather',
    'Soft cotton lining',
    'Heavy-duty YKK zippers',
    'Multiple interior pockets',
    'Adjustable waist straps',
  ],
  stock: 15,
  sku: 'LJ-PR-001',
  category: 'Clothing',
  tags: ['leather', 'jacket', 'premium', 'men'],
};

export default function ProductPage() {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };
  
  const handleAddToCart = () => {
    // Calculate the actual price with any discount applied
    const actualPrice = product.discount 
      ? product.price - (product.price * product.discount / 100) 
      : product.price;
    
    // Create a cart item with selected options
    const cartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`, // Make unique ID for different variations
      name: product.name,
      price: actualPrice,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor
    };

    // Add to cart with selected quantity
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem);
    }

    // Show success message
    toast.success('Added to cart successfully');
  };
  
  const getColorName = (hexColor: string) => {
    const colorMap: Record<string, string> = {
      '#000000': 'Black',
      '#8B4513': 'Brown',
      '#708090': 'Gray'
    };
    return colorMap[hexColor] || hexColor;
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Images */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer aspect-square rounded-xl overflow-hidden border ${selectedImageIndex === index ? 'border-primary' : 'border-border'}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Product Details */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="mb-2 flex items-center">
                <span className="text-sm text-primary font-medium">
                  {product.category}
                </span>
                <span className="mx-2 text-muted-foreground">•</span>
                <div className="flex items-center text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              
              <div className="mt-4 flex items-baseline space-x-3">
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-lg">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.discount && (
                  <span className="bg-primary/10 text-primary text-sm font-medium py-0.5 px-2 rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground">
              {product.description}
            </p>
            
            <div className="pt-4 space-y-6">
              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <div className="flex items-center space-x-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      onClick={() => handleColorSelect(color)}
                      style={{ backgroundColor: color }}
                      title={getColorName(color)}
                    >
                      {selectedColor === color && (
                        <Check size={16} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Size</h3>
                  <a href="#" className="text-sm text-primary hover:underline">Size Guide</a>
                </div>
                <div className="flex items-center flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`min-w-[3rem] h-10 px-3 rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${
                        selectedSize === size 
                          ? 'bg-foreground text-background' 
                          : 'bg-background border border-border hover:border-foreground'
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 rounded-l-xl border border-border flex items-center justify-center"
                    onClick={decreaseQuantity}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-14 h-10 flex items-center justify-center border-t border-b border-border">
                    {quantity}
                  </div>
                  <button
                    className="w-10 h-10 rounded-r-xl border border-border flex items-center justify-center"
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                  <div className="ml-4 text-muted-foreground text-sm">
                    {product.stock} items available
                  </div>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex items-center space-x-4 pt-2">
                <button 
                  className="btn-primary flex-1 py-3 flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Heart size={20} />
                </button>
                <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            {/* Product Features */}
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="font-medium mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Check size={14} className="text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Shipping Info */}
            <div className="border-t border-border pt-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                  <Truck size={18} className="text-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-xs text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                  <RotateCcw size={18} className="text-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Easy Returns</h4>
                  <p className="text-xs text-muted-foreground">30-day money back</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                  <Shield size={18} className="text-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Secure Payment</h4>
                  <p className="text-xs text-muted-foreground">Protected checkout</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Related Products */}
        <div className="mt-20">
          <FeaturedProducts title="You May Also Like" subtitle="Products similar to this one" />
        </div>
      </div>
    </div>
  );
}
