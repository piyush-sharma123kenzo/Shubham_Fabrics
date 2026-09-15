import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/ui/SEO';

export default function NotFoundPage() {
  return (
    <div className="pt-36 pb-24 bg-brand-ivory min-h-screen flex items-center justify-center">
      <SEO
        title="Page Not Found"
        description="The requested page could not be located in the Shubham Fabrics portfolio."
      />

      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-gold-dark block">
          404 ERROR
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-brand-charcoal font-normal">
          Page Not Found
        </h1>
        <p className="text-sm text-brand-charcoal/70 leading-relaxed font-light">
          The collection or page you are looking for might have been moved or is currently being updated in our showroom.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-charcoal hover:bg-brand-gold-dark text-brand-ivory text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-colors shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Showroom</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
