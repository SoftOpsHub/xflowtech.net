import { SITE } from '@/src/lib/content/site';
import { Container } from './Container';

export function SiteFooter() {
  return (
    <footer className="border-border border-t bg-black py-8 text-white/80">
      <Container>
        <p className="text-center text-sm">{SITE.footerText}</p>
      </Container>
    </footer>
  );
}
