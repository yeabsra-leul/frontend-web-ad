import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NotificationProvider from '@mitech/shared-components/lib/notification-context-provider';
import Navbar from '@mitech/shared-components/ui/navbars/navbar-2';
import Sidebar from '@mitech/shared-components/ui/sidebars/sidebar-2';

export const metadata = {
  title: 'Welcome to Mitech Marketing',
  description:
    'Mitech Marketing is a digital marketing agency that specializes in SEO, PPC, and social media marketing.',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme='light'>
              <NotificationProvider>
                <div className="flex">
                  <aside className="w-1/5 bg-[#ff7f00] text-white p-4">
                    <Sidebar />
                  </aside>
                  <main className="w-full">
                    <div className="container mx-auto px-4 mb-8">
                      <Navbar />
                      {children}
                    </div>
                  </main>
                </div>
                <Analytics />
                <SpeedInsights />{/* Vercel Speed Insights */}
              </NotificationProvider>
            </NextThemesProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
