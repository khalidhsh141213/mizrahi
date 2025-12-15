import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Admin panel is accessible',
    admin: {
      username: 'admin',
      permissions: ['read', 'write', 'delete', 'manage_users', 'view_analytics']
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, username, password } = body

    switch (action) {
      case 'login':
        // Simple check for demo
        if (username === 'admin' && password === 'admin123') {
          return NextResponse.json({
            success: true,
            message: 'התחברות מנהל',
            admin: {
              username,
              permissions: ['read', 'write', 'delete', 'manage_users', 'view_analytics']
            }
          })
        } else {
          return NextResponse.json(
            { error: 'שם משתמש או סיסמה שגויים' },
            { status: 401 }
          )
        }
      default:
        return NextResponse.json(
          { error: 'פעולה לא חוקית' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'שגיאה בעיבוד הבקשה' },
      { status: 500 }
    )
  }
}