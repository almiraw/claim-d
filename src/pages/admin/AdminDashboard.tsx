import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Layout, Image, Users, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import cmsManager from '../../utils/cms';

const AdminDashboard: React.FC = () => {
  const posts = cmsManager.getPosts();
  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  const pages = cmsManager.getPages();
  const banners = cmsManager.getBanners();

  const stats = [
    {
      title: 'Total Posts',
      value: posts.length,
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
      link: '/admin/posts',
    },
    {
      title: 'Published Posts',
      value: publishedPosts.length,
      change: '+8%',
      changeType: 'positive' as const,
      icon: Eye,
      link: '/admin/posts',
    },
    {
      title: 'Draft Posts',
      value: draftPosts.length,
      change: '+4',
      changeType: 'neutral' as const,
      icon: FileText,
      link: '/admin/posts',
    },
    {
      title: 'Active Banners',
      value: banners.length,
      change: '+2',
      changeType: 'positive' as const,
      icon: Layout,
      link: '/admin/banners',
    },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-neutral-100 rounded-full">
                    <Icon size={24} className="text-neutral-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : stat.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
              <Link
                to="/admin/posts"
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {post.status === 'published' ? 'Published' : 'Draft'} • {post.category}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/posts/new"
                className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors"
              >
                <FileText size={20} className="text-neutral-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Create New Post</span>
              </Link>
              <Link
                to="/admin/pages/new"
                className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors"
              >
                <Layout size={20} className="text-neutral-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Create New Page</span>
              </Link>
              <Link
                to="/admin/banners/new"
                className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors"
              >
                <Image size={20} className="text-neutral-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Create New Banner</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors"
              >
                <TrendingUp size={20} className="text-neutral-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Site Settings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">{publishedPosts.length}</div>
              <div className="text-sm text-gray-600">Published Posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">{pages.length}</div>
              <div className="text-sm text-gray-600">Pages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">{banners.length}</div>
              <div className="text-sm text-gray-600">Active Banners</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;