import type { ServiceContent } from './types';

// Body content for each product's own page, mirrored from the live site
// (xflowresearch.com). Keyed by `Product.slug`. Shares the block model with services.

export const PRODUCT_CONTENT: Record<string, ServiceContent> = {
  'traffic-classification-shaping': {
    blocks: [
      { type: 'para', runs: [{ b: 'xFlow' }, ' develops scalable ', { b: 'network traffic classification and shaping solutions' }, ' for enterprise and telecom customers. Our solutions are designed to handle ', { b: 'high-throughput traffic up to 400 Gbps' }, ', providing reliable performance under demanding network conditions.'] },
      { type: 'para', runs: ['We leverage ', { b: 'DPDK (Data Plane Development Kit)' }, ' and ', { b: 'SmartNICs' }, ' to deliver ', { b: 'efficient, low-latency packet processing' }, '. The solutions support:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          [{ b: 'Traffic classification, correlation, and prioritization' }],
          [{ b: 'Traffic shaping, queuing, and regulation' }, ' according to predefined rules'],
          [{ b: 'Segregation, filtration, and metadata extraction' }, ' based on protocols, applications, or users'],
        ],
      },
      { type: 'para', runs: ['The system also provides ', { b: 'comprehensive analytics' }, ' to improve network visibility and management, including:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Traffic volume and classification'],
          ['Congestion analysis'],
          ['Protocol utilization and application performance'],
          ['User behavior monitoring'],
          ['Compliance and security reporting'],
        ],
      },
      { type: 'para', runs: ['These capabilities ensure that network operations are ', { b: 'efficient, secure, and well-optimized' }, ', supporting both ', { b: 'enterprise networks' }, ' and ', { b: 'telco-grade infrastructures' }, '. The solution is designed for ', { b: 'scalable deployment' }, ' across multiple servers and network segments, enabling real-time monitoring, control, and optimization.'] },
    ],
  },
  'data-analytics': {
    blocks: [
      { type: 'para', runs: [{ b: 'xFlow' }, ' develops data analytics solutions for enterprise and telecom environments. These solutions leverage deep packet inspection (DPI), metadata extraction, and APIs to provide detailed visibility and insights into network traffic.'] },
      { type: 'para', runs: ['Using DPDK and SmartNICs, the solution can handle high-throughput traffic up to 400 Gbps, delivering low-latency, high-performance analytics. Key capabilities include:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Traffic analysis and metadata extraction for detailed network visibility'],
          ['Integration with APIs for real-time monitoring and automation'],
          ['High-performance database support for storing and querying large volumes of network data'],
          ['High availability and scalability to ensure continuous operation and support for growing network environments'],
        ],
      },
      { type: 'para', runs: ['This solution enables organizations to monitor, analyze, and optimize network operations, providing actionable insights for performance management, security, compliance, and operational efficiency. It is designed for scalable deployment in both enterprise and telco-grade infrastructures.'] },
    ],
  },
};
