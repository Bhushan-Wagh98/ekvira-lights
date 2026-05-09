-- Row Level Security (RLS) Policies for Ekvira Lights
-- Uses 'ekvira' schema - Run this AFTER creating the schema

-- Enable RLS on all tables
ALTER TABLE ekvira.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ekvira.business_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE ekvira.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE ekvira.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE ekvira.inquiries ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON ekvira.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON ekvira.users
  FOR UPDATE USING (auth.uid() = id);

-- Business info policies (public read, admin write)
CREATE POLICY "Anyone can view business info" ON ekvira.business_info
  FOR SELECT USING (true);

CREATE POLICY "Only admins can update business info" ON ekvira.business_info
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Services policies (public read, admin write)
CREATE POLICY "Anyone can view active services" ON ekvira.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can view all services" ON ekvira.services
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can insert services" ON ekvira.services
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update services" ON ekvira.services
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete services" ON ekvira.services
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Gallery policies (public read, admin write)
CREATE POLICY "Anyone can view gallery items" ON ekvira.gallery
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert gallery items" ON ekvira.gallery
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update gallery items" ON ekvira.gallery
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete gallery items" ON ekvira.gallery
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Inquiries policies (anyone can insert, admin can view/update)
CREATE POLICY "Anyone can submit inquiries" ON ekvira.inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view inquiries" ON ekvira.inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update inquiries" ON ekvira.inquiries
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM ekvira.users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Function to handle new user registration (adds to ekvira.users)
CREATE OR REPLACE FUNCTION ekvira.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO ekvira.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created_ekvira
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION ekvira.handle_new_user();

-- Grant usage on schema to authenticated and anon roles
GRANT USAGE ON SCHEMA ekvira TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA ekvira TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA ekvira TO anon, authenticated;
