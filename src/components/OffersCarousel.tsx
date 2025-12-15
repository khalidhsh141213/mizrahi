'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Pause } from 'lucide-react'

interface Offer {
  id: number
  title: string
  image: string
  link: string
  target?: string
}

const offers: Offer[] = [
  {
    id: 1,
    title: 'פותחים חשבון בנק',
    image: 'https://picsum.photos/1920/632?random=1',
    link: '/open-a-bank-account/',
    target: '_self'
  },
  {
    id: 2,
    title: 'להרשמה לוויבניר',
    image: 'https://picsum.photos/1920/632?random=2',
    link: 'https://financialforumil.co.il/',
    target: '_blank'
  },
  {
    id: 3,
    title: 'דו"ח הנדל"ן',
    image: 'https://picsum.photos/1920/632?random=3',
    link: '/business-account/real-estae-report/',
    target: '_self'
  },
  {
    id: 4,
    title: 'הלוואה ללקוחות משכנתא',
    image: 'https://picsum.photos/1920/632?random=4',
    link: 'https://www.mizrahi-tefahot.co.il/mortgages/updatemortgage/mortgage-loan-for-holiday/',
    target: '_blank'
  },
  {
    id: 5,
    title: 'פיקדון פסיפלורה',
    image: 'https://picsum.photos/1920/632?random=5',
    link: '/saving-accounts/deposits-attractive-offers/passionfruit-cd/',
    target: '_self'
  },
  {
    id: 6,
    title: 'הלוואה בערבות מדינה לעסקים פרטיים',
    image: 'https://picsum.photos/1920/632?random=6',
    link: '/loans/businessloanslib/small-business-financing/',
    target: '_self'
  },
  {
    id: 7,
    title: 'הצעה מיוחדת - דביר חן',
    image: 'https://www.mizrahi-tefahot.co.il/media/pyuldqvx/dvir_hen_mobile.jpg',
    link: '/dvir-hen-special-offer/',
    target: '_self'
  }
]

export default function OffersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(5) // Start with the 6th item (index 5)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="hpProposals text-center bg-white py-8">
          <div className="intro mb-8">
            <h2 className="text-3xl font-bold text-bank-primary">ההצעות המעניינות שלנו</h2>
          </div>
          
          <div className="relative mx-auto max-w-6xl">
            {/* Desktop Carousel */}
            <div id="hpCarousel-D" className="relative hidden md:block">
              <div className="carousel-inner relative overflow-hidden rounded-lg shadow-lg h-80">
                {offers.map((offer, index) => (
                  <div
                    key={`desktop-${offer.id}`}
                    className={`carousel-item absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    role="tabpanel"
                    aria-labelledby={`tab-desktop-${offer.id}`}
                  >
                    <a 
                      href={offer.link} 
                      target={offer.target || '_self'} 
                      rel={offer.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="block w-full h-full"
                    >
                      <figure 
                        className="w-full h-full bg-cover bg-center" 
                        aria-label={offer.title}
                        style={{ backgroundImage: `url("${offer.image}")` }}
                      />
                    </a>
                  </div>
                ))}
              </div>

              {/* Indicators */}
              <ol className="carousel-indicators absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 p-2 bg-black bg-opacity-30 rounded-full">
                {offers.map((offer, index) => (
                  <li key={offer.id}>
                    <button
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                        index === currentIndex ? 'bg-bank-secondary w-6' : 'opacity-50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <span className="sr-only">{offer.title}</span>
                    </button>
                  </li>
                ))}
              </ol>

              {/* Controls */}
              <Button
                onClick={goToPrevious}
                className="carousel-control-prev absolute top-1/2 -right-4 -translate-y-1/2 bg-bank-primary bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-100 transition-opacity duration-200"
                aria-label="שקופית קודמת"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                onClick={goToNext}
                className="carousel-control-next absolute top-1/2 -left-4 -translate-y-1/2 bg-bank-primary bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-100 transition-opacity duration-200"
                aria-label="שקופית הבאה"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Mobile Carousel */}
            <div id="hpCarousel-M" className="relative block md:hidden">
              <div className="carousel-inner relative overflow-hidden rounded-lg shadow-lg h-96">
                {offers.map((offer, index) => (
                  <div
                    key={`mobile-${offer.id}`}
                    className={`carousel-item absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    role="tabpanel"
                    aria-labelledby={`tab-mobile-${offer.id}`}
                  >
                    <a 
                      href={offer.link} 
                      target={offer.target || '_self'} 
                      rel={offer.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="block w-full h-full"
                    >
                      <figure 
                        className="w-full h-full bg-cover bg-center" 
                        aria-label={offer.title}
                        style={{ backgroundImage: `url("${offer.image}")` }}
                      />
                    </a>
                  </div>
                ))}
              </div>

              {/* Mobile Indicators */}
              <ol className="carousel-indicators absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 p-2 bg-black bg-opacity-30 rounded-full">
                {offers.map((offer, index) => (
                  <li key={offer.id}>
                    <button
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                        index === currentIndex ? 'bg-bank-secondary w-6' : 'opacity-50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <span className="sr-only">{offer.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Play/Pause Button */}
            <Button
              onClick={togglePlayPause}
              className="carousel-control-button absolute top-4 left-4 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
              aria-label={isPlaying ? 'עצור תנועת גלרייה' : 'נגן תנועת גלרייה'}
              title={isPlaying ? 'עצור' : 'נגן'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}