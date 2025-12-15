import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8">
              <div className="md:w-1/2 flex justify-center">
                <img 
                  alt="Bankers Pic" 
                  className="max-w-full h-auto rounded-lg shadow-md" 
                  src="https://www.mizrahi-tefahot.co.il/media/rpoj4fai/bankers_pic.png"
                />
              </div>
              <div className="md:w-1/2 text-center md:text-right p-4">
                <div className="mizRteditor space-y-4">
                  <h2 className="text-3xl font-bold text-bank-primary">בני אדם לפני הכול</h2>
                  <p className="text-lg text-gray-700">נבחרת הבנקאים שלנו כאן כדי להעניק לך שירות מקצועי ואישי</p>
                  <p>&nbsp;</p>
                  <p>
                    <Link 
                      href="/online-banking/communication-channels/#nav-contact-list-2" 
                      title="איך ליצור קשר עם בנקאי?" 
                      className="btn bg-bank-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-bank-primary transition-colors duration-200 inline-block"
                    >
                      אנחנו כאן בשבילך
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}