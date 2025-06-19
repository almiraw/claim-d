// Type definitions for the project

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  link: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  category: 'collection' | 'project';
  images: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  preferences: string;
  createdAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}