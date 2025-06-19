import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Jane Smith',
      role: 'Founder & Creative Director',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'With over 15 years in sustainable fashion, Jane founded RE_CLAIM.D to challenge industry norms and create conscious, beautiful designs.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Michael brings his expertise in textile innovation and zero-waste pattern cutting to create stunning, sustainable collections.',
    },
    {
      id: 3,
      name: 'Amara Okafor',
      role: 'Sustainability Director',
      image: 'https://images.pexels.com/photos/3641976/pexels-photo-3641976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Amara ensures every aspect of our production meets the highest environmental and ethical standards.',
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Story</h1>
          <p className="text-xl text-neutral-700 leading-relaxed mb-10">
            RE_CLAIM.D was born from a vision to transform fashion from within,
            creating pieces that honor craftsmanship, sustainability, and timeless design.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-neutral-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img 
                src="https://images.pexels.com/photos/6626876/pexels-photo-6626876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Design Philosophy" 
                className="w-full h-[600px] object-cover object-center"
              />
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl font-serif mb-6">Our Design Philosophy</h2>
              <p className="text-neutral-700 leading-relaxed mb-6">
                At RE_CLAIM.D, we believe in the power of conscious design. Each piece we create 
                is a testament to our commitment to sustainability, craftsmanship, and timeless style.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-6">
                We source materials ethically, prioritizing organic, recycled, and innovative fabrics 
                that minimize environmental impact while maximizing quality and durability.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-6">
                Our designs blend contemporary aesthetics with timeless elements, creating pieces that 
                transcend seasonal trends and become lasting additions to your wardrobe.
              </p>
              <Link 
                to="/portfolio" 
                className="inline-flex items-center text-neutral-900 font-medium hover:text-neutral-700 transition-colors"
              >
                View our collections
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">Our Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xl font-serif mx-auto mb-6">1</div>
              <h3 className="text-xl font-medium mb-4">Ethical Sourcing</h3>
              <p className="text-neutral-600">
                We carefully select materials that meet our strict sustainability criteria, 
                working directly with ethical suppliers and innovative fabric developers.
              </p>
            </div>
            
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xl font-serif mx-auto mb-6">2</div>
              <h3 className="text-xl font-medium mb-4">Conscious Design</h3>
              <p className="text-neutral-600">
                Our design process integrates zero-waste pattern cutting techniques and 
                longevity considerations, minimizing offcuts and extending garment lifespans.
              </p>
            </div>
            
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xl font-serif mx-auto mb-6">3</div>
              <h3 className="text-xl font-medium mb-4">Ethical Production</h3>
              <p className="text-neutral-600">
                We partner with small-scale producers who ensure fair wages and 
                safe working conditions, creating a transparent supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-neutral-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white p-6 shadow-sm">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-80 object-cover object-center mb-6"
                />
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-neutral-600 mb-4">{member.role}</p>
                <p className="text-neutral-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Our Values</h2>
            <p className="text-neutral-700 leading-relaxed mb-12">
              At the heart of RE_CLAIM.D lies a set of core values that guide every decision we make,
              from design to production to community engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-medium mb-4">Sustainability</h3>
              <p className="text-neutral-700 leading-relaxed">
                We're committed to minimizing our environmental footprint through thoughtful 
                material selection, waste reduction, and circular design principles.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Craftsmanship</h3>
              <p className="text-neutral-700 leading-relaxed">
                We honor traditional techniques while embracing innovation, creating 
                pieces that are made to last both physically and aesthetically.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Transparency</h3>
              <p className="text-neutral-700 leading-relaxed">
                We believe in open communication about our processes, materials, 
                and partnerships, fostering trust with our community.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Inclusivity</h3>
              <p className="text-neutral-700 leading-relaxed">
                We design with diverse bodies and backgrounds in mind, creating 
                fashion that empowers and celebrates individuality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;