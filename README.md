# RE_CLAIM.D CMS

A modern content management system for the RE_CLAIM.D fashion website.

## Admin Access

**Default Admin Credentials:**
- Email: `admin@reclaimd.com`
- Password: `admin123456`

## Getting Started

1. Make sure you have connected to Supabase by clicking the "Connect to Supabase" button
2. Run the database migrations to set up the schema
3. Navigate to `/auth/login` to access the admin panel
4. Use the default credentials above to log in

## Features

- **Content Management**: Create and manage blog posts, pages, and media
- **Role-based Access**: Admin, Editor, and Author roles with different permissions
- **SEO Optimization**: Meta titles, descriptions, and URL slugs
- **Media Management**: Upload and organize images and files
- **Menu Management**: Create and organize navigation menus
- **Banner Management**: Create promotional banners for different page sections
- **Collections**: Organize content into themed collections

## Admin Panel Structure

- **Dashboard**: Overview of content and quick actions
- **Posts**: Create and manage blog posts
- **Pages**: Create and manage static pages
- **Media**: Upload and organize media files
- **Menus**: Manage navigation menus
- **Banners**: Create promotional banners
- **Collections**: Organize content collections
- **Settings**: Site-wide configuration

## Security

- Admin-only registration (no public signup)
- Row-level security (RLS) policies
- Role-based permissions
- Secure authentication via Supabase Auth

## Development

This CMS is built with:
- React + TypeScript
- Tailwind CSS
- Supabase (Database + Auth)
- React Router
- React Hook Form
- React Hot Toast

To modify the default admin credentials, update the migration file and create a new admin user in Supabase Auth.