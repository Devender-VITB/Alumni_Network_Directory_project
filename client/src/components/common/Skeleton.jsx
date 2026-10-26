import React from 'react';
import { cn } from '../../utils/cn';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-bg-alt/90',
        className
      )}
      {...props}
    />
  );
};

export const AlumniCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-4">
      <div className="flex items-start justify-between">
        <Skeleton className="w-16 h-16 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-5 rounded" />
        <Skeleton className="w-1/2 h-4 rounded" />
        <Skeleton className="w-2/3 h-4 rounded" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="w-14 h-5 rounded-md" />
        <Skeleton className="w-16 h-5 rounded-md" />
        <Skeleton className="w-12 h-5 rounded-md" />
      </div>
      <div className="pt-4 border-t border-border flex justify-between items-center">
        <Skeleton className="w-24 h-4 rounded" />
        <Skeleton className="w-24 h-8 rounded-xl" />
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="rounded-2xl border border-border bg-white p-8 shadow-soft flex flex-col md:flex-row gap-6 items-center md:items-start">
        <Skeleton className="w-28 h-28 rounded-full" />
        <div className="flex-1 space-y-3 w-full">
          <Skeleton className="w-48 h-7 rounded" />
          <Skeleton className="w-64 h-4 rounded" />
          <Skeleton className="w-32 h-4 rounded" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="w-20 h-6 rounded-md" />
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-4">
            <Skeleton className="w-36 h-6 rounded" />
            <Skeleton className="w-full h-20 rounded" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-soft space-y-3">
            <Skeleton className="w-28 h-5 rounded" />
            <Skeleton className="w-full h-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
