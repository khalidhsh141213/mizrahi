import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotUsernamePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-bank-primary rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-bank-primary">
            שכחת שם משתמש?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            נאנה כאן את פרטי הזהות
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-bank-primary">שחזור שם משתמש</CardTitle>
            <CardDescription className="text-gray-600">
              הזן את כתובת הדוא"ל ונשלח אותו אליך
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-gray-600 mb-6">
                ניתן להזין את כתובת הדוא"ל ונשלח אותו אליך בכמה שלבנים:
              </p>

              <div className="space-y-3">
                <div className="flex flex-col items-center space-y-2">
                  <label htmlFor="email" className="text-right font-medium mb-2">
                    כתובת דוא"ל
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="הזן כתובת דוא\"
                    className="w-full p-3 border rounded-md text-right"
                    dir="rtl"
                  />
                  <Button className="w-full">
                    <Mail className="h-4 w-4 ml-2" />
                    שלח קישור
                  </Button>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <label htmlFor="phone" className="text-right font-medium mb-2">
                    מספר טלפון
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="הזן מספר טלפון"
                    className="w-full p-3 border rounded-md text-right"
                    dir="rtl"
                  />
                  <Button className="w-full">
                    <Mail className="h-4 w-4 ml-2" />
                    שלח קישור
                  </Button>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <label htmlFor="account-number" className="text-right font-medium mb-2">
                    מספר חשבון
                  </label>
                  <input
                    id="account-number"
                    type="text"
                    placeholder="הזן מספר חשבון"
                    className="w-full p-3 border rounded-md text-right"
                    dir="rtl"
                  />
                  <Button className="w-full">
                    <Mail className="h-4 w-4 ml-2" />
                    שלח קישור
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

        </Card>

        <div className="text-center space-y-4">
          <Link href="/admin/login" className="text-bank-secondary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            חזרה לדף כניסה מנהל
          </Link>
        </div>
      </div>
    </div>
  )
}