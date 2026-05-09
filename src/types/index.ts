// Common types used throughout the application

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: 'sharpy' | 'blinder' | 'bottom' | 'laser' | 'full_setup' | 'other';
  message: string;
  status: 'new' | 'in_progress' | 'completed' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: 'wedding' | 'party' | 'corporate' | 'stage';
  is_featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price_range?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface BusinessInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  business_hours: string;
  social_links: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    youtube?: string;
  };
  updated_at: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  event_date?: string;
  message: string;
}

export interface AdminLoginData {
  email: string;
  password: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Locale types
export type Locale = 'en' | 'mr';

// Navigation types
export interface NavItem {
  href: string;
  label: string;
  icon?: string;
}

// Component prop types
export interface PageProps {
  params: {
    locale: Locale;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Supabase types
export interface Database {
  public: {
    Tables: {
      inquiries: {
        Row: Inquiry;
        Insert: Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Inquiry, 'id' | 'created_at'>>;
      };
      gallery: {
        Row: GalleryItem;
        Insert: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<GalleryItem, 'id' | 'created_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      business_info: {
        Row: BusinessInfo;
        Insert: Omit<BusinessInfo, 'id' | 'updated_at'>;
        Update: Partial<Omit<BusinessInfo, 'id'>>;
      };
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
    };
  };
}
