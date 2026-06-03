export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  image: string;
  createdAt: any; // Firestore Timestamp
  views: number;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  dateTime: string; // ISO string
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: any; // Firestore Timestamp
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'answered';
  aiDraft?: string;
  createdAt: any; // Firestore Timestamp
}

export interface Newsletter {
  id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  createdAt: any; // Firestore Timestamp
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string; // Base64 or URL
  createdAt?: any;
}
