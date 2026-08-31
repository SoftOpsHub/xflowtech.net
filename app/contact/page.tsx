import type { Metadata } from 'next';
import { OfficeList } from '@/src/components/sections/OfficeList';
import { PAGES } from '@/src/lib/content/metadata';

export const metadata: Metadata = {
  title: PAGES['/contact'].title,
  description: PAGES['/contact'].description,
};

export default function ContactPage() {
  return <OfficeList />;
}
