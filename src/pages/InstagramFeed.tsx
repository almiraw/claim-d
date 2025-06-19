import React from 'react';
import { Instagram } from 'lucide-react';
import InstagramGrid from '../components/ui/InstagramGrid';

// Sample Instagram posts data
// In a real implementation, this would come from the Instagram API
const instagramPosts = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 128,
    comments: 12,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 256,
    comments: 24,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 189,
    comments: 18,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '4',
    imageUrl: 'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 302,
    comments: 31,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '5',
    imageUrl: 'https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 412,
    comments: 39,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '6',
    imageUrl: 'https://images.pexels.com/photos/2693529/pexels-photo-2693529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 167,
    comments: 14,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '7',
    imageUrl: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 290,
    comments: 26,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '8',
    imageUrl: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 345,
    comments: 29,
    link: 'https://instagram.com/re_claim.d',
  },
  {
    id: '9',
    imageUrl: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    likes: 211,
    comments: 17,
    link: 'https://instagram.com/re_claim.d',
  },
];

const InstagramFeedPage: React.FC = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Follow Our Journey</h1>
          <p className="text-xl text-neutral-700 leading-relaxed mb-10">
            Step into our world of sustainable fashion and behind-the-scenes moments
            on Instagram.
          </p>
          <a 
            href="https://instagram.com/re_claim.d" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-neutral-900 font-medium hover:text-neutral-700 transition-colors"
          >
            <Instagram size={20} className="mr-2" />
            @re_claim.d
          </a>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="container mx-auto px-4 pb-20">
        <InstagramGrid posts={instagramPosts} />
      </section>

      {/* Latest Posts */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif mb-12 text-center">Latest Instagram Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-sm">
              <img 
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Instagram highlight" 
                className="w-full h-80 object-cover object-center mb-6"
              />
              <h3 className="text-lg font-medium mb-4">Behind the Scenes: Summer Photoshoot</h3>
              <p className="text-neutral-600 mb-4">
                Take a peek at our creative process during our latest summer collection photoshoot.
                #SustainableFashion #BehindTheScenes
              </p>
              <a 
                href="https://instagram.com/re_claim.d" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 font-medium hover:text-neutral-700 transition-colors"
              >
                View on Instagram
              </a>
            </div>
            
            <div className="bg-white p-6 shadow-sm">
              <img 
                src="https://images.pexels.com/photos/6626876/pexels-photo-6626876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Instagram highlight" 
                className="w-full h-80 object-cover object-center mb-6"
              />
              <h3 className="text-lg font-medium mb-4">Material Innovation: Recycled Fabrics</h3>
              <p className="text-neutral-600 mb-4">
                Exploring new sustainable fabrics made from recycled plastic bottles for our upcoming collection.
                #MaterialInnovation #EcoFashion
              </p>
              <a 
                href="https://instagram.com/re_claim.d" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 font-medium hover:text-neutral-700 transition-colors"
              >
                View on Instagram
              </a>
            </div>
            
            <div className="bg-white p-6 shadow-sm">
              <img 
                src="https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Instagram highlight" 
                className="w-full h-80 object-cover object-center mb-6"
              />
              <h3 className="text-lg font-medium mb-4">Craftsmanship Spotlight: Hand Embroidery</h3>
              <p className="text-neutral-600 mb-4">
                Our artisans demonstrating the intricate hand embroidery techniques that make each piece special.
                #Craftsmanship #SlowFashion
              </p>
              <a 
                href="https://instagram.com/re_claim.d" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 font-medium hover:text-neutral-700 transition-colors"
              >
                View on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstagramFeedPage;