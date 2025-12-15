import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-bank-primary rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-bank-primary">
            שכחת סיסמה?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            נא תדאג להחלם סיסמתך
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-bank-primary">איפוס סיסמה</CardTitle>
            <CardDescription className="text-gray-600">
              בחרו את השלבים האימותי שלך
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-gray-600 mb-6">
                ניתן להכניס את הסיסמה החדשה באמצעות הדוא"ל והזן את הטלפון שלך
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-bank-primary rounded-full flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-bank-primary">שליחה לדוא"ל</h4>
                    <p className="text-sm text-gray-600">קבל קישור חדשבון שלך</p>
                  </div>
                  <Button className="w-full">
                    <Mail className="h-4 w-4 ml-2" />
                    שלח לדוא"ל
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-bank-primary rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-bank-primary">שחזור באמצעות</h4>
                    <p className="text-sm text-gray-600">בקשהות סיסמה חדשה</p>
                  </div>
                  <Button className="w-full">
                    <Shield className="h-4 w-4 ml-2" />
                    שחזור באמצעות
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Link href="/admin/login" className="text-bank-secondary hover:underline flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" />
            חזרה לדף כניסה מנהל
          </Link>
        </div>
      </div>
    </div>
  )
}