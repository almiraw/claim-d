export interface CMSPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  template: 'default' | 'hero' | 'portfolio' | 'contact';
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSPoster {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  link?: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSBanner {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  position: 'header' | 'footer' | 'sidebar' | 'popup';
  isActive: boolean;
  displayOrder: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSMenuItem {
  id: string;
  label: string;
  url: string;
  parentId?: string;
  displayOrder: number;
  isActive: boolean;
  openInNewTab: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSCollection {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  items: CollectionItem[];
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  isAvailable: boolean;
}

export interface CMSSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  seoSettings: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    googleAnalyticsId?: string;
  };
}