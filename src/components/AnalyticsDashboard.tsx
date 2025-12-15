'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Eye,
  Download,
  Calendar,
  Smartphone,
  Globe,
  CreditCard,
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap
} from 'lucide-react'

interface AnalyticsData {
  period: 'today' | 'week' | 'month' | 'year'
  users: {
    total: number
    active: number
    new: number
    returning: number
  }
  transactions: {
    total: number
    volume: number
    average: number
    success: number
    failed: number
  }
  revenue: {
    total: number
    growth: number
    bySource: {
      online: number
      mobile: number
      branch: number
    }
  }
  performance: {
    uptime: number
    responseTime: number
    errorRate: number
    throughput: number
  }
  security: {
    threatsBlocked: number
    suspiciousActivity: number
    breachesPrevented: number
    alertsTriggered: number
  }
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month')
  const [isLoading, setIsLoading] = useState(true)

  // Mock analytics data
  useEffect(() => {
    const mockData: AnalyticsData = {
      period: 'month',
      users: {
        total: 15420,
        active: 3247,
        new: 1247,
        returning: 8943
      },
      transactions: {
        total: 48932,
        volume: 245832000,
        average: 1567,
        success: 47589,
        failed: 1343
      },
      revenue: {
        total: 12458320,
        growth: 12.5,
        bySource: {
          online: 8234567,
          mobile: 3456789,
          branch: 7890123
        }
      },
      performance: {
        uptime: 99.9,
        responseTime: 245,
        errorRate: 0.1,
        throughput: 1567
      },
      security: {
        threatsBlocked: 1247,
        suspiciousActivity: 89,
        breachesPrevented: 34,
        alertsTriggered: 156
      }
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setAnalytics(mockData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getPerformanceColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'text-green-600'
    if (value >= threshold * 0.8) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSecurityColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-bank-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען נתוני נתונים...</p>
        </div>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-xl font-semibold text-bank-primary">ניתוחי אנליטיקה</h1>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button>
                <Calendar className="h-4 w-4 ml-2" />
                {selectedPeriod === 'today' ? 'היום' :
                  selectedPeriod === 'week' ? 'שבוע' :
                    selectedPeriod === 'month' ? 'חודש' : 'שנה'}
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                יצא דוח
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">משתמשים פעילים</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.users.active.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{analytics.users.new}</span> חדשים
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>סך המשתמשים: {analytics.users.total.toLocaleString()}</span>
                  <span>חוזרים: {analytics.users.returning.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">עסקאות היום</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.transactions.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                סך העסקאות: {analytics.transactions.volume.toLocaleString()}
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>הצלחה: {analytics.transactions.success}</span>
                  <span>נכשלו: {analytics.transactions.failed}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">הכנסות היום</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₪{analytics.revenue.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className={getGrowthColor(analytics.revenue.growth)}>
                  {analytics.revenue.growth > 0 ? '+' : ''}{analytics.revenue.growth}%
                </span>
                מאתמול
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">זמן פעילות מערכת</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.performance.uptime}%</div>
              <p className="text-xs text-muted-foreground">
                זמן זמין: {analytics.performance.responseTime}ms
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
            <TabsTrigger value="users">משתמשים</TabsTrigger>
            <TabsTrigger value="transactions">עסקאות</TabsTrigger>
            <TabsTrigger value="revenue">הכנסות</TabsTrigger>
            <TabsTrigger value="performance">ביצועים</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>גידול משתמשים</CardTitle>
                  <CardDescription>גידול משתמשים בחודש האחרון</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <BarChart3 className="h-12 w-12" />
                    <p>תרשים גידול יופיע כאן</p>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Volume */}
              <Card>
                <CardHeader>
                  <CardTitle>נפח העסקאות</CardTitle>
                  <CardDescription>נפח עסקאות לפי יום</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <BarChart3 className="h-12 w-12" />
                    <p>תרשים נפח יופיע כאן</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>ניתוחי משתמשים</CardTitle>
                <CardDescription>פירוט משתמשים לפי סוג</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span>משתמשים חדשים</span>
                    <span className="text-2xl font-bold text-green-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span>משתמשים חוזרים</span>
                    <span className="text-2xl font-bold text-blue-600">8,943</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span>משתמשים פעילים</span>
                    <span className="text-2xl font-bold text-purple-600">3,247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span>משתמשים לא פעילים</span>
                    <span className="text-2xl font-bold text-gray-600">2,233</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>ניתוחי עסקאות</CardTitle>
                <CardDescription>ניתוחי עסקאות לפי סוג</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">עסקאות אשראי</span>
                      </div>
                      <div className="text-2xl font-bold">12,456</div>
                      <p className="text-sm text-gray-600">25.4% מהעסקאות</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Smartphone className="h-5 w-5 text-green-600" />
                        <span className="font-semibold">עסקאות מוביילים</span>
                      </div>
                      <div className="text-2xl font-bold">8,234</div>
                      <p className="text-sm text-gray-600">16.8% מהעסקאות</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Globe className="h-5 w-5 text-purple-600" />
                        <span className="font-semibold">עסקאות אונליין</span>
                      </div>
                      <div className="text-2xl font-bold">4,567</div>
                      <p className="text-sm text-gray-600">9.3% מהעסקאות</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Shield className="h-5 w-5 text-orange-600" />
                        <span className="font-semibold">עסקאות בסניפים</span>
                      </div>
                      <div className="text-2xl font-bold">3,675</div>
                      <p className="text-sm text-gray-600">7.5% מהעסקאות</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>ניתוחי הכנסות</CardTitle>
                <CardDescription>הכנסות לפי מקור וסוג</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">ערוץ</span>
                        <span className="text-2xl font-bold text-green-600">₪4,234,567</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">+15.2%</span>
                        <span className="text-gray-500 text-sm">מאתמול</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">אונליין</span>
                        <span className="text-2xl font-bold text-blue-600">₪3,456,789</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-600">+8.7%</span>
                        <span className="text-gray-500 text-sm">מאתמול</span>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">מוביילים</span>
                        <span className="text-2xl font-bold text-purple-600">₪2,345,678</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-600">+5.3%</span>
                        <span className="text-gray-500 text-sm">מאתמול</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">סניפים</span>
                        <span className="text-2xl font-bold text-orange-600">₪2,546,789</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">-2.1%</span>
                        <span className="text-gray-500 text-sm">מאתמול</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>ניתוחי ביצועים</CardTitle>
                <CardDescription>ביצועים מערכת וזמינות</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold mb-2">זמינות מערכת</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>זמן פעילות</span>
                        <span className="text-2xl font-bold text-green-600">99.9%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>זמן תגובה</span>
                        <span className="text-2xl font-bold text-yellow-600">0.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0.1%' }}></div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>זמן תגובה</span>
                        <span className="text-2xl font-bold text-red-600">0.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>


                  <div className="space-y-4">
                    <h4 className="font-semibold mb-2">ביצועי שירותים</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">זמן תגובה</span>
                          <span className="text-2xl font-bold text-green-600">245ms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">מצוין</span>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">זמן תגובה</span>
                          <span className="text-2xl font-bold text-yellow-600">1,567ms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-yellow-600">איטי</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>פעולות מהירות</CardTitle>
            <CardDescription>פעולות ניהול וניתוחים מהירות</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <Users className="h-6 w-6" />
                <span>ניהול משתמשים</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <Download className="h-6 w-6" />
                <span>ייצא דוחות</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                <span>ביקורת אבטחה</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                <Activity className="h-6 w-6" />
                <span>בדיקת ביצועים</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main >
    </div >
  )
}