import React from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = {
  navy: 'bg-brand-navy/10 text-brand-navy border-brand-navy/20',
  blue: 'bg-brand-blue-light text-brand-blue border-brand-blue/20',
  success: 'bg-status-success-bg text-status-success border-status-success/20',
  warning: 'bg-status-warning-bg text-status-warning border-status-warning/20',
  error: 'bg-status-error-bg text-status-error border-status-error/20',
  neutral: 'bg-bg-alt text-text-secondary border-border',
  outline: 'bg-transparent text-text-primary border-border',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs font-medium rounded-md gap-1',
  md: 'px-2.5 py-1 text-xs font-semibold rounded-lg gap-1.5',
  lg: 'px-3 py-1.5 text-sm font-semibold rounded-xl gap-2',
};

export const Badge = ({
  children,
  className,
  variant = 'blue',
  size = 'md',
  icon: Icon,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center border font-medium whitespace-nowrap transition-colors',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
