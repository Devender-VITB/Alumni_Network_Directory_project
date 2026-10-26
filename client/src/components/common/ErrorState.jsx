import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an error loading this information. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div className={cn('text-center py-12 px-4 flex flex-col items-center justify-center max-w-md mx-auto', className)}>
      <div className="w-16 h-16 rounded-2xl bg-status-error-bg text-status-error flex items-center justify-center mb-4 ring-8 ring-status-error-bg/50">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          leftIcon={RefreshCw}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
