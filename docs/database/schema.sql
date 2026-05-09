-- Ekvira Lights Database Schema
-- Uses dedicated 'ekvira' schema so this DB can be shared across projects
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create dedicated schema for this project
CREATE SCHEMA IF NOT EXISTS ekvira;

-- Create users table (extends Supabase auth.users)
CREATE TABLE ekvira.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_info table
CREATE TABLE ekvira.business_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Ekvira Lights',
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  business_hours TEXT DEFAULT 'Monday - Saturday: 9:00 AM - 7:00 PM, Sunday: 10:00 AM - 5:00 PM',
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE ekvira.services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'lightbulb',
  features TEXT[] DEFAULT '{}',
  price_range TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE ekvira.gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('wedding', 'party', 'corporate', 'stage')),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE ekvira.inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL CHECK (service IN ('sharpy', 'blinder', 'bottom', 'laser', 'full_setup', 'other')),
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_ekvira_gallery_category ON ekvira.gallery(category);
CREATE INDEX idx_ekvira_gallery_featured ON ekvira.gallery(is_featured);
CREATE INDEX idx_ekvira_inquiries_status ON ekvira.inquiries(status);
CREATE INDEX idx_ekvira_inquiries_created_at ON ekvira.inquiries(created_at DESC);
CREATE INDEX idx_ekvira_services_active ON ekvira.services(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION ekvira.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON ekvira.users FOR EACH ROW EXECUTE FUNCTION ekvira.update_updated_at_column();
CREATE TRIGGER update_business_info_updated_at BEFORE UPDATE ON ekvira.business_info FOR EACH ROW EXECUTE FUNCTION ekvira.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON ekvira.services FOR EACH ROW EXECUTE FUNCTION ekvira.update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON ekvira.gallery FOR EACH ROW EXECUTE FUNCTION ekvira.update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON ekvira.inquiries FOR EACH ROW EXECUTE FUNCTION ekvira.update_updated_at_column();

-- Insert default business info
INSERT INTO ekvira.business_info (name, phone, email, address, social_links) VALUES (
  'Ekvira Lights',
  '+91 77218 73991',
  'info@ekviralights.com',
  'Shemba, Tq. Nandura, Dist. Buldhana, Maharashtra',
  '{"facebook": "", "instagram": "", "whatsapp": "+917721873991", "youtube": ""}'
);

-- Insert default services (light types available on rent)
INSERT INTO ekvira.services (title, description, icon, features, order_index) VALUES 
(
  'Sharpy Lights',
  'Powerful beam lights with sharp, focused beams. Perfect for creating dramatic aerial effects at any event.',
  'zap',
  ARRAY['Sharp Focused Beam', 'Pan & Tilt Movement', 'Color Wheel', 'Gobo Patterns'],
  1
),
(
  'Blinder Lights',
  'High-intensity audience blinder lights that create stunning flash effects and energy bursts on the dance floor.',
  'sun',
  ARRAY['High Intensity Flash', 'Audience Blinding Effect', 'Warm White Output', 'DMX Compatible'],
  2
),
(
  'Bottom Lights',
  'LED uplighting and floor wash lights that set the mood with vibrant colors from the ground up.',
  'arrow-down',
  ARRAY['RGB Color Mixing', 'Floor Wash Effect', 'Uplighting', 'Multiple Modes'],
  3
),
(
  'Laser Lights',
  'Multi-color laser lights with patterns and effects that transform any venue into a visual spectacle.',
  'sparkles',
  ARRAY['Multi-Color Lasers', 'Pattern Effects', 'Sound Activated', 'Wide Coverage'],
  4
);

-- Insert sample gallery items
INSERT INTO ekvira.gallery (title, description, image_url, category, is_featured, order_index) VALUES 
(
  'Wedding Sharpy Setup',
  'Sharpy beams creating dramatic effects at a wedding reception',
  '/images/gallery/wedding-sharpy.jpg',
  'wedding',
  true,
  1
),
(
  'Party Laser Show',
  'Multi-color laser lights at a birthday party',
  '/images/gallery/party-laser.jpg',
  'party',
  true,
  2
),
(
  'Corporate Event Blinders',
  'Blinder lights adding energy to a corporate event',
  '/images/gallery/corporate-blinder.jpg',
  'corporate',
  false,
  3
),
(
  'Stage Bottom Lights',
  'Bottom LED wash lights setting the mood at a live stage show',
  '/images/gallery/stage-bottom.jpg',
  'stage',
  true,
  4
);
