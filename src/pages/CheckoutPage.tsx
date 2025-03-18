import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
  const { items, loading, error, createOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder(shippingAddress, paymentMethod);
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Complete your purchase securely
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm sticky top-24">
              <div className="p-6">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start py-3 border-b border-border">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.size && <span>Size: {item.size} | </span>}
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="text-sm font-medium mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <div className="flex items-center text-primary text-sm">
                      <CheckCircle2 size={14} className="mr-1" />
                      Free shipping applied
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link to="/cart" className="text-primary text-sm hover:underline block text-center">
                  Return to cart
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Checkout Form */}
          <motion.div 
            className="lg:col-span-2 order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6">
                <h2 className="font-semibold mb-6">Shipping Address</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={shippingAddress.fullName}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, address: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, city: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, state: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, country: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:border-primary outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 mb-6">
                    <h2 className="font-semibold mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <label htmlFor="card" className="flex items-center space-x-2">
                          <CreditCard size={20} />
                          <span>Credit Card</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
