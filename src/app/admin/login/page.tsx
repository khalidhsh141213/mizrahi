'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Admin login successful:', result)

        // Set admin token cookie
        document.cookie = 'admin_token=true; path=/; max-age=86400; HttpOnly; SameSite=Lax'

        // Redirect to admin dashboard
        window.location.href = '/admin'
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'שם משתמש או סיסמה שגויים')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Admin login error:', error)
      setError('שגיאת רשת. אנא נסה שוב.')
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-bank-primary rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-bank-primary">
            כניסה לפאנל ניהול
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            הזן את פרטי הניהול שלך
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-bank-primary">כניסת מנהל</CardTitle>
            <CardDescription className="text-gray-600">
              גישה למנהלי מערכת בלבד
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin-username" className="text-right font-medium">
                  שם משתמש מנהל
                </Label>
                <Input
                  id="admin-username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="הזן שם משתמש מנהל"
                  className="text-right"
                  dir="rtl"
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-right font-medium">
                  סיסמת מנהל
                </Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="הזן סיסמת מנהל"
                    className="text-right pr-10"
                    dir="rtl"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-bank-primary hover:bg-bank-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'מתחבר...' : 'כניסה'}
              </Button>

              <div className="text-center space-y-2">
                <Link href="/admin/forgot-password" className="text-sm text-bank-secondary hover:underline">
                  שכחת סיסמה?
                </Link>
                <Link href="/" className="text-sm text-gray-500 hover:underline">
                  חזרה לאתר הראשי
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}