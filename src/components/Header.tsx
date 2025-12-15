'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <nav className="flex items-center justify-between p-4 lg:px-8">
        {/* Contrast Button - Desktop */}
        <Button variant="ghost" size="icon" className="hidden lg:block" aria-label="ניגודיות">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </Button>

        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-bank-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-bank-primary">מזרחי-טפחות</span>
                </Link>
              </div>
              
              <div className="flex flex-col space-y-2 mb-4">
                <Button variant="outline" className="justify-start">ניגודיות</Button>
                <Link href="#main" className="block p-2 text-bank-primary hover:bg-gray-100 rounded-md">דלג לתוכן העמוד</Link>
              </div>

              <div className="flex justify-around mb-4 border-b border-gray-200 pb-4">
                <Link href="/" className="text-bank-primary font-bold">עב</Link>
                <span className="text-gray-400">|</span>
                <Link href="/en/" className="text-bank-primary">EN</Link>
                <span className="text-gray-400">|</span>
                <Link href="/ar/" className="text-bank-primary">العربية</Link>
              </div>

              <div className="space-y-2">
                <Link href="/open-a-bank-account/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">פותחים חשבון בנק</Link>
                <Link href="/mortgages/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">משכנתאות</Link>
                <Link href="/business-account/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">עסקים</Link>
                <Link href="/saving-accounts/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">פיקדונות וחסכונות</Link>
                <Link href="/credit-cards/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">כרטיסי אשראי</Link>
                <Link href="/brokerage/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">שוק ההון</Link>
                <Link href="/loans/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">הלוואות</Link>
                <Link href="/online-banking/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">בנקאות דיגיטלית</Link>
                <Link href="/branches/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">איתור סניפים</Link>
                <Link href="/contact-us/" className="block p-2 text-bank-text hover:bg-gray-100 rounded-md">יצירת קשר</Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Login Button */}
        <Link href="/login">
          <Button variant="ghost" className="text-bank-primary font-bold px-4 py-2 rounded-md hover:bg-gray-100">
            כניסה לחשבון
          </Button>
        </Link>

        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <img 
            className="hidden lg:block w-auto h-8" 
            alt="בנק מזרחי טפחות" 
            src="https://www.mizrahi-tefahot.co.il/media/vlwlbdf2/logo.svg"
          />
          <img 
            className="block lg:hidden w-auto h-8" 
            alt="בנק מזרחי טפחות" 
            src="https://www.mizrahi-tefahot.co.il/media/1mrh3bxs/logomobile.svg"
          />
        </Link>

        {/* Language Picker - Desktop */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-bank-primary font-bold">
              עב
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>עברית</DropdownMenuItem>
            <DropdownMenuItem>EN</DropdownMenuItem>
            <DropdownMenuItem>العربية</DropdownMenuItem>
            <DropdownMenuItem>Русский</DropdownMenuItem>
            <DropdownMenuItem>Українська</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Phone */}
        <Link href="tel:*8860" className="text-bank-primary p-2" title="חייגו אלינו">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-bank-primary font-bold hover:text-bank-secondary">
                המוצרים והשירותים שלנו
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              <div className="p-4">
                <h3 className="font-bold text-bank-primary mb-2">מוצרים בנקאיים</h3>
                <div className="space-y-2">
                  <DropdownMenuItem asChild>
                    <Link href="/open-a-bank-account/">פותחים חשבון בנק</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/mortgages/">משכנתאות</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/business-account/">עסקים</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saving-accounts/">פיקדונות וחסכונות</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/credit-cards/">כרטיסי אשראי</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/brokerage/">שוק ההון</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/loans/">הלוואות</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/online-banking/">בנקאות דיגיטלית</Link>
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}