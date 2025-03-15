
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, ArrowRight, Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function Footer() {
  const { toast } = useToast();
  
  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "External Link",
      description: "This would navigate to our social media page in a real application.",
    });
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Newsletter Subscription",
      description: "Thank you for subscribing to our newsletter!",
    });
  };
  
  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="font-display text-2xl font-bold">Fashora</Link>
            <p className="text-muted-foreground max-w-xs">
              Discover a world of elegant products with our premium shopping experience.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" onClick={handleSocialClick} className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" onClick={handleSocialClick} className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" onClick={handleSocialClick} className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" onClick={handleSocialClick} className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=clothing" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/shop?category=electronics" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?category=home" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/admin/orders" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground flex items-center transition-colors group">
                  <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowRight size={14} className="mr-1" />
                  </span>
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Newsletter</h4>
            <p className="text-muted-foreground">Subscribe to our newsletter for new products and special offers.</p>
            <form onSubmit={handleEmailSubmit} className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2.5 rounded-l-xl outline-none border border-border focus:border-primary flex-1 transition-colors bg-white/50"
                required
              />
              <button type="submit" className="bg-primary text-white rounded-r-xl px-4 hover:bg-primary/90 transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between text-muted-foreground">
          <p>© {new Date().getFullYear()} Fashora. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/about" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
