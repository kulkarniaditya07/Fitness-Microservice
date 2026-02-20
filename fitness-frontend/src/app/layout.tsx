import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitTrack Pro',
  description: 'Interactive fitness management dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="fitness-dark">
      <body>{children}</body>
    </html>
  );
}
