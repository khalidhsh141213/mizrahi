export default function VideoSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="container mx-auto px-4">
            <div className="mizRteditor text-center mb-8">
              <hr className="my-8 border-t-2 border-bank-primary w-24 mx-auto" />
              <h2 className="text-3xl font-bold text-bank-primary">תגידו לבנק שלכם אין אותי</h2>
            </div>
            <div className="embed-responsive embed-responsive-16by9 max-w-4xl mx-auto bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/thgwdUdXXq0"
                title="בני אדם לפני הכל - בנק מזרחי טפחות"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-96 md:h-[32rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}