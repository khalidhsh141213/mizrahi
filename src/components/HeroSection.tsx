'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search functionality
  }

  return (
    <section className="relative h-96 md:h-[32rem] flex items-center justify-center bg-cover bg-center text-white" 
             style={{ backgroundImage: 'url("https://www.mizrahi-tefahot.co.il/media/13fndpq3/homeimageplusfamily-desktop.jpg")' }}>
      <div className="absolute inset-0 bg-bank-primary opacity-30"></div>
      
      <div className="relative z-10 text-center px-4">
        <div className="logo-display mb-4">
          <img 
            alt="מזרחי טפחות" 
            className="h-16 w-auto mx-auto" 
            src="https://www.mizrahi-tefahot.co.il/media/tylf4auj/logo-mt-2x.png"
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-8">בני אדם לפני הכול</h1>
        
        <div className="mega-search-box max-w-lg mx-auto">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Input
              id="st-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש"
              className="w-full p-3 rounded-full text-right text-gray-800 focus:outline-none focus:ring-2 focus:ring-bank-secondary placeholder-gray-500 pr-12"
              aria-label="חיפוש באתר"
            />
            <Button 
              type="submit"
              className="absolute left-3 p-2 text-bank-primary bg-bank-secondary rounded-full hover:bg-bank-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bank-secondary"
              title="לחפש באתר"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">לחפש באתר</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}