import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import '../components/styles/buttons.css';
import '../components/styles/inputs.css';
import '../components/styles/footer.css';
import '../components/styles/header.css';
import '../components/styles/hero.css';
import '../components/styles/topics.css';
import '../components/styles/newsletter.css';
import '../components/styles/blog.css';
import '../components/styles/most-viewed.css';
import '../components/styles/blog-content-wrapper.css';
import '../components/styles/post-detail.css';
import '../components/styles/new-post-modal.css';
import Header from '@/components/Header';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'lite-tech | Tech Blog',
  description: 'Your source for tech news and insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceGrotesk.className}`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}