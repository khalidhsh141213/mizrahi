'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Settings, Activity, CreditCard, DollarSign, Target, Download } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 15420,
    activeUsers: 3247,
    totalTransactions: 48932,
    todayTransactions: 1247,
    systemHealth: 'healthy',
    totalAccounts: 12567,
    pendingVerifications: 23
  })

  const [analytics] = useState({
    revenue: {
      total: 125000,
      growth: 12.5
    }
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 15420,
        activeUsers: 3247,
        totalTransactions: 48932,
        todayTransactions: 1247,
        systemHealth: 'healthy',
        totalAccounts: 12567,
        pendingVerifications: 23
      })
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-bank-primary">פאנל ניהול</h1>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon">
                <Users className="h-4 w-4 ml-2" />
                <span className="sr-only">ניהול משתמשים</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4 ml-2" />
                <span className="sr-only">הגדרות</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">סך המשתמשים</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.activeUsers.toLocaleString()}</span> חדשים
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">עסקאות היום</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayTransactions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                סך העסקאות: {stats.totalTransactions.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">הכנסות</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₪{analytics.revenue.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className={getGrowthColor(analytics.revenue.growth)}>
                  {analytics.revenue.growth > 0 ? '+' : ''}{analytics.revenue.growth}%
                </span>
                {' '}מאתמול
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">זמינות מערכת</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.systemHealth === 'healthy' ? '100%' :
                  stats.systemHealth === 'warning' ? '85%' : '45%'}
              </div>
              <p className="text-xs text-muted-foreground">
                מצב תקין
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>פעולות מהירות</CardTitle>
              <CardDescription>גישה מהירה לפעולות נפוצות</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/admin/users">
                  <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>ניהול משתמשים</span>
                  </Button>
                </Link>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                  <Download className="h-6 w-6" />
                  <span>ייצוא דוחות</span>
                </Button>
                <Link href="/admin/live">
                  <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center gap-2 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700">
                    <Activity className="h-6 w-6 text-red-600 animate-pulse" />
                    <span className="text-red-700 font-bold">בקרה חיה</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}