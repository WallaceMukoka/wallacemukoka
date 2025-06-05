"use client";
import "./globals.css";
import { AuthProvider } from "../components/admin/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) { 

  const pathname = usePathname();
  return (
    <html lang="en">
      <body 
        className="antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
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
