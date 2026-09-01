import { Container } from '@/src/components/layout/Container';

const FACTS = [
  'One of the earliest providers of SDN, NFV, and OpenStack development services, with roots in academic networking research.',
  'Engineering across SDN controllers, Open vSwitch porting, network overlays (VxLAN, NVGRE, STT, GTP), NIC porting, virtualization, OpenFlow, DPDK, and SR-IOV.',
  'Benchmarking and profiling services, plus custom TCAM-optimization and data-visualization software.',
  'OpenStack development, training, and certification — including an educational OpenStack cloud built at the National University of Sciences and Technology.',
  'NFV R&D across virtualized network functions, NFV-infrastructure automation, VNF management, and orchestration, with multiple completed proof-of-concept projects.',
];

export function AboutSection() {
  return (
    <section id="about-intro" className="py-14 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
          <p className="text-muted-foreground mt-4 text-base">
            xFlow builds solutions and provides research services in NFV, SDN, IoT, and fast
            data communication.
          </p>
          <ul className="mt-6 space-y-3">
            {FACTS.map((fact) => (
              <li key={fact.slice(0, 24)} className="text-muted-foreground flex gap-3 text-base">
                <span aria-hidden className="bg-brand-accent mt-2 size-1.5 shrink-0 rounded-full" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
