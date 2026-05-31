import './globals.css';

import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'SummonSkill',
  description:
    'SummonSkill is a shared workspace for challenges, mentor notes, and focused progress.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-screen font-body antialiased">
        {children}
      </body>
    </html>
  );
}
