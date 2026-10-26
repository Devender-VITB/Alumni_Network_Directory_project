import React from 'react';
import { SearchX, Inbox } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'Try adjusting your search criteria or clearing active filters.',
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={cn('text-center py-12 px-4 flex flex-col items-center justify-center max-w-md mx-auto', className)}>
      <div className="w-16 h-16 rounded-2xl bg-brand-blue-50 text-brand-blue flex items-center justify-center mb-4 ring-8 ring-brand-blue-50/50">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
