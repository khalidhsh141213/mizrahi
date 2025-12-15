import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    // Basic validation
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'מספר טלפון הוא שדה חובה' },
        { status: 400 }
      )
    }

    // Validate Israeli phone number format
    const phoneRegex = /^0(5[0-8]|6[0-9]|7[0-9])-?\d{7}$/
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'מספר טלפון לא תקין' },
        { status: 400 }
      )
    }

    // Simulate sending OTP (in real app, this would use SMS service)
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Store OTP for verification (in real app, use Redis/database with expiration)
    console.log(`OTP sent to ${phoneNumber}: ${otp}`)
    
    // For demo purposes, we'll store in a simple way
    // In production, use secure storage with expiration
    const otpData = {
      code: otp,
      phoneNumber,
      timestamp: Date.now(),
      attempts: 0
    }

    // This would be stored in Redis or database with TTL
    // For demo, we'll just log it
    console.log('OTP Data:', otpData)

    return NextResponse.json({
      success: true,
      message: 'קוד אימות נשלח בהצלחה',
      // For demo only - in production, never return the actual OTP
      demoCode: process.env.NODE_ENV === 'development' ? otp : undefined
    })

  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { error: 'שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    )
  }
}