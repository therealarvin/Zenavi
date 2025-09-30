# Zenavi Jewellery - E-Commerce Website

A beautiful, fully animated jewellery e-commerce website built with Next.js, Framer Motion, and Supabase.

## Features

- ✨ Beautiful animations with Framer Motion
- 🛍️ Complete e-commerce functionality
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🗄️ Supabase integration for content management
- 🔍 Advanced product filtering and search
- 🖼️ Image galleries with zoom functionality
- 👨‍💼 Admin panel for content management
- 📧 Contact form functionality
- 🎯 SEO optimized

## Pages

- **Homepage** - Animated hero carousel, featured collections, new arrivals, testimonials
- **Shop** - Product listing with advanced filters (category, material, price range, etc.)
- **Collections** - Browse curated collections
- **About Us** - Company story and values
- **Contact** - Contact form and showroom information
- **Admin Panel** - Manage site content, products, and settings

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Database:** Supabase
- **UI Components:** Radix UI
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zenavi-jewellery
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:

   a. Create a new project on [Supabase](https://supabase.com)

   b. Run the database schema (located in `supabase/schema.sql`) in your Supabase SQL editor

   c. Create storage buckets in Supabase:
      - `product-images`
      - `hero-slides`
      - `contact-uploads`

4. Configure environment variables:

   Copy `.env.local.example` to `.env.local` and update with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Admin Panel

Access the admin panel at `/admin` to:
- Update site settings (brand name, contact info, etc.)
- Manage hero slides
- Add/edit products
- Manage testimonials
- View contact form submissions

## Project Structure

```
zenavi-jewellery/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── shop/              # Shop page
│   ├── collections/       # Collections page
│   ├── contact/           # Contact page
│   └── admin/             # Admin panel
├── components/            # React components
│   ├── home/             # Homepage components
│   └── layout/           # Layout components (Header, Footer)
├── lib/                   # Utility functions
│   └── supabase/         # Supabase client configuration
├── supabase/             # Database schema
└── public/               # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Docker

## Database Schema

The Supabase database includes tables for:
- Site settings
- Hero slides
- Products
- Product categories
- Product images
- Collections
- Reviews
- Testimonials
- Contact submissions
- Admin users

## Customization

### Changing Colors

Edit the color palette in `tailwind.config.ts`:
- Gold color scheme
- Cream background
- Charcoal text

### Fonts

The website uses:
- **Playfair Display** for headings (serif)
- **Inter** for body text (sans-serif)

### Content Management

All content can be managed through:
1. Admin panel at `/admin`
2. Direct database updates in Supabase
3. API integration for automated updates

## Performance

- Optimized images with Next.js Image component
- Lazy loading for better performance
- Code splitting for faster page loads
- SEO optimized with proper meta tags

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is private and proprietary.

## Support

For support, email hello@zenavi.com or visit our showroom.

---

Built with ❤️ for Zenavi Jewellery