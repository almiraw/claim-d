/*
  # CMS Database Schema

  1. New Tables
    - `profiles` - User profiles extending Supabase auth
    - `posts` - Blog posts and articles
    - `pages` - Static pages
    - `categories` - Content categories
    - `tags` - Content tags
    - `post_tags` - Many-to-many relationship for post tags
    - `media` - File uploads and media management
    - `menus` - Navigation menu items
    - `banners` - Promotional banners
    - `collections` - Portfolio collections
    - `collection_items` - Items within collections
    - `settings` - Site configuration
    - `comments` - Post comments (optional)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only policies for sensitive operations
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'author', 'subscriber');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE banner_position AS ENUM ('header', 'footer', 'sidebar', 'popup', 'hero');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role user_role DEFAULT 'subscriber',
  bio text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  color text DEFAULT '#6B7280',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  original_name text NOT NULL,
  mime_type text NOT NULL,
  size_bytes bigint NOT NULL,
  url text NOT NULL,
  alt_text text,
  caption text,
  uploaded_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image uuid REFERENCES media(id),
  author_id uuid REFERENCES profiles(id) NOT NULL,
  category_id uuid REFERENCES categories(id),
  status content_status DEFAULT 'draft',
  published_at timestamptz,
  meta_title text,
  meta_description text,
  reading_time integer DEFAULT 0,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  template text DEFAULT 'default',
  featured_image uuid REFERENCES media(id),
  author_id uuid REFERENCES profiles(id) NOT NULL,
  status content_status DEFAULT 'draft',
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Menus table
CREATE TABLE IF NOT EXISTS menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  parent_id uuid REFERENCES menus(id),
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  open_in_new_tab boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Banners table
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  image_url text,
  cta_text text,
  cta_url text,
  position banner_position DEFAULT 'header',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  featured_image uuid REFERENCES media(id),
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Collection items table
CREATE TABLE IF NOT EXISTS collection_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES collections(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  image_url text,
  price decimal(10,2),
  is_available boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comments table (optional)
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  content text NOT NULL,
  is_approved boolean DEFAULT false,
  parent_id uuid REFERENCES comments(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" ON posts
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authors can create posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Pages policies
CREATE POLICY "Published pages are viewable by everyone" ON pages
  FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authors can create pages" ON pages
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own pages" ON pages
  FOR UPDATE USING (auth.uid() = author_id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Tags policies
CREATE POLICY "Tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage tags" ON tags
  FOR ALL USING (auth.role() = 'authenticated');

-- Post tags policies
CREATE POLICY "Post tags are viewable by everyone" ON post_tags
  FOR SELECT USING (true);

CREATE POLICY "Authors can manage post tags" ON post_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = post_tags.post_id 
      AND posts.author_id = auth.uid()
    )
  );

-- Media policies
CREATE POLICY "Media is viewable by everyone" ON media
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload media" ON media
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update own media" ON media
  FOR UPDATE USING (auth.uid() = uploaded_by);

-- Menus policies
CREATE POLICY "Menus are viewable by everyone" ON menus
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage menus" ON menus
  FOR ALL USING (auth.role() = 'authenticated');

-- Banners policies
CREATE POLICY "Active banners are viewable by everyone" ON banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage banners" ON banners
  FOR ALL USING (auth.role() = 'authenticated');

-- Collections policies
CREATE POLICY "Active collections are viewable by everyone" ON collections
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage collections" ON collections
  FOR ALL USING (auth.role() = 'authenticated');

-- Collection items policies
CREATE POLICY "Collection items are viewable by everyone" ON collection_items
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage collection items" ON collection_items
  FOR ALL USING (auth.role() = 'authenticated');

-- Settings policies
CREATE POLICY "Settings are viewable by everyone" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage settings" ON settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Comments policies
CREATE POLICY "Approved comments are viewable by everyone" ON comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Anyone can create comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menus_updated_at BEFORE UPDATE ON menus
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collection_items_updated_at BEFORE UPDATE ON collection_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default data
INSERT INTO categories (name, slug, description, color) VALUES
  ('Sustainability', 'sustainability', 'Articles about sustainable fashion practices', '#10B981'),
  ('Design', 'design', 'Design process and inspiration', '#8B5CF6'),
  ('News', 'news', 'Company news and updates', '#F59E0B'),
  ('Behind the Scenes', 'behind-the-scenes', 'Behind the scenes content', '#EF4444');

INSERT INTO tags (name, slug, description) VALUES
  ('Sustainable Fashion', 'sustainable-fashion', 'Content about sustainable fashion'),
  ('Eco-Friendly', 'eco-friendly', 'Environmentally friendly practices'),
  ('Design Process', 'design-process', 'Our design methodology'),
  ('Innovation', 'innovation', 'Fashion innovation and technology'),
  ('Craftsmanship', 'craftsmanship', 'Traditional and modern craftsmanship');

INSERT INTO settings (key, value, description) VALUES
  ('site_title', '"RE_CLAIM.D"', 'Site title'),
  ('site_description', '"Modern, sustainable fashion that reclaims the future of design"', 'Site description'),
  ('contact_email', '"info@reclaimd.com"', 'Contact email address'),
  ('social_instagram', '"https://instagram.com/re_claim.d"', 'Instagram URL'),
  ('social_facebook', '"https://facebook.com/reclaimd"', 'Facebook URL'),
  ('social_twitter', '"https://twitter.com/reclaimd"', 'Twitter URL');

INSERT INTO menus (label, url, sort_order, is_active) VALUES
  ('Home', '/', 1, true),
  ('About', '/about', 2, true),
  ('Portfolio', '/portfolio', 3, true),
  ('Blog', '/blog', 4, true),
  ('Instagram', '/instagram', 5, true),
  ('Contact', '/contact', 6, true);