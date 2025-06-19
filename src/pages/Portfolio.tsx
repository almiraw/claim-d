import React, { useState } from 'react';
import Button from '../components/ui/Button';

// Sample portfolio data
const portfolioItems = [
  {
    id: '1',
    title: 'Summer 2025 Collection',
    description: 'Lightweight, sustainable pieces inspired by coastal landscapes.',
    category: 'collection',
    images: [
      'https://images.pexels.com/photos/3401822/pexels-photo-3401822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: '2',
    title: 'Reclaimed Denim Project',
    description: 'Transforming vintage denim into contemporary statement pieces.',
    category: 'project',
    images: [
      'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: '3',
    title: 'Urban Essentials',
    description: 'Minimalist wardrobe staples for the conscious urban dweller.',
    category: 'collection',
    images: [
      'https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3351400/pexels-photo-3351400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: '4',
    title: 'Heritage Techniques',
    description: 'Modern designs that incorporate traditional craftsmanship.',
    category: 'project',
    images: [
      'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6626883/pexels-photo-6626883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
  {
    id: '5',
    title: 'Winter Capsule 2024',
    description: 'Sustainable outerwear and layering pieces for the colder months.',
    category: 'collection',
    images: [
      'https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4937222/pexels-photo-4937222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9558583/pexels-photo-9558583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
  },
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  const openItemDetails = (item: typeof portfolioItems[0]) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Portfolio</h1>
          <p className="text-xl text-neutral-700 leading-relaxed">
            Explore our collections and special projects, where sustainable innovation 
            meets timeless design.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex justify-center space-x-4">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'collection' ? 'primary' : 'outline'} 
            onClick={() => setFilter('collection')}
          >
            Collections
          </Button>
          <Button 
            variant={filter === 'project' ? 'primary' : 'outline'} 
            onClick={() => setFilter('project')}
          >
            Projects
          </Button>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="cursor-pointer group"
              onClick={() => openItemDetails(item)}
            >
              <div className="overflow-hidden mb-4">
                <img 
                  src={item.images[0]} 
                  alt={item.title} 
                  className="w-full h-[400px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-serif mb-2">{item.title}</h3>
              <p className="text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif">{selectedItem.title}</h2>
                <button 
                  onClick={closeItemDetails}
                  className="text-neutral-500 hover:text-neutral-900"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-neutral-700 mb-8">{selectedItem.description}</p>
              
              <div className="grid grid-cols-1 gap-6">
                {selectedItem.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${selectedItem.title} - Image ${index + 1}`}
                    className="w-full h-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;