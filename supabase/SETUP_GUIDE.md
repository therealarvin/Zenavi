# Zenavi Jewellery - Supabase Setup Guide

This guide will help you set up your Supabase project for the Zenavi Jewellery e-commerce website.

## Step 1: Create the Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Set the following details:
   - **Project Name**: `zenavi-jewellery`
   - **Database Password**: Choose a strong password (save this securely)
   - **Region**: Select the region closest to your users
4. Click "Create new project"
5. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (should look like: `https://abcdefgh.supabase.co`)
   - **Anon/Public Key** (the `anon` key under "Project API keys")

## Step 3: Update Environment Variables

Run this command in your project root with your actual credentials:

```bash
node scripts/update-env.js "https://your-project.supabase.co" "your_anon_key_here"
```

Or manually update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste it into the SQL Editor
4. Click **Run** to execute all the CREATE TABLE statements

## Step 5: Create Storage Buckets

1. In your Supabase dashboard, go to **Storage** → **Buckets**
2. Create the following buckets:

### product-images (Public Bucket)
- **Bucket Name**: `product-images`
- **Public**: ✅ Yes
- **File size limit**: 10MB
- **Allowed MIME types**: image/jpeg, image/png, image/webp

### hero-slides (Public Bucket)
- **Bucket Name**: `hero-slides`
- **Public**: ✅ Yes
- **File size limit**: 10MB
- **Allowed MIME types**: image/jpeg, image/png, image/webp

### contact-uploads (Private Bucket)
- **Bucket Name**: `contact-uploads`
- **Public**: ❌ No
- **File size limit**: 5MB
- **Allowed MIME types**: image/jpeg, image/png, application/pdf

## Step 6: Set Up Storage Policies

1. In the SQL Editor, copy and paste the contents of `supabase/storage-setup.sql`
2. Click **Run** to execute the storage policies

## Step 7: Set Up Row Level Security (RLS)

1. In the SQL Editor, copy and paste the contents of `supabase/rls-policies.sql`
2. Click **Run** to execute the RLS policies

## Step 8: Add Sample Data (Optional)

1. In the SQL Editor, copy and paste the contents of `supabase/seed-data.sql`
2. Click **Run** to populate your database with sample content

## Step 9: Verify Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see all the tables created
3. Check the `site_settings` table - it should have one row with default data
4. Go to **Storage** and verify all three buckets are created

## Admin Authentication Setup

For admin functionality, you'll need to set up authentication. The current schema includes an `admin_users` table, but you may want to use Supabase Auth instead:

1. Go to **Authentication** → **Settings**
2. Configure your authentication providers
3. Update the RLS policies in `rls-policies.sql` to match your auth setup

## Next Steps

- Test your database connection in your Next.js application
- Upload some sample images to your storage buckets
- Set up your admin authentication flow
- Customize the default content in the `site_settings` table

## File Structure

```
supabase/
├── schema.sql          # Main database schema
├── storage-setup.sql   # Storage bucket policies
├── rls-policies.sql    # Row Level Security policies
├── seed-data.sql       # Sample data for testing
└── SETUP_GUIDE.md      # This guide
```

## Troubleshooting

### Common Issues:

1. **Tables not created**: Make sure you're running the SQL in the correct order (schema.sql first)
2. **Storage policies failing**: Ensure you've created the buckets before running storage-setup.sql
3. **RLS blocking access**: Check that your policies match your authentication setup
4. **Environment variables not working**: Restart your Next.js development server after updating .env.local

### Getting Help:

- Check the Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Review the SQL Editor logs for any error messages
- Verify your API keys are correctly set in the environment file