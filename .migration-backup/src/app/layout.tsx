/* (server layout) – src/app/layout.tsx – (server component) */
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = { title: "Volleynati 2025", description: "Volleynati is a 100% volunteer community initiative focused on bringing people together through the power of volleyball and creating lasting connections." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
