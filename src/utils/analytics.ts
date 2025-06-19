// Simple analytics tracking module
// In a real application, this would integrate with Google Analytics, Mixpanel, etc.

interface PageView {
  page: string;
  timestamp: Date;
  referrer?: string;
}

interface Event {
  name: string;
  properties: Record<string, any>;
  timestamp: Date;
}

class Analytics {
  private pageViews: PageView[] = [];
  private events: Event[] = [];
  private isInitialized = false;

  init() {
    if (this.isInitialized) return;
    console.log('Analytics initialized');
    this.isInitialized = true;
    
    // In a real implementation, this would initialize your analytics provider
  }

  // Track page views
  trackPageView(page: string, referrer?: string) {
    if (!this.isInitialized) this.init();
    
    const pageView: PageView = {
      page,
      timestamp: new Date(),
      referrer,
    };
    
    this.pageViews.push(pageView);
    console.log('Page view tracked:', pageView);
    
    // In a real implementation, this would send data to your analytics provider
  }

  // Track custom events
  trackEvent(name: string, properties: Record<string, any> = {}) {
    if (!this.isInitialized) this.init();
    
    const event: Event = {
      name,
      properties,
      timestamp: new Date(),
    };
    
    this.events.push(event);
    console.log('Event tracked:', event);
    
    // In a real implementation, this would send data to your analytics provider
  }

  // Get analytics data (for demonstration purposes)
  getPageViews() {
    return this.pageViews;
  }

  getEvents() {
    return this.events;
  }
}

// Create a singleton instance
const analytics = new Analytics();

export default analytics;