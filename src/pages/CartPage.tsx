import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ChevronRight, CreditCard, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 10;
  const finalTotal = subtotal + shipping;
  
  const handleCheckout = () => {
    if (!user) {
      toast.error('Please log in to proceed to checkout');
      navigate('/login?redirect=checkout');
      return;
    }
    
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Shopping Cart</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Review your items, update quantities, or proceed to checkout
          </p>
        </motion.div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <h2 className="font-semibold">Cart Items ({items.length})</h2>
                    <button 
                      className="text-primary text-sm hover:underline"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {items.map((item) => (
                      <div key={item.id} className="py-6 flex flex-col sm:flex-row sm:items-center">
                        <div className="flex-shrink-0 w-full sm:w-24 h-24 rounded-xl overflow-hidden mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        
                        <div className="flex-1 sm:ml-6">
                          <h3 className="font-medium">{item.name}</h3>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                            <div>Price: ${item.price.toFixed(2)}</div>
                            {item.size && <div>Size: {item.size}</div>}
                            {item.color && <div>Color: {item.color}</div>}
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <button 
                                className="w-8 h-8 rounded-l-lg border border-border flex items-center justify-center"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus size={14} />
                              </button>
                              <div className="w-10 h-8 flex items-center justify-center border-t border-b border-border">
                                {item.quantity}
                              </div>
                              <button 
                                className="w-8 h-8 rounded-r-lg border border-border flex items-center justify-center"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="font-semibold mr-4">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button 
                                className="text-muted-foreground hover:text-destructive transition-colors"
                                onClick={() => removeItem(item.id)}
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to="/shop" className="btn-outline w-full sm:w-auto flex items-center justify-center">
                  <ShoppingBag size={18} className="mr-2" />
                  Continue Shopping
                </Link>
                
                <div className="text-muted-foreground">
                  Estimated delivery: <span className="text-foreground font-medium">3-5 business days</span>
                </div>
              </div>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm sticky top-24">
                <div className="p-6">
                  <h2 className="font-semibold mb-4">Order Summary</h2>
                  
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
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4 py-3 flex items-center justify-center"
                    onClick={handleCheckout}
                  >
                    <CreditCard size={18} className="mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    By checking out, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-sm font-medium mb-3">Have a promo code?</h3>
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Enter code" 
                        className="flex-1 border border-border rounded-l-lg px-3 py-2 outline-none focus:border-primary"
                      />
                      <button className="bg-muted text-foreground rounded-r-lg px-4 py-2 font-medium">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6 flex justify-center">
              <ShoppingBag size={64} className="text-muted-foreground/50" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet!
            </p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
