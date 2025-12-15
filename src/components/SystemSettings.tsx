'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  Users, 
  Globe, 
  Lock, 
  Smartphone, 
  Mail, 
  CreditCard, 
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Eye,
  EyeOff
} from 'lucide-react'

interface SystemSetting {
  id: string
  category: 'security' | 'performance' | 'notifications' | 'compliance' | 'integration'
  name: string
  description: string
  currentValue: string | boolean | number
  type: 'boolean' | 'string' | 'number' | 'select'
  options?: string[]
  status: 'active' | 'warning' | 'error'
  lastModified: string
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSetting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock system settings data
  useEffect(() => {
    const mockSettings: SystemSetting[] = [
      // Security Settings
      {
        id: '1',
        category: 'security',
        name: 'אימות דו-שלבי',
        description: 'דרישת אימות דו-שלבי לכל המשתמשים',
        currentValue: true,
        type: 'boolean',
        status: 'active',
        lastModified: '2025-01-15 10:30'
      },
      {
        id: '2',
        category: 'security',
        name: 'מדיניות סיסמה',
        description: 'מינימום אורך סיסמה',
        currentValue: 8,
        type: 'number',
        status: 'active',
        lastModified: '2025-01-10 14:20'
      },
      {
        id: '3',
        category: 'security',
        name: 'נעילת חשבונות',
        description: 'מספר ניסיוני כניסה חריגים',
        currentValue: 3,
        type: 'number',
        status: 'warning',
        lastModified: '2025-01-08 09:15'
      },
      {
        id: '4',
        category: 'security',
        name: 'הצפנת IP',
        description: 'רשימת IP כתובות',
        currentValue: '192.168.1.0/24',
        type: 'string',
        status: 'active',
        lastModified: '2025-01-05 16:45'
      },
      
      // Performance Settings
      {
        id: '5',
        category: 'performance',
        name: 'זמן עדכונים מקסימלי',
        description: 'זמן מקסימלי לפניות אוטומטיות',
        currentValue: 5000,
        type: 'number',
        status: 'active',
        lastModified: '2025-01-12 11:30'
      },
      {
        id: '6',
        category: 'performance',
        name: 'גודל תהליכיון',
        description: 'גודל התהליכיות לכל בקשה',
        currentValue: 30,
        type: 'number',
        status: 'active',
        lastModified: '2025-01-10 08:20'
      },
      {
        id: '7',
        category: 'performance',
        name: 'שימוש מערכת',
        description: 'זמן מקסימלי לשימוש מערכת',
        currentValue: 99.9,
        type: 'number',
        status: 'active',
        lastModified: '2025-01-20 10:15'
      },
      
      // Notification Settings
      {
        id: '8',
        category: 'notifications',
        name: 'התראות דוא"ל',
        description: 'שליחת התראות דוא"ל למנהלים',
        currentValue: true,
        type: 'boolean',
        status: 'active',
        lastModified: '2025-01-18 14:30'
      },
      {
        id: '9',
        category: 'notifications',
        name: 'התראות SMS',
        description: 'שליחת התראות SMS למשתמשים',
        currentValue: false,
        type: 'boolean',
        status: 'active',
        lastModified: '2025-01-15 09:45'
      },
      {
        id: '10',
        category: 'notifications',
        name: 'התראות אבטחה',
        description: 'שליחת התראות אבטחה',
        currentValue: true,
        type: 'boolean',
        status: 'active',
        lastModified: '2025-01-12 13:20'
      },
      
      // Compliance Settings
      {
        id: '11',
        category: 'compliance',
        name: 'גיבוי יומי',
        description: 'משך זמן שמירת נתוני מערכת',
        currentValue: 7,
        type: 'number',
        status: 'active',
        lastModified: '2025-01-20 16:00'
      },
      {
        id: '12',
        category: 'compliance',
        name: 'גיבוי נתונים',
        description: 'זמן מקסימלי לשמירת נתונים',
        currentValue: 30,
        type: 'number',
        status: 'warning',
        lastModified: '2025-01-19 10:30'
      },
      
      // Integration Settings
      {
        id: '13',
        category: 'integration',
        name: 'חיבור API חיצוני',
        description: 'מפתח API חיצוני לצדד צדד',
        currentValue: true,
        type: 'boolean',
        status: 'active',
        lastModified: '2025-01-15 11:45'
      },
      {
        id: '14',
        category: 'integration',
        name: 'חיבור API פנימי',
        description: 'חיבור API פנימי לצדד צדד',
        currentValue: false,
        type: 'boolean',
        status: 'error',
        lastModified: '2025-01-10 08:15'
      }
    ]

    setSettings(mockSettings)
    setIsLoading(false)
  }, [])

  // Filter settings based on category
  const filteredSettings = selectedCategory === 'all' 
    ? settings 
    : settings.filter(setting => setting.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'error': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="h-5 w-5" />
      case 'performance': return <Activity className="h-5 w-5" />
      case 'notifications': return <Bell className="h-5 w-5" />
      case 'compliance': return <Database className="h-5 w-5" />
      case 'integration': return <Globe className="h-5 w-5" />
      default: return <Settings className="h-5 w-5" />
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'security': return 'אבטחה'
      case 'performance': return 'ביצועים'
      case 'notifications': return 'התראות'
      case 'compliance': return 'ציות'
      case 'integration': return 'אינטגרציות'
      default: return 'הכול'
    }
  }

  const handleSettingChange = (settingId: string, newValue: any) => {
    console.log(`Changing setting ${settingId} to:`, newValue)
    // In a real application, this would call an API
    setSettings(prev => 
      prev.map(setting => 
        setting.id === settingId 
          ? { ...setting, currentValue: newValue, lastModified: new Date().toISOString() }
          : setting
      )
    )
  }

  const handleSaveAll = () => {
    console.log('Saving all settings:', settings)
    // In a real application, this would call an API to save all settings
  }

  const handleReset = () => {
    console.log('Resetting settings to defaults')
    // In a real application, this would call an API to reset settings
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-bank-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען הגדרות מערכת...</p>
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
              <h1 className="text-xl font-semibold text-bank-primary">הגדרות מערכת</h1>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button onClick={handleSaveAll}>
                <Save className="h-4 w-4 ml-2" />
                שמור שינויים
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 ml-2" />
                איפוס
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">
              <div className="flex flex-col items-center space-y-1">
                <Settings className="h-5 w-5" />
                <span>הכול</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="security">
              <div className="flex flex-col items-center space-y-1">
                <Shield className="h-5 w-5" />
                <span>אבטחה</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="performance">
              <div className="flex flex-col items-center space-y-1">
                <Activity className="h-5 w-5" />
                <span>ביצועים</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <div className="flex flex-col items-center space-y-1">
                <Bell className="h-5 w-5" />
                <span>התראות</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="compliance">
              <div className="flex flex-col items-center space-y-1">
                <Database className="h-5 w-5" />
                <span>ציות</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="integration">
              <div className="flex flex-col items-center space-y-1">
                <Globe className="h-5 w-5" />
                <span>אינטגרציות</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Settings Content */}
          <TabsContent value={selectedCategory} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCategoryIcon(selectedCategory)}
                  {getCategoryText(selectedCategory)}
                </CardTitle>
                <CardDescription>
                  {filteredSettings.length} הגדרות {getCategoryText(selectedCategory)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div>
                          <h4 className="font-semibold text-bank-primary">{setting.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusColor(setting.status)}>
                              {getStatusIcon(setting.status)}
                              <span className="mr-2">
                                {setting.status === 'active' ? 'פעיל' :
                                 setting.status === 'warning' ? 'אזהרה' :
                                 setting.status === 'error' ? 'שגיאה' : setting.status}
                              </span>
                            </Badge>
                            <span className="text-xs text-gray-400">
                              עודכן: {new Date(setting.lastModified).toLocaleString('he-IL')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {setting.type === 'boolean' && (
                          <Button
                            variant={setting.currentValue ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleSettingChange(setting.id, !setting.currentValue)}
                          >
                            {setting.currentValue ? 'פעיל' : 'כבוי'}
                          </Button>
                        )}
                        
                        {setting.type === 'number' && (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={setting.currentValue as string}
                              onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
                              className="w-20 text-center"
                              min="0"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSettingChange(setting.id, 0)}
                            >
                              איפוס
                            </Button>
                          </div>
                        )}
                        
                        {setting.type === 'string' && (
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={setting.currentValue as string}
                              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                              className="w-40 text-right"
                              placeholder={setting.name}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSettingChange(setting.id, '')}
                            >
                              איפוס
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* System Status */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              מצב מערכת
            </CardTitle>
            <CardDescription>סטטוס כללי של המערכת</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-800">שרת ראשי</h4>
                  <Badge className="bg-green-100 text-green-800">תקין</Badge>
                </div>
                <p className="text-sm text-gray-600">כל השירותים פעילים</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-800">שרת גיבוי</h4>
                  <Badge className="bg-green-100 text-green-800">תקין</Badge>
                </div>
                <p className="text-sm text-gray-600">כל השירותים פעילים</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-yellow-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-yellow-800">בסיס נתונים</h4>
                  <Badge className="bg-yellow-100 text-yellow-800">87% פניקיות</Badge>
                </div>
                <p className="text-sm text-gray-600">3 נתונים לא פעילים</p>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-800">חיבור API</h4>
                  <Badge className="bg-blue-100 text-blue-800">99.9% פניקיות</Badge>
                </div>
                <p className="text-sm text-gray-600">כל הבקשות מטופלות</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}