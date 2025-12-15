import { NextRequest, NextResponse } from 'next/server'

interface User {
  id: string
  username: string
  fullName: string
  email: string
  phone: string
  accountNumber: string
  balance: number
  status: 'active' | 'inactive' | 'suspended'
  kycStatus: 'verified' | 'pending' | 'rejected'
  riskLevel: 'low' | 'medium' | 'high'
  registrationDate: string
  lastLogin: string
}

interface CreateUserRequest {
  username: string
  fullName: string
  email: string
  phone: string
  accountNumber: string
  balance?: number
  riskLevel?: 'low' | 'medium' | 'high'
  kycStatus?: 'verified' | 'pending' | 'rejected'
  registrationDate?: string
  lastLogin?: string
}

interface UpdateUserRequest {
  userId: string
  userData: Partial<User>
  status?: 'active' | 'inactive' | 'suspended'
  kycStatus?: 'verified' | 'pending' | 'rejected'
  riskLevel?: 'low' | 'medium' | 'high'
}

interface DeleteUserRequest {
  userId: string
  reason?: string
}

interface SuspendUserRequest {
  userId: string
  reason?: string
}

interface BanUserRequest {
  userId: string
  reason?: string
  ip: string
  device?: string
  duration?: string
  permanent?: boolean
}

interface UserSearchQuery {
  search?: string
  status?: string
  page?: number
  limit?: number
}

interface UserManagementResponse {
  users: User[]
  pagination: {
    currentPage: number
    totalPages: number
    totalUsers: number
    hasNext: boolean
    hasPrev: boolean
    hasPrev: boolean
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredUsers = mockUsers

    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.accountNumber.includes(search)
      )
    }

    if (status && status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === status)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json({
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        hasNext: endIndex < filteredUsers.length,
        hasPrev: page > 1,
        hasPrev: page < 2
      }
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'שגיאת שרת פנימית' },
      { status: 500 }
    )
  }
  }

export async function POST(request: NextRequest) {
  try {
    const { action, userId, userData } = await request.json()

    // Verify admin authentication
    const adminToken = request.cookies.get('admin_token')?.value || 
                    request.headers.get('authorization') === 'Bearer admin-token'
    
    if (!adminToken) {
      return NextResponse.json(
        { error: 'לאירוש' },
        { status: 401 }
      )
    }

    switch (action) {
      case 'create':
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          username: userData.username,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          accountNumber: userData.accountNumber,
          balance: 0,
          status: 'active',
          kycStatus: 'pending',
          riskLevel: 'medium',
          registrationDate: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }

        mockUsers.push(newUser)

        return NextResponse.json({
          success: true,
          message: 'משתמשתמש נוצלחה',
          user: newUser
        })

      case 'update':
        // Update user status
        const userIndex = mockUsers.findIndex(u => u.id === userId)
        if (userIndex !== -1) {
          mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData }
          return NextResponse.json({
            success: true,
            message: 'משתמשתשם',
            user: mockUsers[userIndex]
          })
        } else {
          return NextResponse.json(
            { error: 'משתמשתמשם' },
            { status: 404 }
          )
        }

      case 'suspend':
        // Suspend user
        const suspendIndex = mockUsers.findIndex(u => u.id === userId)
        if (suspendIndex !== -1) {
          mockUsers[suspendIndex].status = 'suspended'
          return NextResponse.json({
            success: true,
            message: 'משתמשהה בהצלחה',
            user: mockUsers[suspendIndex]
          })
        } else {
          return NextResponse.json(
            { error: 'משתמשתמשם' },
            { status: 404 }
          )
        }

      case 'delete':
        // Delete user
        const deleteIndex = mockUsers.findIndex(u => u.id === userId)
        if (deleteIndex !== -1) {
          const deletedUser = mockUsers.splice(deleteIndex, 1)[0]
          return NextResponse.json({
            success: true,
            message: 'משתמשמש נחשקות',
            user: deletedUser
          })
        } else {
          return NextResponse.json(
            { error: 'משתמשתמשם' },
            { status: 404 }
          )
        }

      default:
        return NextResponse.json(
          { error: 'פעולה לא פעולה' },
          { status: 400 }
        )
    }
  }
}