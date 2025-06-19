import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CollectionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeaturedCollectionProps {
  title: string;
  subtitle?: string;
  items: CollectionItem[];
}

const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  title,
  subtitle,
  items,
}) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-serif mb-4">{title}</h2>
          {subtitle && <p className="text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="group">
              <div className="overflow-hidden mb-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-[500px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-serif mb-2">{item.title}</h3>
              <p className="text-neutral-600 mb-3">{item.description}</p>
              <Link 
                to="/portfolio" 
                className="inline-flex items-center text-sm font-medium text-neutral-900 hover:text-neutral-700 transition-colors"
              >
                Explore collection
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;