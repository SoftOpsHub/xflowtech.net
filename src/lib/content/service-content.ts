import type { ServiceContent } from './types';

// Body content for each service that has its own local page, mirrored from the
// live site's service pages (xflowresearch.com). Keyed by `Service.slug`;
// services without an entry fall back to rendering just their `blurb`.
export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'automation': {
    blocks: [
      { type: 'para', runs: ['Deployment automation is a significant aspect of our services, and it can save time, reduce errors, and increase the reliability of the solution. Similarly, automated testing reduces the amount of manual intervention required, and it ensures that the tests are run in a consistent and repeatable manner.'] },
      { type: 'para', runs: ['We provide our automation services to data centers to perform their day to day operations. This includes:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Day 0 operations: bringing up network devices into a functional state with minimal to no-touch. At the end of Day 0, customers have a fresh machine installed and handed over'],
          ['Day 1 operations: configuring the components in the data center to meet business needs and requirements. configuration of VLANs, routing protocols, security protocols, ACLs etc.'],
          ['Day 2 operations: the data center gets turned over to production'],
          ['Day 2+1 operations: includes upgrading the NFs to new software, patching for bugs and scaling up or scaling down NFs based on SLAs (Service Level Agreements)'],
        ],
      },
      { type: 'para', runs: ['We also provide end-to-end zero-touch provisioning (ZTP) deployment solutions for cloud infrastructure platforms including OpenStack and OpenShift. Our goal is to simplify and streamline the deployment process, reducing the time and effort required to set up the cloud, while ensuring consistency and reliability across multiple deployments. It covers all of the aspects including network automation, setting up basic underlying networking, provisioning and managing the nodes, setting up RAID configurations, pre-packaged installations and much more.'] },
      { type: 'para', runs: ['We also provide comprehensive test automation services to improve software quality, accelerate release cycles, and reduce the effort involved in repetitive testing activities. Our team develops scalable and maintainable automation frameworks using ', { b: 'Pytest' }, ' for Python-based test automation and ', { b: 'Robot Framework' }, ' for keyword-driven testing. We automate functional, regression, API, integration, and end-to-end test scenarios, enabling consistent, repeatable, and reliable validation throughout the software development lifecycle. Our automation solutions integrate seamlessly with CI/CD pipelines, ensuring faster feedback, increased test coverage, and high-quality software deliveries.'] },
    ],
  },
  'api': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech also offers ', { b: 'API development services using Node.js' }, ', focusing on building lightweight and high-performance backend APIs. Our APIs are designed for internal systems, web applications, and third-party integrations, with an emphasis on clear structure, proper documentation, and scalability.'] },
    ],
  },
  'cloud-and-devops-services': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech has strong expertise in Cloud and DevOps. We can help organizations build software faster and more reliably through modern ', { b: 'Cloud and DevOps practices' }, '. We automate processes, manage cloud platforms, and build efficient pipelines that support continuous delivery and scalability.'] },
      { type: 'para', runs: ['Our key services include:'] },
      { type: 'heading', text: 'CI/CD Pipelines' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Set up and manage continuous integration and delivery using tools like Jenkins, GitLab CI, and GitHub Actions'],
          ['Automate build, test, and deployment processes'],
        ],
      },
      { type: 'heading', text: 'Cloud Platform Support' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Work with major cloud providers: Azure and AWS, and on prem deployments like OpenStack'],
          ['Handle cloud setup, migration, scaling, and cost optimization'],
        ],
      },
      { type: 'heading', text: 'Infrastructure as Code (IaC)' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Automate infrastructure with tools like Terraform, Ansible, and CloudFormation'],
          ['Maintain version-controlled and consistent environments'],
        ],
      },
      { type: 'heading', text: 'Containerization & Orchestration' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Use Docker for packaging applications'],
          ['Deploy and manage containers with Kubernetes and OpenShift'],
        ],
      },
      { type: 'heading', text: 'Monitoring & Alerts' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Implement tools like Prometheus, Grafana, and the ELK Stack'],
          ['Set up alerts and dashboards to track system health and performance'],
        ],
      },
      { type: 'heading', text: 'DevOps Best Practices' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Improve collaboration between development and operations teams'],
          ['Apply automation, security, and version control across workflows'],
        ],
      },
    ],
  },
  'gis': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech is conducting GIS research across a range of spatial data domains to support advanced analysis and visualization. Our ongoing work includes:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          [{ b: 'Elevation Mapping' }, ' for terrain and geographic analysis'],
          [{ b: 'Rainfall Data Analysis' }, ' for weather and environmental insights'],
          [{ b: 'Soil Mapping' }, ' to support land and infrastructure assessment'],
          [{ b: 'Temperature Data Visualization' }, ' for climate and regional analysis'],
          [{ b: 'Population Density Mapping' }, ' for demographic and planning insights'],
          [{ b: 'Land Cover Analysis' }, ' to understand land usage patterns'],
          [{ b: 'Flight Flow Mapping' }, ' for visualizing air traffic movement and regional connectivity'],
        ],
      },
      { type: 'para', runs: ['These research efforts help build a strong foundation for integrating geographic, environmental, and infrastructure data into telecom and other data-driven applications.'] },
    ],
  },
  'monitoring-solutions': {
    blocks: [
      { type: 'para', runs: ['At xFlow Tech, we design and implement monitoring solutions tailored to your infrastructure: whether it’s network, hardware, or applications.'] },
      { type: 'para', runs: ['Our services are focused on the tools including:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Prometheus for time-series metrics'],
          ['Grafana for visual dashboards'],
          ['ELK for log analysis'],
          ['Zabbix for overall system monitoring.'],
        ],
      },
      { type: 'para', runs: ['Our team ensures that alerts are properly set up and routed to the right channels, such as email, Slack, or other systems, so issues are caught and addressed quickly.'] },
    ],
  },
  'nfv': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech Inc. offers specialized services in Network Function Virtualization (NFV). Our focus in NFV is on Research and development related to NFVI, VNF, and MANO. We provide industry leading technology development that will enable you to quickly demonstrate, develop and market your ideas.'] },
      { type: 'para', runs: ['We also offer our services to extend your existing projects/products in the revolutionary NFV domain. We bring agility to product development lifecycle by developing automation tools to quickly demonstrate and market your products in NFV domain.'] },
      { type: 'para', runs: ['We are actively involved in Research and Development in NFV and have successfully completed PoC projects with industry leaders in NFV.'] },
      { type: 'heading', text: 'vBRAS' },
      { type: 'para', runs: ['Virtual B-RAS is intended to be a product for ISP. It authenticates, authorizes and routes subscriber data traffic. VBRAS also provides policy enforcement features.'] },
      { type: 'heading', text: 'VNF' },
      { type: 'para', runs: ['We provide industry-standard deployment, integration, testing and benchmarking of a wide variety of VNFs.'] },
      { type: 'heading', text: 'NFVI' },
      { type: 'para', runs: ['Our services include designing and development of Compute, Control, Network and Storage blend that can build an efficient scalable NFV solution.'] },
      { type: 'heading', text: 'MANO' },
      { type: 'para', runs: ['xFlow Tech provides state-of-the-art development, integration and testing services in Management and Network Orchestration.'] },
    ],
  },
  'open-source-contributions-and-development': {
    blocks: [
      { type: 'para', runs: ['We are members of the ', { b: 'CAMARA open-source project under the Linux Foundation' }, ' and contribute to its ongoing development and evolution.'] },
      { type: 'heading', text: 'CAMARA DeviceAuthenticity API' },
      { type: 'para', runs: ['xFlow Tech has successfully introduced the ', { b: 'Device Authenticity API' }, ' within the CAMARA project. We serve as the', { b: ' owner of this API repository' }, ' and actively contribute to its maintenance and future enhancements.'] },
      { type: 'para', runs: ['As part of this role, xFlow Tech:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Coordinates technical discussions and meetings related to this sandboxed API'],
          ['Ensures alignment across proposals from participating organizations'],
          ['Works closely with stakeholders to maintain consistency with CAMARA standards'],
        ],
      },
      { type: 'para', runs: ['Initial interested parties for the DeviceAuthenticity API include ', { b: 'MTN Chenosis' }, ' and the ', { b: 'GSMA Device Check service' }, '.'] },
      { type: 'heading', text: 'CAMARA API Dashboard' },
      { type: 'para', runs: ['We have developed a ', { b: 'CAMARA API Dashboard' }, ', a web-based management and monitoring interface for testing ', { b: '5G Network APIs' }, ' that follow the CAMARA standard.'] },
      { type: 'para', runs: ['The dashboard is built using ', { b: 'Next.js and TypeScript' }, ' and provides a unified platform for interacting with APIs such as:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Quality on Demand (QoD)'],
          ['Device Location'],
          ['Traffic Influence'],
        ],
      },
      { type: 'para', runs: ['The current implementation integrates with EUROCOM’s 5G CoreSim (Core Simulation) environment. Support for additional 5G core platforms, including Free5GC, Open5GS, and OpenAirInterface (OAI), is planned for future releases.'] },
      { type: 'heading', text: 'Architecture and Capabilities' },
      { type: 'para', runs: ['The dashboard connects to 5G core environments through the ', { b: 'TF-SDK (Transformation Function) middleware layer' }, ', enabling:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Real-time monitoring'],
          ['Service discovery'],
          ['Interactive visualizations, including location maps and network flow diagrams'],
        ],
      },
      { type: 'heading', text: 'Ongoing Enhancements' },
      { type: 'para', runs: ['We are continuously improving the platform, with current work focused on:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Authentication and access control'],
          ['WebSocket-based real-time updates'],
          ['Additional 5G core adapters'],
          ['Improved API documentation'],
          ['Component guides and deployment instructions'],
        ],
      },
      { type: 'para', runs: [{ b: 'xFlow Tech' }, ' actively contributes to the ', { b: 'Community SONiC' }, ' project by developing new features, fixing bugs, and improving the performance and stability of existing components. Our work focuses on practical enhancements that align with real operational requirements.'] },
      { type: 'heading', text: 'Contribution Highlights' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Active contributor to Community SONiC across multiple releases'],
          ['Served as reviewers for two features in the 2023-11 feature release'],
          ['One feature from NVIDIA'],
        ],
      },
      { type: 'heading', text: 'Community Contribution Services' },
      { type: 'para', runs: ['In addition to our direct contributions, we support customers who request community contributions on their behalf. We provide services that include:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Feature development aligned with community standards'],
          ['Bug fixes and upstream submissions'],
          ['Code reviews and release alignment'],
          ['Coordination with the SONiC community to ensure smooth acceptance and integration'],
        ],
      },
      { type: 'para', runs: ['This approach helps customers contribute effectively to the SONiC ecosystem while maintaining alignment with upstream development practices.'] },
    ],
  },
  'professional-services': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech offers a range of IT services to meet the unique needs of our clients. Our expertise includes the deployment of IT infrastructure, managed services, on-premises support, monitoring and remote technical assistance. Our primary focus is to provide exceptional service and ensure customer satisfaction.'] },
      { type: 'para', runs: ['Our services include:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Managing projects from start to finish, including planning, execution, and monitoring'],
          ['Developing custom software applications to meet clients’ specific business needs'],
          ['Solution Architecture'],
          ['Technology/Vendor Assessment'],
          ['Designing and setting up IT infrastructure, including network design, server deployment, and storage solutions'],
          ['Protecting clients’ networks and systems from cyber threats, including threat assessments, security audits, and incident response'],
          ['Automation'],
          ['Managed Services'],
          ['Network Planning and Monitoring'],
          ['Remote services'],
        ],
      },
      { type: 'para', runs: ['We serve markets globally.'] },
    ],
  },
  'project-management': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech specializes in providing end-to-end ', { b: 'Project Management Services' }, ' designed to ensure successful delivery, transparency, and alignment with business goals. Our approach is structured, detail-oriented, and flexible to support a wide range of industries and project types.'] },
      { type: 'para', runs: ['Our project management services include:'] },
      { type: 'heading', text: 'Project Initiation & Planning' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Defining scope, objectives, and deliverables'],
          ['Resource planning and stakeholder alignment'],
          ['Budget estimation and timeline development'],
        ],
      },
      { type: 'heading', text: 'Execution & Delivery' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Coordinating tasks and team members'],
          ['Tracking progress and ensuring milestones are met'],
          ['Managing communications and documentation'],
        ],
      },
      { type: 'heading', text: 'Project Control & Monitoring' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Risk management and issue resolution'],
          ['Budget tracking, PO (Purchase Order) management, and quotation handling'],
          ['Quality assurance and scope control'],
        ],
      },
      { type: 'heading', text: 'Project Closure' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Final deliverables review and approval'],
          ['Post-implementation evaluation and reporting'],
          ['Documentation handover and client feedback'],
        ],
      },
      { type: 'heading', text: 'Additional Services Supporting Project Success' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Technology and vendor assessments'],
          ['Solution architecture design'],
          ['Infrastructure design and deployment (as needed for technical projects)'],
          ['Process automation and reporting support'],
          ['Remote and on-site coordination as required'],
        ],
      },
      { type: 'para', runs: ['We serve clients across the globe, bringing structured project management methodologies, experienced teams, and a results-driven mindset to every project we manage.'] },
    ],
  },
  'research-and-standardization': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech is a full-time member of European Telecommunication Standards Institute (ETSI) which sets standards for cutting technologies like NFV, MEC, IoT, Smart Cities, Augmented Reality. Engineers from xFlow Tech work closely with ETSI in different domains like Conformance and Interoperability testing, Development of Simulation and other Educational Tools based on the ETSI specifications, Export Support in Plugtests, and many more.'] },
      { type: 'para', runs: ['Following are the competencies and related work described in terms of our ETSI engagement and participation in Specialist Task Forces (STFs) and Testing Task Forces (TTFs):'] },
      { type: 'para', runs: ['xFlow Tech also participates in different activities conducted by ETSI:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Part of the Plugtests Team in “Expert” capacity for organizing and supporting the ', { b: 'NFV&MEC IOP Plugtests 2021' }, ' event'],
          ['Participated as an NFVI provider in the ETSI ', { b: 'NFV&MEC API Plugtests 2021' }, ' event'],
          ['Participated as a “Technical Expert” in organizing the ', { b: '4th NFV Plugtests' }, ' event'],
          ['Founding member of ', { b: 'OSM community' }],
          ['Contributed to ', { b: '6th OSM Hackfest' }],
          ['Provided expert support in the ', { b: 'OSM-MR13 Hackfest 2022' }, ' by setting up VMs for the participants, wrote a Blog Post, and edited Hackfest videos'],
          ['Presenting our experiences of using different automated testing techniques at the ', { b: '8th User Conference on Advanced Automated Testing (UCAAT)' }],
        ],
      },
    ],
  },
  'software-development': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech provides software development services focused on building reliable, efficient, and maintainable systems. We follow established software development standards and a structured ', { b: 'Software Development Life Cycle (SDLC)' }, ' to ensure quality, consistency, and predictable outcomes. We work closely with our clients to understand their requirements and deliver solutions that meet both technical and business needs.'] },
      { type: 'heading', text: 'Our Services' },
      { type: 'para', runs: [{ b: 'Software Development' }] },
      { type: 'para', runs: ['We design and develop high-performance software using C, C++, Golang, and Python, following industry-accepted coding standards, secure development practices, and structured development workflows.'] },
      { type: 'para', runs: [{ b: 'Customized Software Solutions' }] },
      { type: 'para', runs: ['We build tailored software solutions based on specific business and technical requirements, developed and validated through a defined SDLC process.'] },
      { type: 'para', runs: [{ b: 'API Development' }] },
      { type: 'para', runs: ['We develop secure, well-documented APIs designed for integration, scalability, and long-term maintainability.'] },
      { type: 'para', runs: [{ b: 'Web and App Development' }] },
      { type: 'para', runs: ['We deliver web and application solutions with a focus on usability, performance, and reliability.'] },
      { type: 'heading', text: 'Quality and Engineering Practices' },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Structured SDLC covering requirements, design, implementation, testing, and deployment'],
          ['Unit testing as part of development to ensure correctness and reduce regressions'],
          ['Code reviews and version control to maintain consistency and quality'],
          ['Emphasis on maintainable, well-documented code'],
        ],
      },
    ],
  },
  'sonic': {
    blocks: [
      { type: 'para', runs: ['xFlow Tech Inc. is an active member of Community SONiC and has contributed in many ways to Community SONiC.'] },
      { type: 'para', runs: ['Our team of experts deeply understands SONiC and its capabilities, and we are here to help you get the most out of this cutting-edge technology.'] },
      { type: 'para', runs: ['Why is SONiC essential for data centers?'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['SONiC promotes vendor neutrality and open ecosystems, allowing users to select and customize hardware without lock-in.'],
          ['Its modular architecture and community support drive innovation, scalability, and reduced total cost of ownership.'],
          ['The unified interface simplifies management, while interoperability testing ensures compatibility and future-proofing.'],
          ['SONiC’s open-source nature fosters agility, enabling quick adaptation to industry trends and continuous improvements.'],
        ],
      },
      { type: 'para', runs: ['Our team can help you make your network reliable, secure, robust, and agile through network programmability and automation technologies.'] },
      { type: 'para', runs: ['What do we offer in the realm of SONiC?'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Architecture and Design'],
          ['Support Services'],
          ['Product Enhancements'],
          ['Product Development'],
          ['Deployments'],
          ['Configuration Services'],
          ['Migration Services'],
          ['Test Plans & Testing'],
        ],
      },
      { type: 'para', runs: ['Our contributions to SONiC include the following features:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          ['Switch Port Modes and VLAN CLI Enhancement'],
          ['Multiple Spanning Tree (MST)'],
          ['DHCP DOS Mitigation Support'],
          ['Test Plan HLD for OSPF'],
          ['Test Plan HLD for BFD Echomode'],
          ['Test Plan HLD for BFD with OSPF'],
          ['Switch Port Mode Hybrid'],
          ['MAC based VLAN Assignment'],
        ],
      },
    ],
  },
  'testing-and-validation': {
    blocks: [
      { type: 'para', runs: ['We help you deliver reliable and bug-free software by offering ', { b: 'quality assurance (QA)' }, { b: 'services' }, ' for mobile apps, web apps, and software products. Our testing approach follows global standards and is based on ', { b: 'ISTQB foundational knowledge.' }, ' We cover every phase of the ', { b: 'Software Testing Life Cycle (STLC)' }, ' with a focus on practical, real-world application.'] },
      { type: 'para', runs: ['Our QA services include:'] },
      {
        type: 'list',
        ordered: false,
        items: [
          [{ b: 'Functional Testing:' }, ' Verify that all features work as expected according to requirements'],
          [{ b: 'Integration Testing:' }, ' Ensure different components and systems work well together'],
          [{ b: 'Performance Testing:' }, ' Check how your application performs under load or stress'],
          [{ b: 'Manual Testing:' }, ' In-depth, hands-on testing for user experience'],
          [{ b: 'Automated Testing:' }, ' Automation of repetitive test cases using tools like Selenium & Cypress and frameworks including Pytest & Robot'],
          [{ b: 'Bug Reporting & Validation:' }, ' Clear issue tracking, reporting, and regression testing to confirm fixes'],
        ],
      },
      { type: 'para', runs: ['We work side-by-side with your development team to improve product quality, speed up release cycles, and ensure the software meets the requirements and is bug free.'] },
    ],
  },
  'web-application': {
    blocks: [
      { type: 'para', runs: [{ b: 'xFlow Tech' }, ' provides end-to-end web application development services, covering design, development, deployment, and ongoing support. Our approach focuses on building reliable, scalable, and maintainable web applications that meet functional and performance requirements.'] },
      { type: 'heading', text: 'Our Web Application Services Include' },
      { type: 'para', runs: [{ b: 'Custom Web Application Development' }] },
      { type: 'para', runs: ['Design and development of web applications tailored to specific business and technical needs.'] },
      { type: 'para', runs: [{ b: 'Frontend Development' }] },
      { type: 'para', runs: ['Development of user interfaces with a focus on usability, accessibility, and consistency across devices and browsers.'] },
      { type: 'para', runs: [{ b: 'Backend Development' }] },
      { type: 'para', runs: ['Implementation of secure and scalable backend services, business logic, and data handling.'] },
      { type: 'para', runs: [{ b: 'Responsive UI/UX Design' }] },
      { type: 'para', runs: ['Design of responsive user interfaces that adapt across desktop, tablet, and mobile platforms.'] },
      { type: 'para', runs: [{ b: 'API Development and Integration' }] },
      { type: 'para', runs: ['Development and integration of APIs for internal services and third-party systems.'] },
      { type: 'para', runs: [{ b: 'Database Design and Management' }] },
      { type: 'para', runs: ['Database schema design, optimization, and management to support application reliability and performance.'] },
      { type: 'para', runs: [{ b: 'Web Application Performance Optimization' }] },
      { type: 'para', runs: ['Performance tuning to improve response times, scalability, and resource efficiency.'] },
      { type: 'para', runs: [{ b: 'Deployment and Maintenance Support' }] },
      { type: 'para', runs: ['Support for application deployment, upgrades, monitoring, and ongoing maintenance.'] },
    ],
  },
};
