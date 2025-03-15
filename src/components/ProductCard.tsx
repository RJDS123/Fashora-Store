
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  index?: number;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  isNew = false, 
  isSale = false, 
  discount = 0,
  rating = 0,
  index = 0
}: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const actualPrice = isSale ? price - (price * discount / 100) : price;
    
    addToCart({
      id,
      name,
      price: actualPrice,
      quantity: 1,
      image
    });
  };
  
  return (
    <motion.div 
      className="product-card group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-muted/30">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {isNew && (
            <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-medium py-1 px-2 rounded-full z-10">
              New
            </span>
          )}
          
          {isSale && (
            <span className="absolute top-3 right-3 bg-primary text-white text-xs font-medium py-1 px-2 rounded-full z-10">
              {discount}% OFF
            </span>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white hover:text-foreground transition-colors flex items-center justify-center">
              <Heart size={18} />
            </button>
            <button 
              className="flex-1 ml-2 py-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white hover:text-foreground transition-colors flex items-center justify-center space-x-2"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              <span className="font-medium">Add to Cart</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">{category}</div>
          <h3 className="font-medium mt-1 line-clamp-1">{name}</h3>
          <div className="mt-1.5 flex items-baseline">
            {isSale ? (
              <>
                <span className="font-semibold">${(price - (price * discount / 100)).toFixed(2)}</span>
                <span className="ml-2 text-muted-foreground line-through text-sm">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold">${price.toFixed(2)}</span>
            )}
          </div>
          
          {rating > 0 && (
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-muted-foreground">(12 reviews)</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
