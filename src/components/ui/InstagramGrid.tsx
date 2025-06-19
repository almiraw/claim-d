import React from 'react';
import { Instagram } from 'lucide-react';

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  link: string;
}

interface InstagramGridProps {
  posts: InstagramPost[];
}

const InstagramGrid: React.FC<InstagramGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
      {posts.map((post) => (
        <a 
          key={post.id}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group overflow-hidden"
        >
          <img
            src={post.imageUrl}
            alt="Instagram post"
            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
            <div className="text-white text-center">
              <div className="flex items-center justify-center space-x-4">
                <span className="flex items-center">
                  <span className="mr-1">♥</span> {post.likes}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">💬</span> {post.comments}
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default InstagramGrid;