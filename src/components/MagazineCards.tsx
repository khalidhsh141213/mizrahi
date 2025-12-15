'use client'

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface MagazineCard {
  id: number
  title: string
  description: string
  image: string
  link: string
}

const magazineCards: MagazineCard[] = [
  {
    id: 1,
    title: 'גם משכנתא וגם חשבון עו"ש',
    description: 'השילוב של משכנתא בטפחות וניהול חשבון בנק במזרחי-טפחות נותן לכם שפע של הטבות ותנאים מועדפים',
    image: 'https://picsum.photos/309/309?random=7',
    link: '/open-a-bank-account/account-mortgage-advantage/'
  },
  {
    id: 2,
    title: 'לא על הריבית לבדה',
    description: 'האם להורדת ריבית יש השלכות חיוביות בלבד?',
    image: 'https://picsum.photos/309/309?random=8',
    link: '/brokerage/investment-magazine/interest-reduction/'
  },
  {
    id: 3,
    title: 'חשבון במזרחי-טפחות',
    description: 'מצטרפים לבנק מזרחי-טפחות ונהנים משתי הטבות הצטרפות לבחירה וגם מבנקאי אישי בוואטסאפ',
    image: 'https://picsum.photos/309/309?random=9',
    link: '/open-a-bank-account/'
  }
]

export default function MagazineCards() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="magazinCards bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {magazineCards.map((card) => (
                <Card key={card.id} className="group flex flex-col h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      src={card.image}
                    />
                  </div>
                  <CardContent className="magazinCard flex flex-col p-4 bg-white flex-grow">
                    <div className="text flex-grow mb-4">
                      <h3 className="title text-xl font-bold text-bank-primary mb-2">{card.title}</h3>
                      <p className="text-gray-700 text-sm">{card.description}</p>
                    </div>
                    <Link 
                      href={card.link}
                      className="more self-start text-bank-secondary font-bold hover:underline"
                    >
                      ספרו לי עוד
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}