import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-brand-blue-50 text-brand-blue flex items-center justify-center ring-8 ring-brand-blue-50/50">
        <SearchX className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-brand-navy tracking-tight">
        Page Not Found
      </h1>
      <p className="text-sm text-text-secondary leading-relaxed">
        The alumni record, event page, or portal resource you are looking for does not exist or has been relocated.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Link to="/">
          <Button variant="navy" leftIcon={Home}>
            Return Home
          </Button>
        </Link>
        <Link to="/directory">
          <Button variant="outline">
            Browse Directory
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
