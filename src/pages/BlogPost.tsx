import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import cmsManager from '../utils/cms';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? cmsManager.getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="pt-24 container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-serif mb-4">Post Not Found</h1>
        <p className="text-neutral-600 mb-8">The post you're looking for doesn't exist.</p>
        <Link to="/blog" className="text-neutral-900 hover:text-neutral-700 transition-colors">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="container mx-auto px-4 py-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </Link>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Meta Information */}
          <div className="flex items-center text-sm text-neutral-600 mb-6">
            <Calendar size={16} className="mr-2" />
            {post.publishedAt?.toLocaleDateString()}
            <span className="mx-3">•</span>
            <span className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-neutral-700 leading-relaxed mb-8 font-light">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-neutral-800">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={16} className="text-neutral-600 mr-2" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif mb-8 text-center">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cmsManager.getPosts('published')
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-2 group-hover:text-neutral-700 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;