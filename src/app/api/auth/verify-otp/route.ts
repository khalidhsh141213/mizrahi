import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { otp, phoneNumber } = await request.json()

    // Basic validation
    if (!otp || !phoneNumber) {
      return NextResponse.json(
        { error: 'קוד אימות ומספר טלפון הם שדות חובה' },
        { status: 400 }
      )
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'קוד אימות חייב להכיל 6 ספרות' },
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

    // Simulate OTP verification (in real app, check against stored OTP)
    // For demo purposes, we'll accept any 6-digit code that starts with '1'
    const isValidOTP = otp.startsWith('1')
    
    if (isValidOTP) {
      // Create authentication session
      const sessionToken = Buffer.from(`${phoneNumber}:${Date.now()}:verified`).toString('base64')
      
      const response = NextResponse.json({
        success: true,
        message: 'אימות אומת בהצלחה',
        user: {
          phoneNumber,
          fullName: 'דני כהן', // Mock user data
          accountNumber: '1234-5678',
          verified: true
        },
        token: sessionToken
      })

      // Set authentication cookie
      response.cookies.set('auth_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 1 day
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'קוד אימות לא חוקי או פג תוקף' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json(
      { error: 'שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    )
  }
}