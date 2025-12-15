'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react'

export default function HelpPage() {
  const helpOptions = [
    {
      title: 'שכחת סיסמה',
      description: 'קבל סיסמה חדשה בדוא"ל או ב-SMS',
      icon: Mail,
      href: '/forgot-password'
    },
    {
      title: 'שכחת שם משתמש',
      description: 'מצא את שם המשתמש שלך',
      icon: MessageCircle,
      href: '/forgot-username'
    },
    {
      title: 'נעילת חשבון',
      description: 'נעל את חשבונך לזמן קצוב',
      icon: ArrowRight,
      href: '/lock-account'
    }
  ]

  const contactOptions = [
    {
      title: 'מוקד שירות לקוחות',
      phone: '*8860',
      hours: '24/7',
      description: 'שירות לקוחות זמין כל היום, כל שעה'
    },
    {
      title: 'סניפים',
      description: 'מצא את הסניף הקרוב אליך',
      href: '/branches'
    },
    {
      title: 'צ\'אט עם נציג',
      description: 'קבל עזרה מיידית בצ\'אט',
      href: '/chat'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-bank-primary mb-4">
            מרכז עזרה
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            אנחנו כאן כדי לעזור לך בכל שאלה או בעיה. בחר את האפשרות המתאימה לך.
          </p>
        </div>

        {/* Quick Help Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {helpOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={option.href}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-bank-primary/10 rounded-full flex items-center justify-center mb-4">
                    <option.icon className="h-6 w-6 text-bank-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {option.phone && <Phone className="h-5 w-5 text-bank-primary" />}
                  {option.title}
                </CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {option.phone ? (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-bank-primary mb-2">
                      {option.phone}
                    </div>
                    <p className="text-sm text-gray-600">{option.hours}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Link href={option.href || '#'}>
                      <Button className="bg-bank-secondary hover:bg-bank-secondary/90">
                        {option.href?.includes('branches') ? 'מצא סניפים' : 'התחל צ\'אט'}
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>שאלות נפוצות</CardTitle>
            <CardDescription>
              ענו על השאלות הנפוצות ביותר
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-bank-primary mb-2">
                  כיצד לפתוח חשבון בנק חדש?
                </h3>
                <p className="text-gray-600">
                  ניתן לפתוח חשבון באופן מקוון דרך האתר או בכל סניף של הבנק. יש להביא תעודת זהות וחשבון בנק.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-bank-primary mb-2">
                  כיצד לבצע העברה בנקאית?
                </h3>
                <p className="text-gray-600">
                  ניתן לבצע העברות דרך האפליקציה, האתר או בכל סניף. ההעברות בין חשבונות באותו בנק הן מיידיות.
                </p>
              </div>
              <div className="pb-4">
                <h3 className="font-semibold text-bank-primary mb-2">
                  מה שעות פעילות הסניפים?
                </h3>
                <p className="text-gray-600">
                  רוב הסניפים פעילים בימי א׳-ה׳ בין השעות 8:30-15:30. סניפים מסוימים פעילים גם בימי שישי.
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link href="/faq">
                <Button variant="outline" className="border-bank-primary text-bank-primary hover:bg-bank-primary hover:text-white">
                  צפה בכל השאלות הנפוצות
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Link href="/login">
            <Button variant="ghost" className="text-bank-secondary hover:underline">
              חזרה לדף כניסה
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}