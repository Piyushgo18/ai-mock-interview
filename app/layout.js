import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI MockPrep",
  description: "Practice with our AI-powered mock interview platform. Get personalized feedback, improve your skills, and land your dream job with confidence.",
  icons: {
    icon: [
      {
        url: '/brain-icon.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/brain-icon.svg',
    apple: '/brain-icon.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <Toaster/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
