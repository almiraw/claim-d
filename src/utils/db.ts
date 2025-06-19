interface Customer {
  id: string;
  name: string;
  email: string;
  preferences: string;
  createdAt: Date;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// This is a simple in-memory database for demonstration purposes
// In a real application, you would connect to a real database
class Database {
  private customers: Customer[] = [];
  private messages: ContactMessage[] = [];

  // Newsletter subscribers
  addCustomer(name: string, email: string, preferences: string): Customer {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name,
      email,
      preferences,
      createdAt: new Date(),
    };
    this.customers.push(newCustomer);
    console.log('Added new customer:', newCustomer);
    return newCustomer;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  // Contact form messages
  addMessage(name: string, email: string, subject: string, message: string): ContactMessage {
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    };
    this.messages.push(newMessage);
    console.log('Added new message:', newMessage);
    return newMessage;
  }

  getMessages(): ContactMessage[] {
    return this.messages;
  }
}

// Create a singleton instance
const db = new Database();

export default db;