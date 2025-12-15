import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'שם משתמש וסיסמה הם שדות חובה' },
        { status: 400 }
      )
    }

    // Simulate admin authentication (in real app, use secure database)
    // For demo purposes, we'll use simple credentials
    const validAdminCredentials = {
      username: 'admin',
      password: 'admin123'
    }

    if (username === validAdminCredentials.username && password === validAdminCredentials.password) {
      // Create admin session token
      const sessionToken = Buffer.from(`${username}:${Date.now()}:admin`).toString('base64')

      const response = NextResponse.json({
        success: true,
        message: 'התחברות מנהל הצליחה',
        admin: {
          username,
          role: 'super_admin',
          permissions: ['read', 'write', 'delete', 'manage_users', 'manage_settings', 'view_analytics']
        },
        token: sessionToken
      })

      // Set admin authentication cookie
      response.cookies.set('admin_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 8 * 60 * 60 // 8 hours
      })

      return response
    } else {
      // Log failed attempt for security
      console.log(`Failed admin login attempt: ${username} from ${request.headers.get('x-forwarded-for') || 'unknown'}`)

      return NextResponse.json(
        { error: 'שם משתמש או סיסמה שגויים' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר.' },
      { status: 500 }
    )
  }
}