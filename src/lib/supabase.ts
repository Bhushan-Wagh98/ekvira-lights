import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'ekvira' },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Server-side Supabase client with service role key (only use in API routes/server components)
export const supabaseAdmin = typeof window === 'undefined'
  ? createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      {
        db: { schema: 'ekvira' },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
  : null;

// Database helper functions
export const db = {
  // Inquiries
  async createInquiry(data: Database['public']['Tables']['inquiries']['Insert']) {
    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return inquiry;
  },

  async getInquiries() {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateInquiryStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Gallery
  async getGalleryItems() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createGalleryItem(data: Database['public']['Tables']['gallery']['Insert']) {
    const { data: item, error } = await supabase
      .from('gallery')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return item;
  },

  async updateGalleryItem(id: string, data: Database['public']['Tables']['gallery']['Update']) {
    const { data: item, error } = await supabase
      .from('gallery')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return item;
  },

  async deleteGalleryItem(id: string) {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Services
  async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createService(data: Database['public']['Tables']['services']['Insert']) {
    const { data: service, error } = await supabase
      .from('services')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return service;
  },

  async updateService(id: string, data: Database['public']['Tables']['services']['Update']) {
    const { data: service, error } = await supabase
      .from('services')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return service;
  },

  // Business Info
  async getBusinessInfo() {
    const { data, error } = await supabase
      .from('business_info')
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateBusinessInfo(data: Database['public']['Tables']['business_info']['Update']) {
    const { data: info, error } = await supabase
      .from('business_info')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', '1') // Assuming single business info record
      .select()
      .single();
    
    if (error) throw error;
    return info;
  },
};