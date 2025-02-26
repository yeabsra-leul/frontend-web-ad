import './globals.css';
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NotificationProvider } from '@/components/ui/NotificationContext';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" >
      <body className="static h-full bg-gray-50">
        <SessionProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme='light'>
              <main className="text-foreground bg-background">
                <NotificationProvider>
                    {children}
                  </NotificationProvider>
              </main>
              <Analytics />
              <SpeedInsights />
            </NextThemesProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>

  )
}
