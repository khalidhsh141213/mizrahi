'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chat Widget */}
      <div id="cpDesktop" className={`fixed bottom-0 right-0 bg-white shadow-2xl rounded-tl-lg transform transition-transform duration-300 z-50 w-80 max-w-full lg:w-96 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="wrapper flex flex-col h-full">
          <div className="top bg-bank-primary text-white p-4 rounded-tl-lg relative">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              title="סגור חלון בנקאי"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
            <h5 className="title text-lg font-bold">דרכים ליצירת קשר</h5>
            <figure className="mt-2">
              <img 
                id="imgChatDesktop"
                alt="" 
                className="w-full h-24 object-cover rounded-md" 
                src="https://www.mizrahi-tefahot.co.il/media/gzqdtcec/בנקאי-מארח.jpg"
              />
            </figure>
          </div>
          
          <div className="inner flex-grow overflow-y-auto p-4">
            <div className="flex justify-around mb-4 border-b border-gray-200">
              <Button
                variant="ghost"
                className="py-2 px-3 text-bank-primary font-semibold border-b-2 border-bank-secondary"
                aria-selected="true"
                role="tab"
                title="פנו אלינו בצ'אט"
              >
                צ'אט
              </Button>
            </div>
            
            <div className="tab-content" id="cp-tabsContent">
              <div className="tab-pane fade block show active" role="tabpanel" aria-labelledby="cp-chat-tab">
                <div className="bg-gray-100 p-4 rounded-md h-48 flex items-center justify-center text-gray-500">
                  <p>רכיב צ'אט יופיע כאן</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`mini fixed bottom-4 right-4 bg-bank-secondary text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 hover:bg-bank-primary transition-colors duration-200 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-expanded={isOpen}
        aria-label="דרכים ליצירת קשר"
      >
        <figure className="w-8 h-8 rounded-full overflow-hidden">
          <img 
            alt="" 
            className="w-full h-full object-cover" 
            src="https://www.mizrahi-tefahot.co.il/media/gzqdtcec/בנקאי-מארח.jpg"
          />
        </figure>
        <span className="font-bold text-sm">דרכים ליצירת קשר</span>
      </Button>
    </>
  )
}