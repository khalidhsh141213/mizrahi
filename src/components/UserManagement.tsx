'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldX,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  DollarSign
} from 'lucide-react'

interface User {
  id: string
  username: string
  fullName: string
  email: string
  phone: string
  accountNumber: string
  balance: number
  status: 'active' | 'inactive' | 'suspended' | 'pending'
  lastLogin: string
  registrationDate: string
  kycStatus: 'verified' | 'pending' | 'rejected'
  riskLevel: 'low' | 'medium' | 'high'
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Mock user data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'dani.cohen',
        fullName: 'דני כהן',
        email: 'dani.cohen@email.com',
        phone: '054-123-4567',
        accountNumber: '1234-5678',
        balance: 125000,
        status: 'active',
        lastLogin: '2025-01-20 10:30',
        registrationDate: '2023-03-15',
        kycStatus: 'verified',
        riskLevel: 'low'
      },
      {
        id: '2',
        username: 'sarah.levi',
        fullName: 'שרה לוי',
        email: 'sarah.levi@email.com',
        phone: '052-987-6543',
        accountNumber: '2345-6789',
        balance: 87500,
        status: 'active',
        lastLogin: '2025-01-20 09:15',
        registrationDate: '2023-06-20',
        kycStatus: 'verified',
        riskLevel: 'medium'
      },
      {
        id: '3',
        username: 'moshe.perez',
        fullName: 'משה פרץ',
        email: 'moshe.perez@email.com',
        phone: '053-456-7890',
        accountNumber: '3456-7890',
        balance: 234000,
        status: 'suspended',
        lastLogin: '2025-01-18 14:20',
        registrationDate: '2023-01-10',
        kycStatus: 'pending',
        riskLevel: 'high'
      },
      {
        id: '4',
        username: 'rachel.goldberg',
        fullName: 'רחל גולדברג',
        email: 'rachel.g@email.com',
        phone: '050-111-2222',
        accountNumber: '4567-8901',
        balance: 45600,
        status: 'inactive',
        lastLogin: '2025-01-10 11:30',
        registrationDate: '2023-09-05',
        kycStatus: 'verified',
        riskLevel: 'low'
      }
    ]

    setUsers(mockUsers)
    setFilteredUsers(mockUsers)
    setIsLoading(false)
  }, [])

  // Filter users based on search and status
  useEffect(() => {
    let filtered = users

    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.accountNumber.includes(searchTerm)
      )
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getKYCColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל'
      case 'inactive': return 'לא פעיל'
      case 'suspended': return 'מושהה'
      case 'pending': return 'ממתין'
      default: return status
    }
  }

  const getKYCText = (status: string) => {
    switch (status) {
      case 'verified': return 'מאומת'
      case 'pending': return 'ממתין אימות'
      case 'rejected': return 'נדחה'
      default: return status
    }
  }

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low': return 'נמוך'
      case 'medium': return 'בינוני'
      case 'high': return 'גבוה'
      default: return level
    }
  }

  const handleUserAction = (action: string, user: User) => {
    console.log(`${action} user:`, user)
    // In a real application, this would call an API
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-bank-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען נתוני משתמשים...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-semibold text-bank-primary">ניהול משתמשים</h1>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button>
                <UserPlus className="h-4 w-4 ml-2" />
                משתמש חדש
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                יצא נתונים
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>חיפוש וסינון</CardTitle>
            <CardDescription>חפש משתמשים וסנן תוצאות</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="חפש לפי שם, דוא\
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 text-right
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  הכולם ({users.length})
                </Button>
                <Button
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('active')}
                >
                  פעילים ({users.filter(u => u.status === 'active').length})
                </Button>
                <Button
                  variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('inactive')}
                >
                  לא פעילים ({users.filter(u => u.status === 'inactive').length})
                </Button>
                <Button
                  variant={statusFilter === 'suspended' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('suspended')}
                >
                  מושהים ({users.filter(u => u.status === 'suspended').length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>רשימת משתמשים ({filteredUsers.length})</CardTitle>
            <CardDescription>
              {filteredUsers.length} מתוך {users.length} משתמשים
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-right p-3 font-medium text-gray-700">שם מלא</th>
                    <th className="text-right p-3 font-medium text-gray-700">שם משתמש</th>
                    <th className="text-right p-3 font-medium text-gray-700">דוא"ל</th>
                    <th className="text-right p-3 font-medium text-gray-700">טלפון</th>
                    <th className="text-right p-3 font-medium text-gray-700">מספר חשבון</th>
                    <th className="text-right p-3 font-medium text-gray-700">יתרה</th>
                    <th className="text-right p-3 font-medium text-gray-700">סטטוס</th>
                    <th className="text-right p-3 font-medium text-gray-700">KYC</th>
                    <th className="text-right p-3 font-medium text-gray-700">סיכון</th>
                    <th className="text-right p-3 font-medium text-gray-700">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-right">{user.fullName}</td>
                      <td className="p-3 text-right">{user.username}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2 space-x-reverse">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2 space-x-reverse">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">{user.accountNumber}</td>
                      <td className="p-3 text-right">₪{user.balance.toLocaleString()}</td>
                      <td className="p-3 text-right">
                        <Badge className={getStatusColor(user.status)}>
                          {getStatusText(user.status)}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Badge className={getKYCColor(user.kycStatus)}>
                          {getKYCText(user.kycStatus)}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Badge className={getRiskColor(user.riskLevel)}>
                          {getRiskText(user.riskLevel)}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2 space-x-reverse">
                          <span className="text-sm">{user.lastLogin}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2 space-x-reverse">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction('edit', user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction('suspend', user)}
                            className="text-yellow-600"
                          >
                            <ShieldX className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction('delete', user)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}