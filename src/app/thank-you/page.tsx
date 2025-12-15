import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-bank-primary/90 to-black/80 backdrop-blur-[4px]"></div>

            <div className="relative w-full max-w-md text-center animate-in fade-in zoom-in duration-700">
                <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden p-8">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-75"></div>
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center relative z-10">
                                <CheckCircle className="h-12 w-12 text-green-500" />
                            </div>
                        </div>
                    </div>

                    <CardTitle className="text-3xl font-bold text-gray-900 mb-4">תודה רבה!</CardTitle>
                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                        פרטיך התקבלו ושומרו בהצלחה במערכת.
                        <br />
                        נציג שלנו יצור איתך קשר בהקדם להמשך התהליך.
                    </p>

                    <div className="space-y-4">
                        <Link href="/">
                            <Button className="w-full h-12 text-lg bg-bank-primary hover:bg-bank-primary/90 text-white rounded-xl shadow-lg shadow-bank-primary/20">
                                חזרה לדף הבית
                                <ArrowRight className="mr-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </Card>

                <div className="mt-8">
                    <img
                        src="https://www.mizrahi-tefahot.co.il/media/vlwlbdf2/logo.svg"
                        alt="מזרחי טפחות"
                        className="h-8 w-auto mx-auto brightness-0 invert opacity-70"
                    />
                </div>
            </div>
        </div>
    )
}
