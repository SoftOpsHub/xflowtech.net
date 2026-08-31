import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Mukta, Roboto_Slab } from 'next/font/google';
import { cn } from '@/src/lib/utils';
import { SiteHeader } from '@/src/components/layout/SiteHeader';
import { SiteFooter } from '@/src/components/layout/SiteFooter';
import { PAGES } from '@/src/lib/content/metadata';
import './globals.css';

// Self-hosted at build time by next/font — no runtime request to Google.
const mukta = Mukta({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://xflowtech.net'),
  title: {
    default: PAGES['/'].title,
    template: '%s',
  },
  description: PAGES['/'].description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(mukta.variable, robotoSlab.variable, 'font-sans')}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="focus:bg-background focus:text-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
