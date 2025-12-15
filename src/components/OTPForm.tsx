'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { Shield, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react'

interface OTPFormProps {
  onSubmit?: (otp: string) => void
  onResend?: () => void
  isLoading?: boolean
  error?: string
  phoneNumber?: string
  timeRemaining?: number
}

export default function OTPForm({
  onSubmit,
  onResend,
  isLoading = false,
  error,
  timeRemaining = 120
}: OTPFormProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [errors, setErrors] = useState('')

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }

    // Clear error when user starts typing
    if (errors) setErrors('')
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').slice(0, 6)
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')])
    }
  }

  const validateForm = () => {
    const otpString = otp.join('')
    if (otpString.length !== 6) {
      setErrors('נא להזין 6 ספרות')
      return false
    }
    if (!/^\d{6}$/.test(otpString)) {
      setErrors('הקוד חייב להכיל ספרות בלבד')
      return false
    }
    setErrors('')
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && onSubmit) {
      onSubmit(otp.join(''))
    }
  }

  const handleResend = () => {
    if (onResend && timeRemaining === 0) {
      onResend()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full">
      <CardHeader className="text-center pt-8 pb-2">
        <div className="mb-6 flex justify-center">
          <div className="bg-bank-primary/10 p-4 rounded-full ring-8 ring-bank-primary/5">
            <Shield className="h-8 w-8 text-bank-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          אימות אבטחה
        </CardTitle>
        <CardDescription className="text-gray-500 text-lg mt-2">
          הזן את הקוד שנשלח אליך לנייד
        </CardDescription>
        <div className="mt-4 inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
          תוקף הקוד יפוג בעוד <span className="mr-1 text-bank-primary">{formatTime(timeRemaining)}</span>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8 px-8 pb-8">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-center gap-2" dir="ltr">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold bg-white border-gray-200 focus:border-bank-primary focus:ring-4 focus:ring-bank-primary/20 rounded-xl transition-all shadow-sm"
                  autoComplete="one-time-code"
                  disabled={isLoading}
                />
              ))}
            </div>
            {errors && (
              <p className="text-sm text-red-500 text-center font-medium animate-pulse">{errors}</p>
            )}
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              disabled={timeRemaining > 0 || isLoading}
              className="text-gray-500 hover:text-bank-primary hover:bg-bank-primary/5 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ml-2 ${timeRemaining > 0 ? '' : 'animate-spin'}`} />
              {timeRemaining > 0 ? 'שלח קוד חדש' : 'שלח קוד חדש כעת'}
            </Button>
          </div>

          <div className="space-y-4 pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-bank-primary hover:bg-bank-primary/90 text-white font-bold text-lg rounded-xl shadow-lg shadow-bank-primary/20 hover:shadow-bank-primary/40 transition-all hover:-translate-y-0.5"
              disabled={isLoading || otp.join('').length !== 6}
            >
              {isLoading ? 'מאמת קוד...' : 'אישור וכניסה'}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center gap-1 transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                חזרה לדף כניסה
              </Link>
            </div>
          </div>
        </CardContent>
      </form>
    </div>
  )
}