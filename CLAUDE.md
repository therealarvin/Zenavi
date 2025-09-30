# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zenavi is a Next.js 15 e-commerce website for a jewellery brand with full animation support via Framer Motion and Supabase for backend/CMS. The site is fully responsive and features an admin panel for content management.

## Development Commands

```bash
# Development server (localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Frontend Stack
- **Framework**: Next.js 15 with App Router (`app/` directory)
- **React**: Version 19 with TypeScript
- **Styling**: Tailwind CSS with custom gold/cream/charcoal color scheme
- **Animations**: Framer Motion for all page transitions and component animations
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives

### Backend Architecture
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage with three buckets: `product-images`, `hero-slides`, `contact-uploads`
- **Client-side DB access**: `@/lib/supabase/client` (uses `createBrowserClient` from `@supabase/ssr`)
- **Server-side DB access**: `@/lib/supabase/server` (uses `createServerClient` with cookie handling)

### Database Schema Pattern
The Supabase schema (`supabase/schema.sql`) uses:
- UUID primary keys with `gen_random_uuid()`
- Timestamps with `TIMEZONE('utc'::text, NOW())`
- Soft deletes via `is_active` boolean flags
- Junction tables for many-to-many relationships (e.g., `product_categories`)
- Material type constraints: `CHECK (material_type IN ('gold', 'diamond'))`

Key tables:
- `site_settings` - Single row for global site configuration
- `hero_slides` - Homepage carousel slides with `display_order`
- `products` - Product catalog with `material_type`, `karat`, pricing
- `categories` - Hierarchical categories with `category_type` and `parent_category`
- `collections` - Curated product collections
- `product_images` - Multiple images per product with `is_primary` flag
- `testimonials`, `reviews` - Customer feedback

### Layout Structure
- Root layout (`app/layout.tsx`) wraps all pages with `<Header />` and `<Footer />`
- Two Google Fonts loaded: Playfair Display (headings, serif) and Inter (body, sans-serif)
- Font CSS variables: `--font-playfair`, `--font-inter`

### Admin Panel (`/admin`)
The admin panel (`app/admin/page.tsx`) is a client component with tabs for:
- **Site Settings**: Brand name, hero text, contact info, social URLs
- **Hero Slides**: Manage homepage carousel
- **Products**: Add/edit products with material type, karat, pricing
- **Testimonials**: Manage customer reviews

Admin uses Radix UI Tabs and direct Supabase queries (no API routes). All mutations use `.upsert()` or `.insert()` with optimistic UI updates.

### Component Organization
```
components/
├── layout/           # Header.tsx, Footer.tsx (used in root layout)
├── home/            # Homepage-specific components
│   ├── HeroSection.tsx        # Animated carousel
│   ├── FeaturedCollections.tsx
│   ├── NewArrivals.tsx
│   ├── Testimonials.tsx
│   ├── MediaMentions.tsx
│   └── Newsletter.tsx
```

All home components use Framer Motion for staggered animations with `initial`, `animate`, `transition` props.

### Styling Conventions
- Custom Tailwind classes defined for headings (use `heading-1`, `heading-2`, etc. - check `globals.css`)
- Gold color palette: `gold-{50-900}` (defined in `tailwind.config.ts`)
- Cream background: `bg-cream` (#FAF7F5)
- Charcoal text: `text-charcoal` (#1F1F1F)
- All animations use custom keyframes: `animate-fade-in`, `animate-fade-up`, `animate-zoom-in`, `animate-float`

## Environment Setup

Required environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run Supabase schema files in order:
1. `supabase/schema.sql` - Create tables
2. `supabase/storage-setup.sql` - Configure storage buckets
3. `supabase/rls-policies.sql` - Row Level Security policies
4. `supabase/seed-data.sql` - Initial data

## Key Patterns

### Supabase Client Usage
```typescript
// Client components
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

// Server components/actions
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient() // Note: server client is async
```

### Animation Pattern
Most components use this Framer Motion pattern:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

Stagger children with `staggerChildren` in parent transition.

### Product Filtering
Shop page has advanced filtering by:
- Category (type)
- Material type (gold/diamond)
- Karat (14K/18K/22K)
- Price range (slider)

Filters are applied client-side after fetching all products from Supabase.

## Important Notes

- All product slugs are auto-generated: `name.toLowerCase().replace(/\s+/g, '-')`
- Image optimization uses Next.js `<Image />` component with proper width/height
- Admin panel has NO authentication currently - implement auth before production
- Contact form submissions stored in `contact_submissions` table
- Testimonials have `is_featured` flag for homepage display
