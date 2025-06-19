import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Save, Eye, FileText, Image, Tag, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { usePosts } from '../../hooks/usePosts';
import type { Post } from '../../types/cms';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, createPost, updatePost, loading } = usePosts();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
  });

  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (isEditing && id && posts.length > 0) {
      const post = posts.find(p => p.id === id);
      if (post) {
        setFormData(post);
      }
    }
  }, [isEditing, id, posts]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const postData = {
        ...formData,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
      };

      if (isEditing && id) {
        await updatePost(id, postData);
        toast.success('Post updated successfully');
      } else {
        await createPost(postData);
        toast.success('Post created successfully');
      }

      navigate('/admin/posts');
    } catch (error) {
      toast.error('Failed to save post');
      console.error('Error saving post:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/posts')}
              className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Posts</span>
            </button>
            <div className="h-6 w-px bg-neutral-300" />
            <h1 className="text-2xl font-bold text-neutral-900">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg hover:border-neutral-400 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
            
            <button
              onClick={() => handleSubmit('draft')}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg hover:border-neutral-400 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={() => handleSubmit('published')}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              <span>Publish</span>
            </button>
          </div>
        </div>

        {isPreview ? (
          /* Preview Mode */
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <article className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {formData.title || 'Untitled Post'}
              </h1>
              
              {formData.excerpt && (
                <p className="text-xl text-neutral-600 mb-8 font-medium">
                  {formData.excerpt}
                </p>
              )}

              <div className="prose prose-neutral max-w-none">
                {formData.content ? (
                  <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br>') }} />
                ) : (
                  <p className="text-neutral-500 italic">No content yet...</p>
                )}
              </div>
            </article>
          </div>
        ) : (
          /* Edit Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-neutral-600" />
                  <h2 className="text-lg font-semibold text-neutral-900">Content</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title || ''}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-lg"
                      placeholder="Enter post title..."
                    />
                  </div>

                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-neutral-700 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                      placeholder="post-url-slug"
                    />
                  </div>

                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-neutral-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      id="excerpt"
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                      placeholder="Brief description of the post..."
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      id="content"
                      value={formData.content || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={20}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none font-mono text-sm"
                      placeholder="Write your post content here..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-neutral-600" />
                  <h3 className="text-lg font-semibold text-neutral-900">Status</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Publication Status
                    </label>
                    <select
                      value={formData.status || 'draft'}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-neutral-600" />
                  <h3 className="text-lg font-semibold text-neutral-900">SEO</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="meta_title" className="block text-sm font-medium text-neutral-700 mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      id="meta_title"
                      value={formData.meta_title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                      placeholder="SEO title..."
                    />
                  </div>

                  <div>
                    <label htmlFor="meta_description" className="block text-sm font-medium text-neutral-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      id="meta_description"
                      value={formData.meta_description || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                      placeholder="SEO description..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PostEditor;