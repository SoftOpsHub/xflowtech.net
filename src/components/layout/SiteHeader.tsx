'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { assetSrc } from '@/src/lib/assets';
import { SITE } from '@/src/lib/content/site';
import { useUIStore } from '@/src/store/ui-store';
import { Container } from './Container';

export function SiteHeader() {
  const open = useUIStore((s) => s.mobileNavOpen);
  const setOpen = useUIStore((s) => s.setMobileNavOpen);

  return (
    <header className="bg-brand-header sticky top-0 z-50 border-b border-white/10 text-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetSrc(SITE.logo)}
            alt={SITE.logoAlt}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>

        <nav aria-label="Primary" className="flex items-center">
          <ul className="hidden items-center gap-8 md:flex">
            {SITE.navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </Container>

      <div
        id="mobile-nav"
        className={cn('border-t border-white/10 md:hidden', open ? 'block' : 'hidden')}
      >
        <Container>
          <ul className="flex flex-col py-2">
            {SITE.navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-sm font-medium text-white/90 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}
