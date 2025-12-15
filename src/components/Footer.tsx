'use client'

import Link from 'next/link'

const footerLinks = {
  mortgages: {
    title: 'משכנתאות',
    links: [
      { href: '/mortgages/takemortgagelib/mortgage-application/', text: 'קבלת הצעה למשכנתא' },
      { href: '/mortgages/calculator/', text: 'מחשבון משכנתא' },
      { href: '/mortgages/mortgagetoollib/mortgage-entitlement/', text: 'זכאות למשכנתא' },
      { href: '/mortgages/takemortgagelib/mortgage-repayments/', text: 'לוחות סילוקין' },
      { href: '/mortgages/magazine/reverse/', text: 'משכנתא פנסיונית (משכנתא הפוכה)' }
    ]
  },
  creditCards: {
    title: 'כרטיסי אשראי',
    links: [
      { href: '/credit-cards/', text: 'הזמנת כרטיס אשראי' },
      { href: '/faq/code-recovery/', text: 'שחזור קוד סודי' },
      { href: '/credit-cards/code/', text: 'בחירת קוד סודי' },
      { href: '/hacartis/', text: 'מועדון ההטבות של מזרחי-טפחות' }
    ]
  },
  investments: {
    title: 'השקעות',
    links: [
      { href: '/saving-accounts/', text: 'פיקדונות וחסכונות' },
      { href: '/brokerage/financial-consultancy/', text: 'פניה ליועץ השקעות' },
      { href: '/brokerage/pension/', text: 'ייעוץ פנסיוני' },
      { href: 'https://www.etgar.co.il/', text: 'ניהול תיקים באתגר', external: true }
    ]
  },
  loans: {
    title: 'הלוואות',
    links: [
      { href: '/loans/privateloanslib/express-loan/', text: 'הלוואה ברגע' },
      { href: '/loans/privateloanslib/all-purpose-loan/', text: 'הלוואה לכל מטרה' },
      { href: '/loans/privateloanslib/car-loan/', text: 'הלוואה לרכב' },
      { href: '/loans/businessloanslib/joining-loan-businesses/', text: 'הלוואה לעסקים' }
    ]
  },
  aboutBank: {
    title: 'הבנק ופעילותו',
    links: [
      { href: '/about-mizrahi-tefahot-he/corporate-responsibility/', text: 'אחריות תאגידית' },
      { href: '/about-mizrahi-tefahot-he/disclosure-links/', text: 'גילוי נאות' },
      { href: '/branches/', text: 'איתור סניפים' },
      { href: '/contact-us/', text: 'יצירת קשר' },
      { href: '/about-mizrahi-tefahot-he/inactive-accounts/', text: 'איתור חשבונות אבודים' },
      { href: '/info-for-our-customers/bank-fees/', text: 'עמלות - שירות ומסלולים' },
      { href: '/contact-us/public-inquiries/', text: 'נציב תלונות הציבור' },
      { href: '/about-mizrahi-tefahot-he/', text: 'אודות הבנק' }
    ]
  }
}

const bottomLinks = [
  { href: '/about-mizrahi-tefahot-he/legal-notice-he/', text: 'הבהרה משפטית' },
  { href: '/about-mizrahi-tefahot-he/conditions-privacy-policy/', text: 'מדיניות פרטיות' },
  { href: '/interest-list/', text: 'תעריפון' },
  { href: '/sitemapmizrahi/', text: 'מפת אתר' },
  { href: '/about-mizrahi-tefahot-he/accessibility-mt/', text: 'הצהרת נגישות' },
  { href: '/about-mizrahi-tefahot-he/career/open-jobs/', text: 'דרושים' },
  { href: '/about-mizrahi-tefahot-he/mt-code-of-ethics/', text: 'הקוד האתי' },
  { href: 'https://sc.mizrahi-tefahot.co.il/SCServices/SC/P422a.aspx', text: 'הסרה מקבלת מידע שיווקי', external: true }
]

const socialLinks = [
  { href: 'https://www.facebook.com/bank.mizrahi.tefahot', icon: 'fab fa-facebook-f', label: 'פייסבוק' },
  { href: 'https://www.youtube.com/user/MizrahiTefahot', icon: 'fab fa-youtube', label: 'יוטיוב' },
  { href: '/about-mizrahi-tefahot-he/accessibility-mt/', icon: 'fas fa-wheelchair', label: 'נגישות' },
  { href: 'https://www.linkedin.com/company/mizrahi-tefahot-bank/', icon: 'fab fa-linkedin-in', label: 'לינקדין' },
  { href: 'https://www.instagram.com/Mizrahi.Tefahot', icon: 'fab fa-instagram', label: 'אינסטגרם' }
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-bank-primary text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 text-right" tabIndex={0}>
          {/* Mortgages Column */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              <Link 
                href="/mortgages/" 
                target="_blank" 
                className="hover:text-bank-secondary transition-colors duration-200"
              >
                {footerLinks.mortgages.title}
              </Link>
            </h3>
            <ul className="space-y-1">
              {footerLinks.mortgages.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-bank-secondary transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Credit Cards Column */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              <Link 
                href="/credit-cards/" 
                className="hover:text-bank-secondary transition-colors duration-200"
              >
                {footerLinks.creditCards.title}
              </Link>
            </h3>
            <ul className="space-y-1">
              {footerLinks.creditCards.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-bank-secondary transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investments Column */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              <Link 
                href="/brokerage/" 
                className="hover:text-bank-secondary transition-colors duration-200"
              >
                {footerLinks.investments.title}
              </Link>
            </h3>
            <ul className="space-y-1">
              {footerLinks.investments.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-bank-secondary transition-colors duration-200"
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Loans Column */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              <Link 
                href="/loans/" 
                className="hover:text-bank-secondary transition-colors duration-200"
              >
                {footerLinks.loans.title}
              </Link>
            </h3>
            <ul className="space-y-1">
              {footerLinks.loans.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-bank-secondary transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Bank Column */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              <Link 
                href="/about-mizrahi-tefahot-he/" 
                className="hover:text-bank-secondary transition-colors duration-200"
              >
                {footerLinks.aboutBank.title}
              </Link>
            </h3>
            <ul className="space-y-1">
              {footerLinks.aboutBank.links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-bank-secondary transition-colors duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty column for spacing on xl screens */}
          <div className="hidden xl:block"></div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-4 border-t border-gray-700 text-center text-sm space-y-2">
          <p>
            {bottomLinks.map((link, index) => (
              <span key={index}>
                <Link 
                  href={link.href} 
                  className="hover:text-bank-secondary transition-colors duration-200"
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.text}
                </Link>
                {index < bottomLinks.length - 1 && ' | '}
              </span>
            ))}
            <br />
            זכויות יוצרים 2025-2000 © בנק מזרחי-טפחות בע"מ. כל הזכויות שמורות.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mt-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                title={social.label}
                className="text-white hover:text-bank-secondary transition-colors duration-200"
              >
                <i className={`${social.icon} text-2xl`}></i>
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}