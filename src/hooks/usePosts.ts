import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author_id: string;
  category_id: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  reading_time: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  // Joined data
  author?: {
    full_name: string;
    email: string;
  };
  category?: {
    name: string;
    slug: string;
    color: string;
  };
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

interface CreatePostData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_id?: string;
  status?: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
}

interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPosts = async (status?: 'draft' | 'published' | 'archived') => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('posts')
        .select(`
          *,
          author:profiles(full_name, email),
          category:categories(name, slug, color)
        `)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPostBySlug = async (slug: string): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles(full_name, email),
          category:categories(name, slug, color),
          tags:post_tags(tag:tags(id, name, slug))
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        throw error;
      }

      // Increment view count
      await supabase
        .from('posts')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);

      return data;
    } catch (err) {
      console.error('Error fetching post:', err);
      return null;
    }
  };

  const createPost = async (postData: CreatePostData): Promise<Post | null> => {
    if (!user) {
      toast.error('You must be logged in to create posts');
      return null;
    }

    try {
      const slug = postData.slug || generateSlug(postData.title);
      const readingTime = calculateReadingTime(postData.content);

      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          slug,
          author_id: user.id,
          reading_time: readingTime,
          published_at: postData.status === 'published' ? new Date().toISOString() : null,
        })
        .select(`
          *,
          author:profiles(full_name, email),
          category:categories(name, slug, color)
        `)
        .single();

      if (error) {
        throw error;
      }

      // Handle tags if provided
      if (postData.tags && postData.tags.length > 0) {
        await handlePostTags(data.id, postData.tags);
      }

      toast.success('Post created successfully!');
      await fetchPosts(); // Refresh the posts list
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      toast.error(errorMessage);
      return null;
    }
  };

  const updatePost = async (postData: UpdatePostData): Promise<Post | null> => {
    if (!user) {
      toast.error('You must be logged in to update posts');
      return null;
    }

    try {
      const { id, tags, ...updateData } = postData;
      
      if (updateData.content) {
        updateData.reading_time = calculateReadingTime(updateData.content);
      }

      if (updateData.status === 'published' && !updateData.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          author:profiles(full_name, email),
          category:categories(name, slug, color)
        `)
        .single();

      if (error) {
        throw error;
      }

      // Handle tags if provided
      if (tags) {
        await handlePostTags(id, tags);
      }

      toast.success('Post updated successfully!');
      await fetchPosts(); // Refresh the posts list
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      toast.error(errorMessage);
      return null;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to delete posts');
      return false;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('Post deleted successfully!');
      await fetchPosts(); // Refresh the posts list
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      toast.error(errorMessage);
      return false;
    }
  };

  const handlePostTags = async (postId: string, tagNames: string[]) => {
    try {
      // First, remove existing tags
      await supabase
        .from('post_tags')
        .delete()
        .eq('post_id', postId);

      if (tagNames.length === 0) return;

      // Get or create tags
      const tagIds: string[] = [];
      for (const tagName of tagNames) {
        const slug = generateSlug(tagName);
        
        // Try to get existing tag
        let { data: existingTag } = await supabase
          .from('tags')
          .select('id')
          .eq('slug', slug)
          .single();

        if (!existingTag) {
          // Create new tag
          const { data: newTag } = await supabase
            .from('tags')
            .insert({ name: tagName, slug })
            .select('id')
            .single();
          
          if (newTag) {
            tagIds.push(newTag.id);
          }
        } else {
          tagIds.push(existingTag.id);
        }
      }

      // Create post-tag relationships
      if (tagIds.length > 0) {
        const postTags = tagIds.map(tagId => ({
          post_id: postId,
          tag_id: tagId,
        }));

        await supabase
          .from('post_tags')
          .insert(postTags);
      }
    } catch (err) {
      console.error('Error handling post tags:', err);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost,
  };
}