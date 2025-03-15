
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/components/ui/use-toast";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearchClick = () => {
    toast({
      title: "Search",
      description: "Search functionality would be implemented in a real application.",
    });
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full py-4",
        isScrolled ? "bg-background/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-foreground">
          Fashora
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="link-item text-foreground/90 hover:text-foreground transition-colors">Home</Link>
          <Link to="/shop" className="link-item text-foreground/90 hover:text-foreground transition-colors">Shop</Link>
          <Link to="/categories" className="link-item text-foreground/90 hover:text-foreground transition-colors">Categories</Link>
          <Link to="/about" className="link-item text-foreground/90 hover:text-foreground transition-colors">About</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 text-foreground/70 hover:text-foreground transition-colors relative group"
            onClick={handleSearchClick}
          >
            <Search size={20} />
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>
          
          <Link to="/cart" className="p-2 text-foreground/70 hover:text-foreground transition-colors relative group">
            <ShoppingBag size={20} />
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center font-medium">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
          
          <Link to="/login" className="hidden md:flex p-2 text-foreground/70 hover:text-foreground transition-colors relative group">
            <User size={20} />
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </Link>
          
          <button 
            className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-xl pt-20 px-6 z-40 flex flex-col transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-5 items-center mt-8">
          <Link 
            to="/" 
            className="text-xl font-medium w-full text-center py-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="text-xl font-medium w-full text-center py-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/categories" 
            className="text-xl font-medium w-full text-center py-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>
          <Link 
            to="/about" 
            className="text-xl font-medium w-full text-center py-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/login" 
            className="text-xl font-medium w-full text-center py-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
