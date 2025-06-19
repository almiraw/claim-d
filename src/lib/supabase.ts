import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Create a fallback client if env vars are missing (for development)
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder-key';

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error.message);
  } else {
    console.log('Supabase connected successfully');
  }
}).catch(err => {
  console.error('Failed to test Supabase connection:', err);
});

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'admin' | 'editor' | 'author' | 'subscriber';
          bio: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'editor' | 'author' | 'subscriber';
          bio?: string | null;
          website?: string | null;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'editor' | 'author' | 'subscriber';
          bio?: string | null;
          website?: string | null;
        };
      };
      posts: {
        Row: {
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
        };
        Insert: {
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          featured_image?: string | null;
          author_id: string;
          category_id?: string | null;
          status?: 'draft' | 'published' | 'archived';
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          reading_time?: number;
          view_count?: number;
        };
        Update: {
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          category_id?: string | null;
          status?: 'draft' | 'published' | 'archived';
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          reading_time?: number;
          view_count?: number;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
          color?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          color?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
        };
      };
      menus: {
        Row: {
          id: string;
          label: string;
          url: string;
          parent_id: string | null;
          sort_order: number;
          is_active: boolean;
          open_in_new_tab: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          label: string;
          url: string;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          open_in_new_tab?: boolean;
        };
        Update: {
          label?: string;
          url?: string;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          open_in_new_tab?: boolean;
        };
      };
    };
  };
}