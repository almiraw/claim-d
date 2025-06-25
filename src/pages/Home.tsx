import React from 'react';
import HeroSection from '../components/ui/HeroSection';
import FeaturedCollection from '../components/ui/FeaturedCollection';
import NewsletterForm from '../components/ui/NewsletterForm';

const featuredCollections = [
  {
    id: '1',
    title: 'Sustainable Minimalism',
    description: 'Timeless pieces crafted from eco-friendly materials',
    imageUrl: 'https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Urban Revival',
    description: 'Contemporary streetwear with a conscious edge',
    imageUrl: 'https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Artisanal Heritage',
    description: 'Handcrafted designs celebrating traditional techniques',
    imageUrl: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      <HeroSection
        title="Fashion for Change"
        subtitle="Born from Art. Shaped by Purpose. Worn for Change."
        backgroundImage="https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        buttonText="Explore Collection"
        buttonLink="/portfolio"
      />
      
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-serif mb-6">We are not just a brand — we are a movement.</h2>
              <div className="text-neutral-700 leading-relaxed space-y-4">
                <p>
                  At the heart of our work lies a bold belief: that creativity has the power to disrupt, to heal, 
                  and to unify. We exist to challenge convention, reimagine systems, and create space for the new. 
                  This is not about fitting in — it's about carving out a space that never existed before.
                </p>
                <p className="font-medium text-neutral-900">
                  Art is our language. Revolution is our pulse. Collaboration is our path.
                </p>
                <p>
                  We treat creativity as a force of resistance — against stagnation, against conformity, and 
                  against silence. Every product, every project, every message we craft is a canvas for 
                  truth-telling and vision-building. Beauty is not ornamental here; it is purposeful, 
                  provocative, and alive.
                </p>
                <p>
                  We refuse to build in isolation. Our work is born in conversation — with other artists, 
                  thinkers, dreamers, and communities. We believe in shared vision, co-creation, and the 
                  messy brilliance of collective imagination. We lift as we build.
                </p>
                <p>
                  This is a platform for voices, not just aesthetics. For impact, not just image. 
                  For connection, not just consumption.
                </p>
                <p className="font-medium text-neutral-900">
                  We are here to create the future, not replicate the past.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/6626885/pexels-photo-6626885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Fashion design studio" 
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedCollection 
        title="Latest Collections" 
        subtitle="Explore our newest sustainable designs that blend innovation with timeless style."
        items={featuredCollections}
      />
      
      <section 
        className="py-20 bg-neutral-900 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(23, 23, 23, 0.8), rgba(23, 23, 23, 0.9)), url(https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Join Our Community</h2>
            <p className="text-neutral-300 mb-8">
              Subscribe to our newsletter and be the first to know about new collections, 
              exclusive events, and sustainable fashion insights.
            </p>
            <NewsletterForm variant="light" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;