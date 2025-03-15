
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  rating?: number;
  stock?: number;
  sku?: string;
}

const DEFAULT_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Leather Jacket',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'clothing',
    description: 'Handcrafted premium leather jacket with a modern fit and durable construction.',
    isNew: true,
    isSale: false,
    rating: 4.5,
    stock: 25,
    sku: 'JACKET-001'
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    description: 'Premium wireless headphones with active noise cancellation for an immersive audio experience.',
    isNew: false,
    isSale: true,
    discount: 15,
    rating: 5,
    stock: 42,
    sku: 'AUDIO-101'
  },
  {
    id: '3',
    name: 'Classic Chronograph Watch',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    description: 'Elegant chronograph watch with stainless steel construction and premium movement.',
    isNew: false,
    isSale: false,
    rating: 4,
    stock: 18,
    sku: 'WATCH-220'
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'clothing',
    description: 'Comfortable organic cotton t-shirt, ethically sourced and produced with eco-friendly methods.',
    isNew: true,
    isSale: true,
    discount: 10,
    rating: 4.5,
    stock: 120,
    sku: 'TSHIRT-440'
  },
  {
    id: '5',
    name: 'Smart Fitness Tracker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and smartphone notifications.',
    isNew: false,
    isSale: false,
    rating: 4,
    stock: 38,
    sku: 'FITTECH-505'
  },
  {
    id: '6',
    name: 'Handcrafted Ceramic Vase',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'home-living',
    description: 'Artisan-made ceramic vase with unique hand-painted design. Perfect for modern and traditional spaces.',
    isNew: true,
    isSale: false,
    rating: 4.5,
    stock: 15,
    sku: 'HOME-645'
  },
  {
    id: '7',
    name: 'Designer Sunglasses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    description: 'Stylish designer sunglasses with UV protection and lightweight frame for all-day comfort.',
    isNew: false,
    isSale: true,
    discount: 20,
    rating: 3.5,
    stock: 28,
    sku: 'EYEWEAR-187'
  },
  {
    id: '8',
    name: 'Minimalist Backpack',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    description: 'Sleek minimalist backpack with laptop compartment, water-resistant material, and comfortable straps.',
    isNew: false,
    isSale: false,
    rating: 5,
    stock: 32,
    sku: 'BAGPACK-992'
  },
];

export const useProductStore = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Try to load products from localStorage
    const saved = localStorage.getItem('eazyshop-products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('eazyshop-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    // Generate a unique ID (in a real app, the backend would do this)
    const newId = Math.max(...products.map(p => Number(p.id)), 0) + 1;
    
    const newProduct: Product = {
      ...product,
      id: newId.toString(),
    };
    
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const productExists = products.some(p => p.id === id);
    
    if (!productExists) {
      toast.error('Product not found');
      return false;
    }
    
    setProducts(
      products.map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    );
    
    toast.success('Product updated successfully');
    return true;
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully');
  };

  const getProductsByCategory = (category: string) => {
    if (!category) return products;
    return products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
  };
};
