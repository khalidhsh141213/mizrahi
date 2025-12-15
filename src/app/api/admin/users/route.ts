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
  }
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'israel_israeli',
    fullName: 'ישראל ישראלי',
    email: 'israel@example.com',
    phone: '050-0000000',
    accountNumber: '12-345-67890',
    balance: 15400,
    status: 'active',
    kycStatus: 'verified',
    riskLevel: 'low',
    registrationDate: '2024-01-01T10:00:00Z',
    lastLogin: '2024-03-10T15:30:00Z'
  },
  {
    id: '2',
    username: 'moshe_cohen',
    fullName: 'משה כהן',
    email: 'moshe@example.com',
    phone: '052-1111111',
    accountNumber: '12-345-11111',
    balance: -500,
    status: 'suspended',
    kycStatus: 'pending',
    riskLevel: 'medium',
    registrationDate: '2024-02-15T10:00:00Z',
    lastLogin: '2024-03-09T08:00:00Z'
  }
]

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
        hasPrev: page > 1
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
        { error: 'לא מורשה' },
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
          message: 'משתמש נוצר בהצלחה',
          user: newUser
        })

      case 'update':
        // Update user status
        const userIndex = mockUsers.findIndex(u => u.id === userId)
        if (userIndex !== -1) {
          mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData }
          return NextResponse.json({
            success: true,
            message: 'עודכן בהצלחה',
            user: mockUsers[userIndex]
          })
        } else {
          return NextResponse.json(
            { error: 'משתמש לא נמצא' },
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
            message: 'הושעה בהצלחה',
            user: mockUsers[suspendIndex]
          })
        } else {
          return NextResponse.json(
            { error: 'משתמש לא נמצא' },
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
            message: 'נמחק בהצלחה',
            user: deletedUser
          })
        } else {
          return NextResponse.json(
            { error: 'משתמש לא נמצא' },
            { status: 404 }
          )
        }

      default:
        return NextResponse.json(
          { error: 'פעולה לא חוקית' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'שגיאת שרת' },
      { status: 500 }
    )
  }
}