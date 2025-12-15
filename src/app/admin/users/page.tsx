'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge'
import {
    Search,
    MoreHorizontal,
    Shield,
    Ban,
    Trash2,
    Eye,
    Activity,
    MapPin,
    Smartphone,
    Wifi
} from 'lucide-react'

// Mock Data
const MOCK_USERS = [
    { id: 'USR-001', name: 'אחמד כהן', email: 'ahmed@example.com', role: 'user', status: 'active', lastActive: 'לפני 5 דקות', ip: '192.168.1.105', device: 'phone (iPhone 14)', location: 'תל אביב' },
    { id: 'USR-002', name: 'שרה לוי', email: 'sara@example.com', role: 'admin', status: 'active', lastActive: 'עכשיו', ip: '10.0.0.1', device: 'Desktop (Windows)', location: 'ירושלים' },
    { id: 'USR-003', name: 'יוסי ישראלי', email: 'yosi@example.com', role: 'user', status: 'blocked', lastActive: 'לפני יומיים', ip: '84.22.11.55', device: 'Tablet (iPad)', location: 'חיפה' },
    { id: 'USR-004', name: 'מוחמד עלי', email: 'mohammad@example.com', role: 'user', status: 'active', lastActive: 'לפני שעה', ip: '192.168.1.110', device: 'Phone (Galaxy S23)', location: 'נצרת' },
    { id: 'USR-005', name: 'דוד המלך', email: 'david@example.com', role: 'user', status: 'warning', lastActive: 'לפני 10 דקות', ip: '77.12.33.11', device: 'Desktop (macOS)', location: 'אילת' },
]

export default function UsersManagementPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null)
    const [isSpyModeOpen, setIsSpyModeOpen] = useState(false)

    const filteredUsers = MOCK_USERS.filter(user =>
        user.name.includes(searchTerm) ||
        user.email.includes(searchTerm) ||
        user.id.includes(searchTerm)
    )

    const handleSpyMode = (user: typeof MOCK_USERS[0]) => {
        setSelectedUser(user)
        setIsSpyModeOpen(true)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-bank-primary">ניהול משתמשים</h1>
                        <p className="text-gray-500 mt-1">צפייה בכל המשתמשים, ניהול הרשאות ומעקב פעילות</p>
                    </div>
                    <Button className="gap-2">
                        <Shield className="h-4 w-4" />
                        הוסף משתמש מנהל
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>רשימת משתמשים ({filteredUsers.length})</CardTitle>
                            <div className="relative w-72">
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="חיפוש לפי שם, אימייל או תעודת זהות..."
                                    className="pr-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-right">מזהה</TableHead>
                                    <TableHead className="text-right">שם מלא</TableHead>
                                    <TableHead className="text-right">אימייל</TableHead>
                                    <TableHead className="text-right">סטטוס</TableHead>
                                    <TableHead className="text-right">נראה לאחרונה</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                user.status === 'active' ? 'default' :
                                                    user.status === 'blocked' ? 'destructive' : 'secondary'
                                            }>
                                                {user.status === 'active' ? 'פעיל' :
                                                    user.status === 'blocked' ? 'חסום' : 'בבדיקה'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{user.lastActive}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">פתח תפריט</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>פעולות</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleSpyMode(user)} className="text-blue-600 cursor-pointer">
                                                        <Eye className="ml-2 h-4 w-4" />
                                                        מצב ריגול (Spy)
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Shield className="ml-2 h-4 w-4" />
                                                        ערוך הרשאות
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-yellow-600 cursor-pointer">
                                                        <Ban className="ml-2 h-4 w-4" />
                                                        חסום משתמש
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                                                        <Trash2 className="ml-2 h-4 w-4" />
                                                        מחק משתמש
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Spy Mode Dialog */}
                <Dialog open={isSpyModeOpen} onOpenChange={setIsSpyModeOpen}>
                    <DialogContent className="max-w-2xl" dir="rtl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-red-600">
                                <Eye className="h-5 w-5" />
                                מעקב פעילות בזמן אמת - {selectedUser?.name}
                            </DialogTitle>
                            <DialogDescription>
                                צפייה בנתונים רגישים ופעילות משתמש. המידע הזה חסוי.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-gray-100 rounded-lg space-y-2">
                                <div className="text-sm text-gray-500">כתובת IP</div>
                                <div className="font-mono text-lg flex items-center gap-2">
                                    <Wifi className="h-4 w-4" />
                                    {selectedUser?.ip}
                                </div>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg space-y-2">
                                <div className="text-sm text-gray-500">מכשיר</div>
                                <div className="font-medium flex items-center gap-2">
                                    <Smartphone className="h-4 w-4" />
                                    {selectedUser?.device}
                                </div>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg space-y-2">
                                <div className="text-sm text-gray-500">מיקום משוער</div>
                                <div className="font-medium flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {selectedUser?.location}
                                </div>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg space-y-2">
                                <div className="text-sm text-gray-500">סטטוס חיבור</div>
                                <div className="font-medium flex items-center gap-2 text-green-600">
                                    <Activity className="h-4 w-4" />
                                    מחובר כעת
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold mb-3">לוג פעילות אחרון</h4>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 text-sm border-b pb-2 last:border-0">
                                        <span className="text-gray-500 font-mono">14:2{i}:05</span>
                                        <span>ביצע פעולה רגישה במערכת - צפייה ביתרה</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
