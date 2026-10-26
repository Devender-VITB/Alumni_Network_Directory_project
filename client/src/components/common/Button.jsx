import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-brand-navy hover:bg-brand-navy-light text-white shadow-soft-sm active:scale-[0.98]',
  blue: 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-soft-sm active:scale-[0.98]',
  secondary: 'bg-brand-blue-light text-brand-blue hover:bg-blue-100 active:scale-[0.98]',
  outline: 'border border-border bg-white text-text-primary hover:bg-bg-alt hover:border-border-dark active:scale-[0.98]',
  ghost: 'text-text-secondary hover:text-brand-navy hover:bg-bg-alt',
  danger: 'bg-status-error hover:bg-red-700 text-white shadow-soft-sm active:scale-[0.98]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm font-medium rounded-xl gap-2',
  lg: 'px-5 py-3 text-base font-semibold rounded-xl gap-2.5',
};

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:opacity-55 disabled:cursor-not-allowed select-none cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : LeftIcon ? (
        <LeftIcon className="w-4 h-4 shrink-0" />
      ) : null}
      
      <span>{children}</span>

      {!isLoading && RightIcon && (
        <RightIcon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
