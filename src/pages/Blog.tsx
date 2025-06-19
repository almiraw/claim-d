import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import cmsManager from '../utils/cms';

const Blog: React.FC = () => {
  const posts = cmsManager.getPosts('published');
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Our Blog</h1>
          <p className="text-xl text-neutral-700 leading-relaxed">
            Insights, stories, and updates from the world of sustainable fashion
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <Link to={`/blog/${featuredPost.slug}`} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="order-2 lg:order-1 p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-neutral-600 mb-4">
                    <Calendar size={16} className="mr-2" />
                    {featuredPost.publishedAt?.toLocaleDateString()}
                    <span className="mx-2">•</span>
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-neutral-700 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-neutral-900 font-medium group-hover:text-neutral-700 transition-colors">
                    Read more
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-neutral-600 mb-3">
                      <Calendar size={14} className="mr-2" />
                      {post.publishedAt?.toLocaleDateString()}
                      <span className="mx-2">•</span>
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium mb-3 group-hover:text-neutral-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-neutral-900 text-sm font-medium group-hover:text-neutral-700 transition-colors">
                      Read more
                      <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;