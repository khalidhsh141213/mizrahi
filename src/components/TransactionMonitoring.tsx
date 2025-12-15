'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  AlertCircle,
  Calendar,
  RefreshCw,
  Ban,
  CheckSquare
} from 'lucide-react'
import { Input } from './ui/input'

interface Transaction {
  id: string
  userId: string
  userName: string
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'loan' | 'investment'
  amount: number
  description: string
  fromAccount: string
  toAccount?: string
  status: 'completed' | 'pending' | 'failed' | 'flagged'
  timestamp: string
  riskScore: number
  location: string
  device: string
  ip: string
}

export default function TransactionMonitoring() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  // Mock transaction data
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        userId: '1',
        userName: 'דני כהן',
        type: 'transfer',
        amount: 5000,
        description: 'העברה לחשבון 1234-5678',
        fromAccount: '1234-5678',
        toAccount: '2345-6789',
        status: 'completed',
        timestamp: '2025-01-20 10:30:15',
        riskScore: 15,
        location: 'תל אביב',
        device: 'iPhone 14 Pro',
        ip: '192.168.1.100'
      },
      {
        id: '2',
        userId: '2',
        userName: 'שרה לוי',
        type: 'withdrawal',
        amount: 2500,
        description: 'משיכורת מכונית ATM',
        fromAccount: '2345-6789',
        status: 'completed',
        timestamp: '2025-01-20 09:15:22',
        riskScore: 25,
        location: 'ATM דיזימון סנטר',
        device: 'Android',
        ip: '192.168.1.101'
      },
      {
        id: '3',
        userId: '3',
        userName: 'משה פרץ',
        type: 'payment',
        amount: 450,
        description: 'תשלום חוב חשבון חשמל',
        fromAccount: '3456-7890',
        status: 'failed',
        timestamp: '2025-01-20 08:45:10',
        riskScore: 45,
        location: 'אתר אונליין',
        device: 'Web',
        ip: '192.168.1.102'
      },
      {
        id: '4',
        userId: '4',
        userName: 'רחל גולדברג',
        type: 'deposit',
        amount: 10000,
        description: 'הפקדה לחשבון חסכונות',
        fromAccount: '4567-8901',
        status: 'completed',
        timestamp: '2025-01-19 16:20:33',
        riskScore: 5,
        location: 'סניף ראשל"צ',
        device: 'Web',
        ip: '192.168.1.103'
      },
      {
        id: '5',
        userId: '1',
        userName: 'דני כהן',
        type: 'transfer',
        amount: 15000,
        description: 'העברה לחשבון חיצוני',
        fromAccount: '1234-5678',
        toAccount: '5678-9012',
        status: 'flagged',
        timestamp: '2025-01-19 14:30:45',
        riskScore: 85,
        location: 'ניו יורק',
        device: 'Web',
        ip: '192.168.1.104'
      }
    ]

    setTransactions(mockTransactions)
    setFilteredTransactions(mockTransactions)
    setIsLoading(false)
  }, [])

  // Filter transactions based on search and filters
  useEffect(() => {
    let filtered = transactions

    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.fromAccount.includes(searchTerm) ||
        transaction.toAccount?.includes(searchTerm) ||
        transaction.userName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, statusFilter, typeFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'flagged': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'bg-green-100 text-green-800'
      case 'withdrawal': return 'bg-blue-100 text-blue-800'
      case 'transfer': return 'bg-purple-100 text-purple-800'
      case 'payment': return 'bg-orange-100 text-orange-800'
      case 'loan': return 'bg-yellow-100 text-yellow-800'
      case 'investment': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-green-600'
    if (score <= 40) return 'text-yellow-600'
    if (score <= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <AlertCircle className="h-4 w-4" />
      case 'failed': return <XCircle className="h-4 w-4" />
      case 'flagged': return <AlertTriangle className="h-4 w-4" />
      default: return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'הושלם'
      case 'pending': return 'ממתין'
      case 'failed': return 'נכשל'
      case 'flagged': return 'דורש לסימון'
      default: return status
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'deposit': return 'הפקדה'
      case 'withdrawal': return 'משיכורת'
      case 'transfer': return 'העברה'
      case 'payment': return 'תשלום'
      case 'loan': return 'הלוואה'
      case 'investment': return 'השקעה'
      default: return type
    }
  }

  const handleTransactionAction = (action: string, transaction: Transaction) => {
    console.log(`${action} transaction:`, transaction)
    // In a real application, this would call an API
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-bank-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען נתוני עסקאות...</p>
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
              <h1 className="text-xl font-semibold text-bank-primary">מעקב עסקאות</h1>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button>
                <RefreshCw className="h-4 w-4 ml-2" />
                רענן נתונים
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
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>חיפוש וסינון עסקאות</CardTitle>
            <CardDescription>סנן וסנן עסקאות חשודות</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="חפש לפי תיאור, סכום, חשבון..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  הכולם ({transactions.length})
                </Button>
                <Button
                  variant={statusFilter === 'completed' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('completed')}
                >
                  הושלמות ({transactions.filter(t => t.status === 'completed').length})
                </Button>
                <Button
                  variant={statusFilter === 'failed' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('failed')}
                >
                  נכשלות ({transactions.filter(t => t.status === 'failed').length})
                </Button>
                <Button
                  variant={statusFilter === 'flagged' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('flagged')}
                >
                  מסומנות ({transactions.filter(t => t.status === 'flagged').length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">סך העסקאות היום</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> מאתמול
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">סכום העסקאות</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₪2,458,320</div>
              <p className="text-xs text-muted-foreground">
                החודש
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">עסקאות מסומנות</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+8</span> מאתמול
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">שיעור סיכון ממוצע</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67</div>
              <p className="text-xs text-muted-foreground">
                ציון אחרון
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>עסקאות אחרונות ({filteredTransactions.length})</CardTitle>
            <CardDescription>
              {filteredTransactions.length} מתוך {transactions.length} עסקאות
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-right p-3 font-medium text-gray-700">זמן</th>
                    <th className="text-right p-3 font-medium text-gray-700">משתמש</th>
                    <th className="text-right p-3 font-medium text-gray-700">סוג</th>
                    <th className="text-right p-3 font-medium text-gray-700">תיאור</th>
                    <th className="text-right p-3 font-medium text-gray-700">סכום</th>
                    <th className="text-right p-3 font-medium text-gray-700">מחשבון</th>
                    <th className="text-right p-3 font-medium text-gray-700">אל</th>
                    <th className="text-right p-3 font-medium text-gray-700">מיקום</th>
                    <th className="text-right p-3 font-medium text-gray-700">סיכון סיכון</th>
                    <th className="text-right p-3 font-medium text-gray-700">מיקום</th>
                    <th className="text-right p-3 font-medium text-gray-700">IP</th>
                    <th className="text-right p-3 font-medium text-gray-700">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 text-right">{transaction.timestamp}</td>
                      <td className="p-3 text-right">{transaction.userName}</td>
                      <td className="p-3 text-right">
                        <Badge className={getTypeColor(transaction.type)}>
                          {getTypeText(transaction.type)}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">{transaction.description}</td>
                      <td className="p-3 text-right">₪{transaction.amount.toLocaleString()}</td>
                      <td className="p-3 text-right">{transaction.fromAccount}</td>
                      <td className="p-3 text-right">{transaction.toAccount || '-'}</td>
                      <td className="p-3 text-right">
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusText(transaction.status)}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-center space-x-2 space-x-reverse">
                          <span className={getRiskColor(transaction.riskScore)}>
                            {transaction.riskScore}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right">{transaction.location}</td>
                      <td className="p-3 text-right">{transaction.device}</td>
                      <td className="p-3 text-right">{transaction.ip}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2 space-x-reverse">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTransactionAction('approve', transaction)}
                            className="text-green-600"
                          >
                            <CheckSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTransactionAction('flag', transaction)}
                            className="text-yellow-600"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTransactionAction('block', transaction)}
                            className="text-red-600"
                          >
                            <Ban className="h-4 w-4" />
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