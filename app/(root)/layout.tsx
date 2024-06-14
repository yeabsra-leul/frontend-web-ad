import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from '@mitech/shared-components/ui/navbar';
import { NextUIProvider } from '@nextui-org/react';

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
            <main className="text-foreground bg-background">
              <Navbar />
              {children}
              <Analytics />
              <SpeedInsights />{/* Vercel Speed Insights */}
            </main>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}