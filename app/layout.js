"use client";
import "./globals.css";
import { AuthProvider } from "../components/admin/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) { 

  const pathname = usePathname();
  return (
    <html lang="en">
      <body 
        className="antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "z38k322qo4");
            `,
          }}
        />
        <AuthProvider>
          {pathname.startsWith('/admin') ? null : <Navbar />}
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
