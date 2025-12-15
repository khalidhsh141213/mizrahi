import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password, rememberMe } = await request.json()

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'שם משתמש וסיסמה הם שדות חובה' },
        { status: 400 }
      )
    }

    // Simulate authentication (in real app, this would connect to a database)
    // For demo purposes, we'll accept any non-empty credentials
    if (username.trim() && password.length >= 6) {
      // Create a simple session/token (in real app, use proper JWT/session management)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      // Set authentication cookie
      const response = NextResponse.json({
        success: true,
        message: 'התחברות בהצלחה',
        user: {
          username,
          fullName: 'דני כהן', // Mock user data
          accountNumber: '1234-5678'
        },
        token: sessionToken
      })

      // Set cookie if remember me is checked
      if (rememberMe) {
        response.cookies.set('auth_token', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60 // 30 days
        })
      } else {
        response.cookies.set('auth_token', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 // 1 day
        })
      }

      return response
    } else {
      return NextResponse.json(
        { error: 'שם משתמש או סיסמה שגויים' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    )
  }
}