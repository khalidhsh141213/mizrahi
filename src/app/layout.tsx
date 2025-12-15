import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mizrahi Tefahot Bank",
  description: "Mizrahi-Tefahot is the third largest bank in Israel...",
  keywords: ["Bank", "Israel", "Mortgage"],
  authors: [{ name: "Mizrahi-Tefahot" }],
  icons: {
    icon: "https://www.mizrahi-tefahot.co.il/Images/favicon.ico",
  },
  openGraph: {
    title: "Mizrahi Tefahot Bank",
    description: "Mizrahi-Tefahot is the third largest bank in Israel...",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he-IL" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Font Awesome CDN for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuGWV8D/b40UfgCwpcShx+z/FfI4I4V3gY/4s6QoP9lW+w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />

        {/* Global Loader */}
        <div
          id="loader"
          className="loader fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50 hidden"
          role="alert"
          aria-live="assertive"
          suppressHydrationWarning
        >
          <div className="inner text-center">
            <div className="spinner">
              <img
                src="https://www.mizrahi-tefahot.co.il/images/spinner.svg"
                alt="טוען..."
                className="animate-spin h-12 w-12 mx-auto"
              />
            </div>
            <p id="loaderTextDefault" className="mt-4 text-lg text-bank-primary">כמה שניות וממשיכים</p>
            <p className="extraText text-gray-700"></p>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            window.showGlobalLoader = function() {
              document.getElementById('loader').style.display = 'flex';
            };
            window.hideGlobalLoader = function() {
              document.getElementById('loader').style.display = 'none';
            };
            window.onload = function() {
              window.hideGlobalLoader();
            };
          `
        }} />
      </body>
    </html>
  );
}
