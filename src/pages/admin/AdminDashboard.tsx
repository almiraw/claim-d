import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Layout, Image, Users, Eye, TrendingUp, Plus, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import AuthGuard from '../../components/auth/AuthGuard';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey || 
          supabaseUrl === 'your_supabase_project_url' || 
          supabaseAnonKey === 'your_supabase_anon_key') {
        setConnectionError(true);
        setLoading(false);
        return;
      }

      // Fetch posts stats
      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
          status, 
          view_count, 
          title, 
          created_at,
          author:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        setConnectionError(true);
        setStats({
          totalPosts: 0,
          publishedPosts: 0,
          draftPosts: 0,
          totalViews: 0,
        });
        setRecentPosts([]);
        return;
      }

      setConnectionError(false);

      if (posts) {
        const totalPosts = posts.length;
        const publishedPosts = posts.filter(p => p.status === 'published').length;
        const draftPosts = posts.filter(p => p.status === 'draft').length;
        const totalViews = posts.reduce((sum, post) => sum + (post.view_count || 0), 0);

        setStats({
          totalPosts,
          publishedPosts,
          draftPosts,
          totalViews,
        });

        setRecentPosts(posts.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setConnectionError(true);
      setStats({
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        totalViews: 0,
      });
      setRecentPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText,
      link: '/admin/posts',
    },
    {
      title: 'Published Posts',
      value: stats.publishedPosts,
      change: '+8%',
      changeType: 'positive' as const,
      icon: Eye,
      link: '/admin/posts',
    },
    {
      title: 'Draft Posts',
      value: stats.draftPosts,
      change: '+4',
      changeType: 'neutral' as const,
      icon: FileText,
      link: '/admin/posts',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      change: '+15%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      link: '/admin/posts',
    },
  ];

  if (loading) {
    return (
      <AuthGuard requireAuthor>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
          </div>
        </AdminLayout>
      </AuthGuard>
    );
  }

  if (connectionError) {
    return (
      <AuthGuard requireAuthor>
        <AdminLayout>
          <div className="space-y-6">
            {/* Connection Error Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertCircle className="text-red-600 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Supabase Connection Error
                  </h3>
                  <p className="text-red-700 mb-4">
                    Unable to connect to your Supabase database. Please configure your environment variables.
                  </p>
                  <div className="bg-red-100 rounded-md p-4 text-sm text-red-800">
                    <p className="font-semibold mb-2">To fix this issue:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">https://supabase.com/dashboard</a></li>
                      <li>Select your project</li>
                      <li>Go to Settings → API</li>
                      <li>Copy your Project URL and anon/public key</li>
                      <li>Update the .env file with these values</li>
                      <li>Restart the development server</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder Dashboard */}
            <div className="bg-white rounded-lg shadow-sm p-6 opacity-50">
              <h2 className="text-2xl font-serif mb-2">Welcome to your CMS Dashboard</h2>
              <p className="text-neutral-600">
                Configure Supabase to manage your content, track performance, and grow your audience.
              </p>
            </div>

            {/* Disabled Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-50">
              {statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.title}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-semibold text-gray-900">--</p>
                      </div>
                      <div className="p-3 bg-neutral-100 rounded-full">
                        <Icon size={24} className="text-neutral-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-sm font-medium text-gray-600">--</span>
                      <span className="text-sm text-gray-500 ml-2">Configure Supabase</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AdminLayout>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requireAuthor>
      <AdminLayout>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-serif mb-2">Welcome to your CMS Dashboard</h2>
            <p className="text-neutral-600">
              Manage your content, track performance, and grow your audience.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => {
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
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <div key={post.id || Math.random()} className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {post.status === 'published' ? 'Published' : 'Draft'} • 
                          {post.author?.full_name || 'Unknown'} • 
                          {format(new Date(post.created_at), 'MMM d, yyyy')}
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
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No posts yet. Create your first post!</p>
                )}
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
                  <Plus size={20} className="text-neutral-600 mr-3" />
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
                  to="/admin/media"
                  className="flex items-center p-3 bg-neutral-50 rounded-md hover:bg-neutral-100 transition-colors"
                >
                  <Image size={20} className="text-neutral-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Upload Media</span>
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
        </div>
      </AdminLayout>
    </AuthGuard>
  );
};

export default AdminDashboard;