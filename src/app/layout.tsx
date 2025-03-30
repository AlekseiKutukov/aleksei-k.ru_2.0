import type { Metadata } from 'next';
import Header from '@/components/markupPage/Header/Header';
import Menu from '@/components/markupPage/Menu/Menu';
import Footer from '@/components/markupPage/Footer/Footer';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <Menu />
        <div className="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
