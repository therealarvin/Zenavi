import HeroSection from '@/components/home/HeroSection'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import NewArrivals from '@/components/home/NewArrivals'
import Testimonials from '@/components/home/Testimonials'
import MediaMentions from '@/components/home/MediaMentions'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCollections />
      <NewArrivals />
      <Testimonials />
      <MediaMentions />
      <Newsletter />
    </div>
  )
}