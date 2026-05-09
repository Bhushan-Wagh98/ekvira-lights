import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'ekvira-lights.db');

// Create database connection
export const db = new Database(dbPath);

// Initialize database with tables
export function initializeDatabase() {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS business_info (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL DEFAULT 'Ekvira Lights',
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      business_hours TEXT DEFAULT 'Monday - Saturday: 9:00 AM - 7:00 PM, Sunday: 10:00 AM - 5:00 PM',
      social_links TEXT DEFAULT '{}',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT DEFAULT 'lightbulb',
      features TEXT DEFAULT '[]',
      price_range TEXT,
      is_active BOOLEAN DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      category TEXT NOT NULL CHECK (category IN ('residential', 'commercial', 'outdoor', 'smart')),
      is_featured BOOLEAN DEFAULT 0,
      order_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'closed')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert sample data
  const insertBusinessInfo = db.prepare(`
    INSERT OR REPLACE INTO business_info (id, name, phone, email, address, social_links) 
    VALUES (1, 'Ekvira Lights', '+91-9876543210', 'info@ekviralights.com', 'Mumbai, Maharashtra, India', '{"facebook": "", "instagram": "", "whatsapp": "+919876543210"}')
  `);

  const insertService = db.prepare(`
    INSERT OR REPLACE INTO services (id, title, description, icon, features, order_index) 
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertGalleryItem = db.prepare(`
    INSERT OR REPLACE INTO gallery (id, title, description, image_url, category, is_featured, order_index) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAdmin = db.prepare(`
    INSERT OR REPLACE INTO users (id, email, password_hash, role) 
    VALUES ('admin-1', 'admin@ekviralights.com', '$2a$10$example.hash.here', 'admin')
  `);

  // Execute inserts
  insertBusinessInfo.run();
  insertAdmin.run();

  // Insert services
  const services = [
    ['service-1', 'Residential Lighting', 'Beautiful home lighting designs that create the perfect ambiance for every room.', 'home', '["LED Strip Lighting", "Ceiling Fixtures", "Wall Sconces", "Smart Controls"]', 1],
    ['service-2', 'Commercial Lighting', 'Professional lighting solutions for offices, retail spaces, and commercial buildings.', 'building', '["Office Lighting", "Retail Display", "Warehouse Lighting", "Energy Efficient"]', 2],
    ['service-3', 'Outdoor Lighting', 'Landscape and architectural lighting to enhance your property exterior beauty.', 'tree-pine', '["Garden Lighting", "Pathway Lights", "Security Lighting", "Facade Lighting"]', 3],
    ['service-4', 'Smart Lighting', 'Modern smart lighting systems with app control and automation features.', 'smartphone', '["App Control", "Voice Commands", "Scheduling", "Color Changing"]', 4],
    ['service-5', 'Maintenance & Repair', 'Professional maintenance and repair services to keep your lighting systems running perfectly.', 'wrench', '["Regular Maintenance", "Emergency Repairs", "Bulb Replacement", "System Upgrades"]', 5],
    ['service-6', 'Lighting Consultation', 'Expert advice and custom lighting design solutions for your specific requirements.', 'message-circle', '["Design Consultation", "Lighting Plans", "Energy Audit", "Custom Solutions"]', 6]
  ];

  services.forEach(service => insertService.run(...service));

  // Insert gallery items
  const galleryItems = [
    ['gallery-1', 'Modern Living Room Lighting', 'Elegant LED strip lighting with warm ambiance for contemporary living space', '/images/gallery/living-room-sample.jpg', 'residential', 1, 1],
    ['gallery-2', 'Office Complex Lighting', 'Energy-efficient commercial lighting solution for modern office building', '/images/gallery/office-sample.jpg', 'commercial', 1, 2],
    ['gallery-3', 'Garden Pathway Lighting', 'Beautiful landscape lighting design for garden walkways and outdoor spaces', '/images/gallery/garden-sample.jpg', 'outdoor', 0, 3],
    ['gallery-4', 'Smart Home Lighting System', 'Complete smart lighting setup with app control and automation features', '/images/gallery/smart-home-sample.jpg', 'smart', 1, 4]
  ];

  galleryItems.forEach(item => insertGalleryItem.run(...item));

  console.log('✅ Local SQLite database initialized successfully!');
}

// Database helper functions
export const dbHelpers = {
  // Business info
  getBusinessInfo() {
    return db.prepare('SELECT * FROM business_info WHERE id = 1').get();
  },

  // Services
  getServices() {
    return db.prepare('SELECT * FROM services WHERE is_active = 1 ORDER BY order_index').all();
  },

  // Gallery
  getGalleryItems() {
    return db.prepare('SELECT * FROM gallery ORDER BY order_index').all();
  },

  // Inquiries
  createInquiry(data: any) {
    const id = `inquiry-${Date.now()}`;
    const stmt = db.prepare(`
      INSERT INTO inquiries (id, name, email, phone, service, message, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, data.name, data.email, data.phone, data.service, data.message, 'new');
    return { id };
  },

  getInquiries() {
    return db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
  },

  updateInquiryStatus(id: string, status: string) {
    const stmt = db.prepare('UPDATE inquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(status, id);
    return this.getInquiry(id);
  },

  getInquiry(id: string) {
    return db.prepare('SELECT * FROM inquiries WHERE id = ?').get(id);
  }
};