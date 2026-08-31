import type { Metadata } from 'next';
import { AboutSection } from '@/src/components/sections/AboutSection';
import { PAGES } from '@/src/lib/content/metadata';

export const metadata: Metadata = {
  title: PAGES['/about-us'].title,
  description: PAGES['/about-us'].description,
};

export default function AboutUsPage() {
  return <AboutSection />;
}
