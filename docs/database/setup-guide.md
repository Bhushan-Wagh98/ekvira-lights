# Database Setup Guide - Ekvira Lights

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → "New Project"
3. Choose organization and fill details:
   - **Name**: `ekvira-lights`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project" (takes 2-3 minutes)

### Step 2: Get Database Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values to your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### Step 3: Run Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire content from `docs/database/schema.sql`
4. Click **Run** (creates all tables and sample data)

### Step 4: Set Up Security
1. Create new query in SQL Editor
2. Copy and paste content from `docs/database/rls-policies.sql`
3. Click **Run** (sets up Row Level Security)

### Step 5: Create Admin User
1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Fill in:
   - **Email**: `admin@ekviralights.com`
   - **Password**: `EkviraAdmin2024!` (or your choice)
   - **Auto Confirm User**: ✅ Check this
4. Click **Create user**
5. Go back to **SQL Editor**, run this query:
   ```sql
   UPDATE public.users SET role = 'admin' WHERE email = 'admin@ekviralights.com';
   ```

## ✅ Verification

### Test Database Connection
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000/en](http://localhost:3000/en)
3. You should see:
   - Services section with 6 services
   - Gallery with sample projects
   - Contact form working

### Test Admin Access
1. Go to [http://localhost:3000/en/admin](http://localhost:3000/en/admin)
2. Login with admin credentials
3. You should access the admin dashboard

## 📊 Database Tables Created

| Table | Purpose | Records |
|-------|---------|---------|
| `users` | Admin authentication | 1 admin user |
| `business_info` | Company details | 1 record |
| `services` | Service offerings | 6 services |
| `gallery` | Project showcase | 4 sample projects |
| `inquiries` | Customer contacts | Empty (will fill from forms) |

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Admin-only access** for content management
- **Public read access** for website content
- **Secure user registration** with automatic role assignment

## 🛠 Advanced Configuration

### Custom Domain Setup (Optional)
If you have a custom domain:
1. Go to **Settings** → **API**
2. Add your domain to **Site URL**
3. Update `NEXTAUTH_URL` in `.env.local`

### Email Templates (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize confirmation and reset password emails
3. Add your business branding

### Storage Setup (For Image Uploads)
1. Go to **Storage** → **Create bucket**
2. Name: `gallery-images`
3. Set as public bucket
4. Update upload functions in code

## 🚨 Troubleshooting

### Common Issues:

**1. "Invalid API key" error**
- Double-check your `.env.local` file
- Ensure no extra spaces in environment variables
- Restart development server after changes

**2. "Permission denied" errors**
- Verify RLS policies are applied correctly
- Check if admin user role is set properly
- Ensure you're logged in as admin

**3. "Table doesn't exist" errors**
- Verify schema.sql ran successfully
- Check for any SQL errors in Supabase logs
- Ensure all tables are created in `public` schema

**4. Admin login not working**
- Verify admin user is created in Authentication tab
- Check if user role is set to 'admin' in users table
- Ensure password matches what you set

### Getting Help:
1. Check Supabase logs in **Logs** → **Database**
2. Verify table structure in **Table Editor**
3. Test queries in **SQL Editor**

## 📝 Sample Data Included

The setup includes:
- **6 lighting services** (residential, commercial, outdoor, smart, maintenance, consultation)
- **4 gallery projects** with different categories
- **Business information** with contact details
- **Admin user** ready for login

## 🔄 Database Backup

### Export Data (Recommended)
```sql
-- Run in SQL Editor to backup your data
SELECT * FROM public.business_info;
SELECT * FROM public.services;
SELECT * FROM public.gallery;
SELECT * FROM public.inquiries;
```

### Restore from Backup
If you need to restore, simply re-run the schema.sql file.

---

## 🎯 Next Steps After Setup

1. **Update Business Info**: Edit contact details in admin panel
2. **Add Real Images**: Replace sample gallery images
3. **Customize Services**: Modify services to match your offerings
4. **Test Contact Forms**: Submit test inquiries
5. **Deploy to Netlify**: Follow deployment guide

Your database is now ready! 🚀