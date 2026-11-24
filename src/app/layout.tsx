import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "AHMED SAAED — React Native Developer & Full-Stack Engineer",
  description:
    'Engineering ideas into experiences. I build digital products that move ideas forward — React Native Developer, Full-Stack Engineer, and Problem Solver.',
};

export const viewport: Viewport = {
  themeColor: '#08090B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Inter:wght@300..600&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-obsidian font-sans text-warmWhite antialiased selection:bg-gold/30 selection:text-warmWhite">
        {children}
      </body>
    </html>
  );
}
