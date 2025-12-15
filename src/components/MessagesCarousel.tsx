'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Pause } from 'lucide-react'

interface Message {
  id: number
  text: string
  link: string
  target?: string
}

const messages: Message[] = [
  {
    id: 1,
    text: 'מידע כספי לרבעון השלישי 2025',
    link: '/about-mizrahi-tefahot-he/investor-relations/financial-reports/financial-reports-3rdquarter-2025/'
  },
  {
    id: 2,
    text: 'הסדר פשרה העברת מט"ח בחלופת OUR מונגש',
    link: 'https://www.mizrahi-tefahot.co.il/media/0noneljw/הסדר-פשרה-העברת-מטח-בחלופת-our-מונגש.pdf',
    target: '_blank'
  },
  {
    id: 3,
    text: 'עדכון מדיניות הפרטיות של מזרחי-טפחות',
    link: '/about-mizrahi-tefahot-he/privacy-policy-update/',
    target: '_blank'
  },
  {
    id: 4,
    text: 'הודעה על אישור הסדר פשרה - ת"צ 56373-06-21',
    link: '/business-account/הודעה-על-אישור-הסדר-פשרה-תצ-56373-06-21/'
  },
  {
    id: 5,
    text: 'הסכם פשרה - עמלה רבעונית לעסקים גדולים',
    link: '/business-account/agreement-tidan/'
  },
  {
    id: 6,
    text: 'הסדר פשרה בייצוגית פדיון ני"ע',
    link: 'https://www.mizrahi-tefahot.co.il/media/prnlxpa1/הסדר-פשרה-סופי-plus-פסק-דין-פדיון-ניע-סייברלוגיק-מונגש.pdf',
    target: '_blank'
  },
  {
    id: 7,
    text: 'הודעה על הסכם פשרה ופסק דין בגין עמלת חליפין מונגש',
    link: 'https://www.mizrahi-tefahot.co.il/media/ikmpkimq/הודעה-על-הסכם-פשרה-ופסק-דין-בגין-עמלת-חליפין-מונגש.pdf',
    target: '_blank'
  },
  {
    id: 8,
    text: 'אישור פשרה בתביעות ייצוגיות',
    link: 'https://www.mizrahi-tefahot.co.il/media/gsmlhn4w/הודעה-על-הסכם-פשרה-דמרי.pdf',
    target: '_blank'
  }
]

export default function MessagesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(7) // Start with the last item
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToMessage = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="messages py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div id="messagesCarousel" className="relative bg-white shadow-lg rounded-lg p-6 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-bank-primary mb-6">עוד במזרחי-טפחות</h2>
              
              <Button
                onClick={togglePlayPause}
                className="carousel-control-button absolute top-6 left-6 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
                aria-label={isPlaying ? 'עצור' : 'נגן'}
                title={isPlaying ? 'עצור' : 'נגן'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </Button>

              <ol className="carousel-indicators flex justify-center space-x-2 mt-4 mb-6">
                {messages.map((message, index) => (
                  <li key={message.id}>
                    <button
                      type="button"
                      onClick={() => goToMessage(index)}
                      className={`w-2 h-2 rounded-full bg-bank-primary transition-all duration-300 ${
                        index === currentIndex ? 'bg-bank-secondary w-4' : 'opacity-50'
                      }`}
                      aria-label={`Go to message ${index + 1}`}
                    >
                      <span className="sr-only"></span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="carousel-inner relative overflow-hidden h-20 flex items-center justify-center" tabIndex={0} role="tablist">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`carousel-item absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
                      index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    role="tabpanel"
                  >
                    <div className="carousel-caption text-bank-text text-lg">
                      <p>
                        <a 
                          href={message.link}
                          target={message.target || '_self'}
                          rel={message.target === '_blank' ? 'noopener noreferrer' : undefined}
                          className="hover:text-bank-secondary transition-colors duration-200"
                        >
                          {message.text}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}