#!/usr/bin/env node

/**
 * Database Setup Script for Ekvira Lights
 * Run this after setting up your Supabase project
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.log('Please add:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Setting up Ekvira Lights database...\n');

  try {
    // Test connection
    console.log('1. Testing database connection...');
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error && error.code === '42P01') {
      console.log('❌ Tables not found. Please run the SQL schema first.');
      console.log('\n📋 Setup Instructions:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Run the schema.sql file from docs/database/');
      console.log('4. Run the rls-policies.sql file');
      console.log('5. Then run this script again');
      return;
    }

    console.log('✅ Database connection successful');

    // Check if business info exists
    console.log('2. Checking business information...');
    const { data: businessInfo } = await supabase
      .from('business_info')
      .select('*')
      .limit(1);

    if (businessInfo && businessInfo.length > 0) {
      console.log('✅ Business information found');
    } else {
      console.log('⚠️  No business information found');
    }

    // Check services
    console.log('3. Checking services...');
    const { data: services } = await supabase
      .from('services')
      .select('count');

    console.log(`✅ Found ${services?.length || 0} services`);

    // Check gallery
    console.log('4. Checking gallery...');
    const { data: gallery } = await supabase
      .from('gallery')
      .select('count');

    console.log(`✅ Found ${gallery?.length || 0} gallery items`);

    // Check for admin user
    console.log('5. Checking admin user...');
    const { data: adminUsers } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'admin');

    if (adminUsers && adminUsers.length > 0) {
      console.log('✅ Admin user found');
      console.log(`   Email: ${adminUsers[0].email}`);
    } else {
      console.log('⚠️  No admin user found');
      console.log('\n👤 Create Admin User:');
      console.log('1. Go to Supabase Dashboard > Authentication > Users');
      console.log('2. Click "Add user" > "Create new user"');
      console.log('3. Email: admin@ekviralights.com');
      console.log('4. Password: EkviraAdmin2024!');
      console.log('5. Check "Auto Confirm User"');
      console.log('6. Run this SQL query:');
      console.log('   UPDATE public.users SET role = \'admin\' WHERE email = \'admin@ekviralights.com\';');
    }

    console.log('\n🎉 Database setup verification complete!');
    console.log('\n🔗 Next steps:');
    console.log('1. Start development server: npm run dev');
    console.log('2. Visit: http://localhost:3000/en');
    console.log('3. Test admin login: http://localhost:3000/en/admin');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify your Supabase credentials');
    console.log('2. Ensure you have run the schema.sql file');
    console.log('3. Check Supabase project is active');
  }
}

// Run setup
setupDatabase();