'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle, User, Lock } from 'lucide-react'

interface LoginFormProps {
  onSubmit?: (data: { username: string; password: string; rememberMe: boolean }) => void
  isLoading?: boolean
  error?: string
}

export default function LoginForm({ onSubmit, isLoading = false, error }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: ''
    }

    if (!formData.username.trim()) {
      newErrors.username = 'שם משתמש הוא שדה חובה'
    }

    if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה'
    } else if (formData.password.length < 6) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים'
    }

    setErrors(newErrors)
    return !newErrors.username && !newErrors.password
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && onSubmit) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden">
      <CardHeader className="text-center pb-2 pt-8">
        <div className="mb-6 flex justify-center">
          <div className="bg-bank-secondary/10 p-4 rounded-full">
            <img
              src="https://www.mizrahi-tefahot.co.il/media/vlwlbdf2/logo.svg"
              alt="מזרחי טפחות"
              className="h-8 w-auto"
            />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">כניסה לחשבון</CardTitle>
        <CardDescription className="text-gray-500">
          הזן את פרטי הזיהוי שלך כדי להמשיך
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5 px-8 pb-8">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-right font-medium text-gray-700">
              שם משתמש
            </Label>
            <div className="relative group">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-bank-primary transition-colors" />
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="שם משתמש או ת.ז."
                className="text-right pr-10 h-12 border-gray-200 focus:border-bank-primary focus:ring-bank-primary/20 rounded-xl transition-all"
                dir="rtl"
                autoComplete="username"
                disabled={isLoading}
              />
            </div>
            {errors.username && (
              <p className="text-xs text-red-500 text-right font-medium">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-right font-medium text-gray-700">
              סיסמה
            </Label>
            <div className="relative group">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-bank-primary transition-colors" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="********"
                className="text-right pr-10 pl-10 h-12 border-gray-200 focus:border-bank-primary focus:ring-bank-primary/20 rounded-xl transition-all"
                dir="rtl"
                autoComplete="current-password"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-1 top-1 h-10 w-10 p-0 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 text-right font-medium">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                disabled={isLoading}
                className="data-[state=checked]:bg-bank-primary data-[state=checked]:border-bank-primary"
              />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer select-none"
              >
                זכור אותי
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-bank-secondary hover:text-bank-primary transition-colors font-medium"
            >
              שכחתי סיסמה
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-bank-primary hover:bg-bank-primary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-bank-primary/20 hover:shadow-bank-primary/40 transition-all hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading ? 'מתחבר למערכת...' : 'כניסה לחשבון'}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 font-medium">או</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              לקוח חדש?{' '}
              <Link
                href="/register"
                className="text-bank-primary font-bold hover:underline"
              >
                הצטרף עכשיו
              </Link>
            </p>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}