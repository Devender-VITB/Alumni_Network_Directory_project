import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base font-semibold',
  xl: 'w-20 h-20 text-xl font-bold',
  '2xl': 'w-28 h-28 text-2xl font-bold',
};

export const Avatar = ({
  src,
  alt = 'Avatar',
  name = '',
  size = 'md',
  className,
  status, // 'online' | 'offline' | 'busy'
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (text) => {
    if (!text) return '?';
    const parts = text.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getBgColor = (text) => {
    const colors = [
      'bg-brand-navy text-white',
      'bg-brand-blue text-white',
      'bg-emerald-700 text-white',
      'bg-indigo-700 text-white',
      'bg-teal-700 text-white',
      'bg-amber-700 text-white',
    ];
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className={cn('relative inline-flex shrink-0', className)} {...props}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name}
          onError={() => setImageError(true)}
          className={cn(
            'rounded-full object-cover ring-2 ring-white shadow-soft-sm',
            sizes[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center rounded-full ring-2 ring-white select-none font-medium shadow-soft-sm',
            sizes[size],
            getBgColor(name || alt)
          )}
        >
          {getInitials(name || alt)}
        </div>
      )}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3',
            status === 'online' && 'bg-status-success',
            status === 'offline' && 'bg-text-muted',
            status === 'busy' && 'bg-status-error'
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;
