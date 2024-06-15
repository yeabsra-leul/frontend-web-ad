import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from '@mitech/shared-components/ui/navbar';
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from '@/packages/shared-components/ui/light_sidebar';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const metadata = {
  title: 'Welcome to Mitech Recruitment',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" >
      <body className="static h-full bg-gray-50">
        <SessionProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme='light'>
              <main className="text-foreground bg-background">
                <Sidebar>
                  <Navbar />
                  {children}
                </Sidebar>
                <Analytics />
                <SpeedInsights />{/* Vercel Speed Insights */}
              </main>
            </NextThemesProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}