'use client'

import { useState, useEffect } from 'react'
import OTPForm from '@/components/OTPForm'
import Link from 'next/link'

export default function OTPPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Get phone number from login process (in real app, this would come from previous step)
    const savedPhone = localStorage.getItem('login_phone')
    if (savedPhone) {
      setPhoneNumber(savedPhone)
    } else {
      // For demo purposes
      setPhoneNumber('054-123-4567')
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOTPSubmit = async (otp: string) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, phoneNumber }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('OTP verification successful:', result)
        
        // Clear temporary data
        localStorage.removeItem('login_phone')
        
        // Redirect to dashboard
        window.location.href = '/dashboard'
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'קוד אימות לא חוקי')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      setError('שגיאת רשת. אנא נסה שוב.')
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      })

      if (response.ok) {
        // Reset timer
        setTimeRemaining(120)
        console.log('OTP resent successfully')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'שגיאה בשליחת קוד')
      }
    } catch (error) {
      console.error('Resend OTP error:', error)
      setError('שגיאת רשת. אנא נסה שוב.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-bank-primary">
            אימות חד-פעמי
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            הזן את הקוד שנשלח לטלפון שלך
          </p>
        </div>
        
        <OTPForm 
          onSubmit={handleOTPSubmit}
          onResend={handleResendOTP}
          isLoading={isLoading}
          error={error}
          phoneNumber={phoneNumber}
          timeRemaining={timeRemaining}
        />
      </div>
    </div>
  )
}