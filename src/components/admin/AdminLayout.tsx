import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Image, 
  Layout, 
  Menu, 
  Settings, 
  Users,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../ui/Logo';
import toast from 'react-hot-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admin', roles: ['admin', 'editor', 'author'] },
    { icon: FileText, label: 'Posts', path: '/admin/posts', roles: ['admin', 'editor', 'author'] },
    { icon: Layout, label: 'Pages', path: '/admin/pages', roles: ['admin', 'editor'] },
    { icon: Image, label: 'Media', path: '/admin/media', roles: ['admin', 'editor', 'author'] },
    { icon: Menu, label: 'Menus', path: '/admin/menus', roles: ['admin', 'editor'] },
    { icon: Layout, label: 'Banners', path: '/admin/banners', roles: ['admin', 'editor'] },
    { icon: Image, label: 'Collections', path: '/admin/collections', roles: ['admin', 'editor'] },
    { icon: Users, label: 'Users', path: '/admin/users', roles: ['admin'] },
    { icon: Settings, label: 'Settings', path: '/admin/settings', roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    profile && item.roles.includes(profile.role)
  );

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Signed out successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center">
                <Logo />
                <span className="ml-2 text-sm text-gray-500">CMS</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-neutral-100 text-neutral-900 border-r-2 border-neutral-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          {!sidebarCollapsed && profile && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{profile.full_name}</p>
                  <p className="text-xs text-gray-500 capitalize">{profile.role}</p>
                </div>
              </div>
            </div>
          )}
          
          <Link
            to="/"
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <Home size={20} />
            {!sidebarCollapsed && <span className="ml-3">View Site</span>}
          </Link>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors w-full"
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {filteredMenuItems.find(item => isActive(item.path))?.label || 'Admin'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome back, {profile?.full_name || 'User'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;