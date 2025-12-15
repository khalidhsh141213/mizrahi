'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const cities = [
  'כל היישובים', 'אום אל-פחם', 'אופקים', 'אור יהודה', 'אור עקיבא', 'אילת', 'אלעד', 'אפרת',
  'אשדוד', 'אשקלון', 'באקה אל-גרביה', 'באר שבע', 'בית שאן', 'בית שמש', 'בני ברק', 'בת ים',
  'גבעת שמואל', 'גבעתיים', 'דימונה', 'הוד השרון', 'הרצליה', 'זכרון יעקב', 'חדרה', 'חולון',
  'חיפה', 'חריש', 'טבריה', 'טירת כרמל', 'יבנה', 'יהוד-מונוסון', 'יקנעם עילית', 'ירושלים',
  'כפר יאסיף', 'כפר סבא', 'כפר קאסם', 'כרמיאל', 'לוד', 'לוד נמל תעופה', 'מגדל העמק', 'מודיעין עילית',
  'מודיעין-מכבים-ר', 'מעלה אדומים', 'מעלות-תרשיחא', 'נהריה', 'נוף הגליל', 'נס ציונה', 'נשר', 'נתיבות',
  'נתניה', 'סח\'נין', 'עכו', 'עפולה', 'ערד', 'פרדס חנה-כרכור', 'פתח תקווה', 'צפת',
  'קרית אונו', 'קרית אתא', 'קרית ביאליק', 'קרית גת', 'קרית ים', 'קרית מוצקין', 'קרית מלאכי', 'קרית שמונה',
  'קרני שומרון', 'ראש העין', 'ראשון לציון', 'רחובות', 'רמלה', 'רמת גן', 'רמת השרון', 'רעננה',
  'שדרות', 'שלומי', 'שפרעם', 'תל אביב - יפו'
]

const bankingServices = [
  { value: 'kaspon', label: 'כספון' },
  { value: 'kasponmatach', label: 'כספומט"ח' },
  { value: 'emdasrta', label: 'עמדות שירות עצמי' },
  { value: 'eshnav', label: 'הפקדת מזומן בשירות עצמי' },
  { value: 'hafkadatshekim', label: 'הפקדת שיקים בשירות עצמי' },
  { value: 'hanpakatshekim', label: 'שירותי כספרות' },
  { value: 'sugsnif', label: 'ייעוץ משכנתאות' },
  { value: 'yoetzpensioni', label: 'ייעוץ פנסיוני' },
  { value: 'yoetz', label: 'ייעוץ השקעות' },
  { value: 'kasefet', label: 'כספות' }
]

const accessibilityOptions = [
  { value: 'gishan', label: 'גישה נגישה' },
  { value: 'hanian', label: 'חניית נכים' },
  { value: 'shmia', label: 'עזרים לכבדי שמיעה' },
  { value: 'kasponn', label: 'כספון נגיש' },
  { value: 'emdotn', label: 'עמדות נגישות' },
  { value: 'sherutn', label: 'שירותי נכים' },
  { value: 'merhavmugan', label: 'גישה למרחב מוגן' }
]

export default function BranchLocator() {
  const [selectedCity, setSelectedCity] = useState('כל היישובים')
  const [branchNumber, setBranchNumber] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching branches:', {
      city: selectedCity,
      branchNumber,
      services: selectedServices,
      accessibility: selectedAccessibility
    })
    // Implement branch search functionality
  }

  return (
    <section className="py-8 bg-white-two">
      <div className="container mx-auto px-4">
        <section className="branches py-8">
          <div className="intro text-center mb-8">
            <h2 className="text-3xl font-bold text-bank-primary mb-4">איתור סניפים עמוד הבית</h2>
            <div className="mizRteditor max-w-2xl mx-auto text-gray-700">
              <p>
                מנגנון איתור הסניפים יסייע לך בקבלת פרטי הסניף המבוקש כגון, 
                <strong> מידע על שעות פעילות הסניף</strong>, דרכי הגישה לסניף כולל כתובת הסניף, 
                מספרי הטלפון והפקס, השירותים הבנקאיים ואפשרויות הנגישות. <br />
                בכל סניפי הבנק ניתנים שירותי טלר, למעט סניפים 478, 502, 520, 541, 583, 657.
              </p>
            </div>
          </div>

          <Card className="localBranches max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="search" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  איתור סניף
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  מפה
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="mt-4">
                <form onSubmit={handleSearch} className="form space-y-4">
                  <h3 className="text-xl font-bold text-bank-primary mb-4">איתור סניפים</h3>
                  
                  <div className="form-group">
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-secondary">
                        <SelectValue placeholder="בחר יישוב" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Input
                      id="BranchNumber"
                      type="number"
                      min="1"
                      max="999"
                      maxLength={3}
                      value={branchNumber}
                      onChange={(e) => setBranchNumber(e.target.value)}
                      placeholder="מספר סניף"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-secondary text-right"
                    />
                  </div>

                  <div className="form-group">
                    <Select>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-secondary h-32">
                        <SelectValue placeholder="בחר שירותים בנקאיים" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <div className="font-bold text-sm mb-2">כספונים</div>
                          {bankingServices.slice(0, 2).map((service) => (
                            <div key={service.value} className="flex items-center space-x-2 py-1">
                              <input type="checkbox" id={service.value} className="rounded" />
                              <label htmlFor={service.value} className="text-sm">{service.label}</label>
                            </div>
                          ))}
                          <div className="font-bold text-sm mb-2 mt-3">שירות עצמי</div>
                          {bankingServices.slice(2, 5).map((service) => (
                            <div key={service.value} className="flex items-center space-x-2 py-1">
                              <input type="checkbox" id={service.value} className="rounded" />
                              <label htmlFor={service.value} className="text-sm">{service.label}</label>
                            </div>
                          ))}
                          <div className="font-bold text-sm mb-2 mt-3">שירותי כספרות</div>
                          {bankingServices.slice(5, 6).map((service) => (
                            <div key={service.value} className="flex items-center space-x-2 py-1">
                              <input type="checkbox" id={service.value} className="rounded" />
                              <label htmlFor={service.value} className="text-sm">{service.label}</label>
                            </div>
                          ))}
                          <div className="font-bold text-sm mb-2 mt-3">ייעוץ</div>
                          {bankingServices.slice(6, 9).map((service) => (
                            <div key={service.value} className="flex items-center space-x-2 py-1">
                              <input type="checkbox" id={service.value} className="rounded" />
                              <label htmlFor={service.value} className="text-sm">{service.label}</label>
                            </div>
                          ))}
                          <div className="font-bold text-sm mb-2 mt-3">כספות</div>
                          {bankingServices.slice(9).map((service) => (
                            <div key={service.value} className="flex items-center space-x-2 py-1">
                              <input type="checkbox" id={service.value} className="rounded" />
                              <label htmlFor={service.value} className="text-sm">{service.label}</label>
                            </div>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Select>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bank-secondary h-32">
                        <SelectValue placeholder="בחר אפשרויות נגישות" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2 max-h-48 overflow-y-auto">
                          {accessibilityOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2 py-1">
                              <input type="checkbox" id={option.value} className="rounded" />
                              <label htmlFor={option.value} className="text-sm">{option.label}</label>
                            </div>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="text-center mt-6">
                    <Button 
                      type="submit"
                      className="btn bg-bank-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-bank-primary transition-colors duration-200"
                      title="חפש"
                    >
                      חפש
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="map" className="mt-4">
                <div className="mapBlock h-96 bg-gray-200 rounded-md flex items-center justify-center text-gray-600">
                  <p>מפת סניפים תופיע כאן (יש צורך ב-API של מפות)</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </section>
      </div>
    </section>
  )
}