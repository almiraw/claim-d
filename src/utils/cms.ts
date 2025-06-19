import { 
  CMSPost, 
  CMSPage, 
  CMSPoster, 
  CMSBanner, 
  CMSMenuItem, 
  CMSCollection,
  CMSSettings 
} from '../types/cms';

class CMSManager {
  private posts: CMSPost[] = [];
  private pages: CMSPage[] = [];
  private posters: CMSPoster[] = [];
  private banners: CMSBanner[] = [];
  private menuItems: CMSMenuItem[] = [];
  private collections: CMSCollection[] = [];
  private settings: CMSSettings;

  constructor() {
    this.settings = this.getDefaultSettings();
    this.initializeDefaultData();
  }

  private getDefaultSettings(): CMSSettings {
    return {
      siteName: 'RE_CLAIM.D',
      siteDescription: 'Modern, sustainable fashion that reclaims the future of design',
      logo: '/logo.svg',
      favicon: '/favicon.ico',
      contactEmail: 'info@reclaimd.com',
      contactPhone: '+1 (212) 555-1234',
      address: '123 Fashion Avenue, New York, NY 10001',
      socialMedia: {
        instagram: 'https://instagram.com/re_claim.d',
        facebook: 'https://facebook.com/reclaimd',
        twitter: 'https://twitter.com/reclaimd',
      },
      seoSettings: {
        defaultMetaTitle: 'RE_CLAIM.D | Sustainable Fashion Design',
        defaultMetaDescription: 'Modern, sustainable fashion that reclaims the future of design. Each piece tells a story of conscious craftsmanship and innovative style.',
      },
    };
  }

  private initializeDefaultData() {
    // Initialize with sample data
    this.posts = [
      {
        id: '1',
        title: 'The Future of Sustainable Fashion',
        slug: 'future-sustainable-fashion',
        content: 'Exploring how sustainable practices are reshaping the fashion industry...',
        excerpt: 'A deep dive into sustainable fashion trends and innovations.',
        featuredImage: 'https://images.pexels.com/photos/6626876/pexels-photo-6626876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'sustainability',
        tags: ['sustainability', 'fashion', 'innovation'],
        status: 'published',
        publishedAt: new Date('2024-01-15'),
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Behind the Scenes: Our Design Process',
        slug: 'behind-scenes-design-process',
        content: 'Take a look at how we create our sustainable collections...',
        excerpt: 'An inside look at our creative and sustainable design process.',
        featuredImage: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        category: 'design',
        tags: ['design', 'process', 'craftsmanship'],
        status: 'published',
        publishedAt: new Date('2024-01-20'),
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-20'),
      },
    ];

    this.banners = [
      {
        id: '1',
        title: 'New Collection Launch',
        content: 'Discover our latest sustainable collection - now available!',
        imageUrl: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ctaText: 'Shop Now',
        ctaLink: '/portfolio',
        position: 'header',
        isActive: true,
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.menuItems = [
      { id: '1', label: 'Home', url: '/', displayOrder: 1, isActive: true, openInNewTab: false, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', label: 'About', url: '/about', displayOrder: 2, isActive: true, openInNewTab: false, createdAt: new Date(), updatedAt: new Date() },
      { id: '3', label: 'Portfolio', url: '/portfolio', displayOrder: 3, isActive: true, openInNewTab: false, createdAt: new Date(), updatedAt: new Date() },
      { id: '4', label: 'Blog', url: '/blog', displayOrder: 4, isActive: true, openInNewTab: false, createdAt: new Date(), updatedAt: new Date() },
      { id: '5', label: 'Instagram', url: '/instagram', displayOrder: 5, isActive: true, openInNewTab: false, createdAt: new Date(), updatedAt: new Date() },
      { id: '6', label: 'Contact', url: '/contact', displayOrder: 6, isActive: true, openInNewTab: false, createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  // Posts management
  getPosts(status?: 'draft' | 'published'): CMSPost[] {
    return status ? this.posts.filter(post => post.status === status) : this.posts;
  }

  getPostBySlug(slug: string): CMSPost | undefined {
    return this.posts.find(post => post.slug === slug && post.status === 'published');
  }

  createPost(postData: Omit<CMSPost, 'id' | 'createdAt' | 'updatedAt'>): CMSPost {
    const newPost: CMSPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id: string, updates: Partial<CMSPost>): CMSPost | null {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return null;
    
    this.posts[index] = { ...this.posts[index], ...updates, updatedAt: new Date() };
    return this.posts[index];
  }

  deletePost(id: string): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return false;
    
    this.posts.splice(index, 1);
    return true;
  }

  // Pages management
  getPages(): CMSPage[] {
    return this.pages;
  }

  getPageBySlug(slug: string): CMSPage | undefined {
    return this.pages.find(page => page.slug === slug && page.status === 'published');
  }

  createPage(pageData: Omit<CMSPage, 'id' | 'createdAt' | 'updatedAt'>): CMSPage {
    const newPage: CMSPage = {
      ...pageData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.pages.push(newPage);
    return newPage;
  }

  updatePage(id: string, updates: Partial<CMSPage>): CMSPage | null {
    const index = this.pages.findIndex(page => page.id === id);
    if (index === -1) return null;
    
    this.pages[index] = { ...this.pages[index], ...updates, updatedAt: new Date() };
    return this.pages[index];
  }

  deletePage(id: string): boolean {
    const index = this.pages.findIndex(page => page.id === id);
    if (index === -1) return false;
    
    this.pages.splice(index, 1);
    return true;
  }

  // Banners management
  getBanners(position?: string): CMSBanner[] {
    const activeBanners = this.banners.filter(banner => banner.isActive);
    return position 
      ? activeBanners.filter(banner => banner.position === position)
      : activeBanners;
  }

  createBanner(bannerData: Omit<CMSBanner, 'id' | 'createdAt' | 'updatedAt'>): CMSBanner {
    const newBanner: CMSBanner = {
      ...bannerData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.banners.push(newBanner);
    return newBanner;
  }

  updateBanner(id: string, updates: Partial<CMSBanner>): CMSBanner | null {
    const index = this.banners.findIndex(banner => banner.id === id);
    if (index === -1) return null;
    
    this.banners[index] = { ...this.banners[index], ...updates, updatedAt: new Date() };
    return this.banners[index];
  }

  deleteBanner(id: string): boolean {
    const index = this.banners.findIndex(banner => banner.id === id);
    if (index === -1) return false;
    
    this.banners.splice(index, 1);
    return true;
  }

  // Menu management
  getMenuItems(): CMSMenuItem[] {
    return this.menuItems
      .filter(item => item.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createMenuItem(itemData: Omit<CMSMenuItem, 'id' | 'createdAt' | 'updatedAt'>): CMSMenuItem {
    const newItem: CMSMenuItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.menuItems.push(newItem);
    return newItem;
  }

  updateMenuItem(id: string, updates: Partial<CMSMenuItem>): CMSMenuItem | null {
    const index = this.menuItems.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this.menuItems[index] = { ...this.menuItems[index], ...updates, updatedAt: new Date() };
    return this.menuItems[index];
  }

  deleteMenuItem(id: string): boolean {
    const index = this.menuItems.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.menuItems.splice(index, 1);
    return true;
  }

  // Collections management
  getCollections(): CMSCollection[] {
    return this.collections.filter(collection => collection.isActive);
  }

  createCollection(collectionData: Omit<CMSCollection, 'id' | 'createdAt' | 'updatedAt'>): CMSCollection {
    const newCollection: CMSCollection = {
      ...collectionData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.collections.push(newCollection);
    return newCollection;
  }

  updateCollection(id: string, updates: Partial<CMSCollection>): CMSCollection | null {
    const index = this.collections.findIndex(collection => collection.id === id);
    if (index === -1) return null;
    
    this.collections[index] = { ...this.collections[index], ...updates, updatedAt: new Date() };
    return this.collections[index];
  }

  deleteCollection(id: string): boolean {
    const index = this.collections.findIndex(collection => collection.id === id);
    if (index === -1) return false;
    
    this.collections.splice(index, 1);
    return true;
  }

  // Settings management
  getSettings(): CMSSettings {
    return this.settings;
  }

  updateSettings(updates: Partial<CMSSettings>): CMSSettings {
    this.settings = { ...this.settings, ...updates };
    return this.settings;
  }

  // Posters management
  getPosters(): CMSPoster[] {
    return this.posters.filter(poster => poster.isActive);
  }

  createPoster(posterData: Omit<CMSPoster, 'id' | 'createdAt' | 'updatedAt'>): CMSPoster {
    const newPoster: CMSPoster = {
      ...posterData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posters.push(newPoster);
    return newPoster;
  }

  updatePoster(id: string, updates: Partial<CMSPoster>): CMSPoster | null {
    const index = this.posters.findIndex(poster => poster.id === id);
    if (index === -1) return null;
    
    this.posters[index] = { ...this.posters[index], ...updates, updatedAt: new Date() };
    return this.posters[index];
  }

  deletePoster(id: string): boolean {
    const index = this.posters.findIndex(poster => poster.id === id);
    if (index === -1) return false;
    
    this.posters.splice(index, 1);
    return true;
  }
}

// Create singleton instance
const cmsManager = new CMSManager();
export default cmsManager;