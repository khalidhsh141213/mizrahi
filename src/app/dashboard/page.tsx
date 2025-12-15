'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Settings,
  Bell,
  HelpCircle,
  Shield,
  LogOut,
  ChevronLeft,
  Wallet
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [userName, setUserName] = useState('לקוח יקר')
  const [accountBalance, setAccountBalance] = useState(125000)
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUserName('דני כהן')
      setIsVerified(true) // Simulate verified user
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const recentTransactions = [
    { id: 1, description: 'העברה בנקאית - יוסי לוי', amount: -2500, date: '15/01/2025', type: 'debit' },
    { id: 2, description: 'משכורת - מזרחי טפחות', amount: 14500, date: '01/01/2025', type: 'credit' },
    { id: 3, description: 'חברת חשמל', amount: -450, date: '10/01/2025', type: 'debit' },
    { id: 4, description: 'פירעון פיקדון', amount: 12000, date: '05/01/2025', type: 'credit' },
  ]

  const quickActions = [
    { title: 'העברה', icon: ArrowUpRight, href: '/transfer', color: 'bg-emerald-500', gradient: 'from-emerald-500 to-emerald-600' },
    { title: 'תשלומים', icon: CreditCard, href: '/payments', color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600' },
    { title: 'פיקדונות', icon: PiggyBank, href: '/deposits', color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-600' },
    { title: 'הלוואות', icon: Wallet, href: '/loans', color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-600' },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-bank-primary border-t-transparent mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium animate-pulse">טוען את החשבון שלך...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50" dir="rtl">
      {/* Top Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                <img
                  src="https://www.mizrahi-tefahot.co.il/media/vlwlbdf2/logo.svg"
                  alt="מזרחי טפחות"
                  className="h-9 w-auto"
                />
              </Link>
              <div className="hidden md:flex h-6 w-px bg-gray-200"></div>
              <h1 className="hidden md:block text-lg font-medium text-gray-700">לוח בקרה אישי</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100/80">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100/80">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              <Button
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
                onClick={() => window.location.href = '/'}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">יציאה</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              בוקר טוב, {userName} <span className="text-2xl">👋</span>
            </h2>
            <p className="text-gray-500">הנה סקירה מהירה של המצב הפיננסי שלך להיום</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-bank-primary text-white hover:bg-bank-primary/90 shadow-lg shadow-bank-primary/20 transition-all hover:scale-105">
              <ArrowUpRight className="ml-2 h-4 w-4" />
              העברה חדשה
            </Button>
          </div>
        </div>

        {/* Financial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet className="h-24 w-24" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-100 font-medium text-sm">יתרת עו"ש</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₪{accountBalance.toLocaleString()}</div>
              <div className="flex items-center text-blue-200 text-sm bg-white/10 w-fit px-2 py-1 rounded-full backdrop-blur-sm">
                <TrendingUp className="h-3 w-3 ml-1" />
                +2.5% החודש
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">אשראי כולל</CardTitle>
              <div className="p-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                <CreditCard className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₪45,000</div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 ml-2"></span>
                3 כרטיסים פעילים
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">תיק השקעות</CardTitle>
              <div className="p-2 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₪320,000</div>
              <p className="text-xs text-emerald-600 mt-1 font-medium bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                +12.4% תשואה שנתית
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">חיסכון ופיקדונות</CardTitle>
              <div className="p-2 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <PiggyBank className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₪85,000</div>
              <p className="text-xs text-gray-500 mt-1">מתוך יעד של ₪100,000</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid: Actions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Recent Activity Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-800">פעילות בחשבון</h3>
                <Button variant="ghost" size="sm" className="text-bank-primary hover:bg-bank-light-blue hover:text-bank-primary">
                  לכל הפעולות
                  <ChevronLeft className="mr-1 h-4 w-4" />
                </Button>
              </div>
              <div className="divide-y divide-gray-50">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${tx.type === 'credit' ? 'bg-emerald-50' : 'bg-red-50'
                        } group-hover:scale-110 transition-transform`}>
                        {tx.type === 'credit' ? (
                          <ArrowDownRight className={`h-5 w-5 ${tx.type === 'credit' ? 'text-emerald-500' : 'text-red-500'}`} />
                        ) : (
                          <ArrowUpRight className={`h-5 w-5 ${tx.type === 'credit' ? 'text-emerald-500' : 'text-red-500'}`} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{tx.description}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{tx.date}</p>
                      </div>
                    </div>
                    <span className={`font-mono font-bold text-lg ${tx.type === 'credit' ? 'text-emerald-600' : 'text-gray-900'
                      }`}>
                      {tx.type === 'credit' ? '+' : '-'}
                      ₪{Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Quick Actions & Cards */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg">פעולות מהירות</CardTitle>
                <CardDescription>גישה מיידית לשירותים נפוצים</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href} className="block group">
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-gray-100 group-hover:border-bank-primary/20 group-hover:bg-white group-hover:shadow-md transition-all duration-300 h-full">
                      <div className={`p-3 rounded-full bg-gradient-to-br ${action.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-sm text-gray-700">{action.title}</span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  אבטחת חשבון
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm border-b border-white/10 pb-3">
                    <span className="text-gray-300">אימות דו-שלבי</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none hover:bg-emerald-500/30">פעיל</Badge>
                  </div>
                  <div className="text-center pt-2">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                      הגדרות אבטחה מתקדמות
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}