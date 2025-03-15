
import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div className={cn(
      "flex items-center justify-center",
      className
    )}>
      <div 
        className={cn(
          "rounded-full border-t-2 border-b-2 border-primary animate-spin",
          {
            'w-4 h-4 border-[1.5px]': size === 'sm',
            'w-6 h-6 border-2': size === 'md',
            'w-8 h-8 border-[2.5px]': size === 'lg',
          }
        )}
      ></div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <Loader size="lg" className="mb-4" />
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
