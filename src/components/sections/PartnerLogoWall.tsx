import { PARTNERS } from '@/src/lib/content/partners';
import { LogoWall } from './LogoWall';

export function PartnerLogoWall() {
  return <LogoWall id="partners" title="Partners" items={PARTNERS} columns={5} />;
}
