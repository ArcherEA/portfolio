
import type { Metadata } from 'next';
import './globals.css';

import { Roboto_Condensed, Orbitron, Bangers } from "next/font/google";
import {  PERSONAL_INFO } from '@/lib/personal_data';

const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});

const orbitron = Orbitron({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});



export const metadata: Metadata = {
  title: 'Yukuan Hao | Full Stack Developer & Creative Technologist',
  description: 'Portfolio of ' + PERSONAL_INFO.name + ', a Full Stack Developer specializing in React, Next.js, and modern web technologies. Explore my projects, skills, and creative works.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Portfolio', PERSONAL_INFO.name, 'Web Development', 'Creative Technologist', 'Frontend', 'Backend'],
  authors: [{ name: PERSONAL_INFO.name }],
  creator: PERSONAL_INFO.name,
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: PERSONAL_INFO.name + ' | Full Stack Developer',
    description: 'Portfolio of ' + PERSONAL_INFO.name + ', a Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    url: 'https://portfolio-web-gamma.vercel.app', // Assuming this or generic URL, can be updated later if known
    siteName: PERSONAL_INFO.name + ' Portfolio',
    images: [
      {
        url: '/logo.svg',
        width: 800,
        height: 800,
        alt: PERSONAL_INFO.name + ' Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PERSONAL_INFO.name + ' | Full Stack Developer',
    description: 'Portfolio of ' + PERSONAL_INFO.name + ', a Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    images: ['/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.variable} ${orbitron.variable} ${bangers.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
