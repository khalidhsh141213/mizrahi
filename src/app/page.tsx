import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import OffersCarousel from '@/components/OffersCarousel'
import MagazineCards from '@/components/MagazineCards'
import VideoSection from '@/components/VideoSection'
import AboutSection from '@/components/AboutSection'
import BranchLocator from '@/components/BranchLocator'
import MessagesCarousel from '@/components/MessagesCarousel'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-bank-text bg-gray-50">
      <Header />

      <main id="main" className="flex-grow">
        <HeroSection />

        {/* Quick Login Access */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-bank-primary mb-4">
                גישה מהירה לחשבון שלך
              </h2>
              <p className="text-gray-600 mb-6">
                היכנסו לחשבון הבנקאי שלכם לניהול מלא
              </p>
              <Link href="/login">
                <Button className="bg-bank-secondary hover:bg-bank-primary px-8 py-3 text-lg">
                  כניסה לחשבון
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <OffersCarousel />
        <MagazineCards />
        <VideoSection />
        <AboutSection />
        <BranchLocator />
        <MessagesCarousel />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  )
}