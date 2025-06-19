import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import InstagramFeed from './pages/InstagramFeed';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PostsManager from './pages/admin/PostsManager';
import PostEditor from './components/admin/PostEditor';

// Components
import DynamicHeader from './components/layout/DynamicHeader';
import Footer from './components/layout/Footer';
import NewsletterPopup from './components/ui/NewsletterPopup';

function App() {
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  useEffect(() => {
    // Show newsletter popup after 5 seconds
    const timer = setTimeout(() => {
      // Check if user has already seen the popup
      const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
      if (!hasSeenPopup) {
        setShowNewsletterPopup(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowNewsletterPopup(false);
    // Set flag in localStorage to prevent popup from showing again
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/posts" element={<PostsManager />} />
          <Route path="/admin/posts/new" element={<PostEditor />} />
          <Route path="/admin/posts/:id/edit" element={<PostEditor />} />
          
          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <DynamicHeader />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/instagram" element={<InstagramFeed />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              {showNewsletterPopup && (
                <NewsletterPopup onClose={handleClosePopup} />
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;