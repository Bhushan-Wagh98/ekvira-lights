#!/usr/bin/env node

/**
 * SQLite Database Initialization Script
 * No external accounts needed!
 */

const fs = require('fs');
const path = require('path');

// Create data directory
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('📁 Created data directory');
}

// Initialize database
try {
  const { initializeDatabase } = require('../src/lib/sqlite.ts');
  initializeDatabase();
  
  console.log('\n🎉 SQLite database setup complete!');
  console.log('\n📊 Database includes:');
  console.log('✅ 6 lighting services');
  console.log('✅ 4 sample gallery projects');
  console.log('✅ Business information');
  console.log('✅ Admin user (admin@ekviralights.com)');
  
  console.log('\n🚀 Next steps:');
  console.log('1. npm run dev');
  console.log('2. Visit: http://localhost:3000/en');
  console.log('3. Admin: http://localhost:3000/en/admin');
  
} catch (error) {
  console.error('❌ Database setup failed:', error.message);
  console.log('\n💡 Try running: npm install');
}