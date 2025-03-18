
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-24 pb-16 px-4">
      <motion.div 
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Search size={80} className="mx-auto text-muted-foreground/30 mb-6" />
        
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center">
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn-outline flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
