import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({
  children,
  className,
  hoverable = false,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'rounded-2xl border border-border bg-white p-6 shadow-soft transition-all duration-200',
        hoverable && 'hover:shadow-card-hover hover:border-brand-blue/30 hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('mb-4 flex flex-col space-y-1.5', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={cn('text-lg font-bold text-text-primary tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className, ...props }) => (
  <p className={cn('text-sm text-text-secondary leading-relaxed', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('mt-6 pt-4 border-t border-border flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);

export default Card;
