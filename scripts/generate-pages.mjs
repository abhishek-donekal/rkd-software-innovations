// Static page generator for rkdsoftwareinnovations.com
// Run: node scripts/generate-pages.mjs  (from repo root)
// Emits: services/<slug>.html, blog/index.html, blog/<slug>.html, sitemap.xml

import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.rkdsoftwareinnovations.com';
const TODAY = '2026-07-28';

const services = [
  {
    slug: 'ai-automation',
    name: 'AI & Smart Automation',
    title: 'AI Automation Services for Business | RKD Software Innovations',
    metaDesc: 'Custom AI assistants, workflow automation, and software integrations. Save hours of manual work with AI automation solutions built for your business.',
    h1: 'AI & Smart Automation Services',
    intro: 'Stop losing hours to repetitive tasks. RKD Software Innovations builds intelligent automation systems — custom AI assistants, automated workflows, and seamless software integrations — that work for your business around the clock.',
    bullets: [
      'Custom AI assistants that handle customer service 24/7 — answering questions, booking appointments, and qualifying leads while you sleep',
      'Workflow automation that eliminates repetitive manual tasks — data entry, report generation, email follow-ups, invoice processing',
      'Software integrations that connect your CRM, email, accounting, and operations tools so everything syncs perfectly',
      'AI-powered document processing — extract data from PDFs, invoices, and forms automatically',
    ],
    benefits: [
      { h: 'Save 10+ hours weekly', p: 'Businesses typically reclaim 10 or more staff-hours per week by automating their most repetitive processes.' },
      { h: '24/7 customer response', p: 'AI assistants respond to customers instantly at any hour — no missed leads, no waiting until Monday.' },
      { h: 'Fewer errors', p: 'Automated data flows eliminate copy-paste mistakes between systems.' },
    ],
    faqs: [
      { q: 'What business tasks can be automated with AI?', a: 'Customer service replies, appointment booking, lead qualification, data entry, invoice processing, report generation, email follow-ups, and syncing data between software tools are the most common candidates.' },
      { q: 'Do I need technical staff to use AI automation?', a: 'No. We build, deploy, and maintain everything. Your team uses simple interfaces — chat, email, or the tools they already know.' },
      { q: 'How much does AI automation cost for a small business?', a: 'Projects scale to your needs. A single AI assistant or workflow automation typically costs far less than the staff time it saves — contact us for a free assessment.' },
    ],
    related: ['data-analytics', 'business-dashboards', 'website-development'],
  },
  {
    slug: 'website-development',
    name: 'Website Development',
    title: 'Custom Website Development | RKD Software Innovations',
    metaDesc: 'High-performance, conversion-focused custom websites. Modern design, fast loading, SEO built in. Website development for businesses of all sizes.',
    h1: 'Custom Website Development',
    intro: 'Your website is your hardest-working salesperson. We build modern, fast, conversion-focused websites that your customers love using — with SEO, mobile responsiveness, and performance built in from day one.',
    bullets: [
      'Custom-designed business websites — no templates, built around your brand',
      'E-commerce and booking functionality',
      'Search engine optimization (SEO) built into every page',
      'Speed optimization — fast-loading pages that keep visitors engaged',
      'Bug fixes, redesigns, and ongoing maintenance for existing sites',
    ],
    benefits: [
      { h: 'Built to convert', p: 'Every layout decision drives visitors toward contacting you or buying.' },
      { h: 'Found on Google', p: 'Technical SEO, structured data, and content strategy come standard.' },
      { h: 'Mobile-first', p: 'Flawless on phones, tablets, and desktops.' },
    ],
    faqs: [
      { q: 'How long does it take to build a business website?', a: 'A standard business website typically launches in 1–2 weeks. Larger sites with e-commerce or custom features take 4–8 weeks.' },
      { q: 'Do you redesign existing websites?', a: 'Yes — we modernize outdated sites, fix bugs, improve speed, and migrate hosting without losing your existing search rankings.' },
      { q: 'Will my website show up on Google?', a: 'Every site we build includes technical SEO: proper metadata, structured data, sitemaps, fast loading, and mobile responsiveness — the foundation for ranking.' },
    ],
    related: ['mobile-app-development', 'ai-automation', 'cybersecurity'],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    title: 'Mobile App Development — iOS & Android | RKD Software Innovations',
    metaDesc: 'Custom iOS and Android app development. Native and cross-platform mobile apps tailored to your business, from design through App Store launch.',
    h1: 'Mobile App Development',
    intro: 'We design and build iOS and Android apps around your workflow and your customers’ needs — from first wireframe through App Store launch and beyond.',
    bullets: [
      'Native and cross-platform development (iOS + Android from one codebase)',
      'Customer-facing apps — ordering, booking, loyalty, communities',
      'Internal business apps — field service, inventory, staff tools',
      'App Store and Google Play submission, review handling, and launch support',
      'Ongoing updates, monitoring, and feature development',
    ],
    benefits: [
      { h: 'One team, both platforms', p: 'Cross-platform builds ship to iPhone and Android simultaneously — half the cost of separate native teams.' },
      { h: 'Store-ready', p: 'We handle certificates, review guidelines, screenshots, and the entire submission process.' },
      { h: 'Built around users', p: 'Intuitive UX designed for real people, tested on real devices.' },
    ],
    faqs: [
      { q: 'How much does a mobile app cost to build?', a: 'Simple apps start in the low five figures; complex products with backends and payments cost more. We scope precisely after a free discovery call.' },
      { q: 'iOS first or Android first?', a: 'With cross-platform frameworks you rarely have to choose — one codebase ships to both stores at once.' },
      { q: 'Do you handle App Store submission?', a: 'Yes — end to end, including Apple review responses and rejection fixes. We have shipped through the toughest review cycles.' },
    ],
    related: ['website-development', 'desktop-software', 'ai-automation'],
  },
  {
    slug: 'desktop-software',
    name: 'Desktop Software',
    title: 'Custom Desktop Software Development | RKD Software Innovations',
    metaDesc: 'Custom Windows, Mac, and cross-platform desktop applications. Replace spreadsheets with real tools built for your exact business process.',
    h1: 'Custom Desktop Software',
    intro: 'When your business outgrows spreadsheets, we build the desktop software that replaces them — fast, offline-capable, secure tools designed around your exact process.',
    bullets: [
      'Fully custom Windows, Mac, and cross-platform applications',
      'Replace fragile spreadsheet workflows with real databases and interfaces',
      'Offline-capable software for shops, warehouses, and field work',
      'Integration with your existing hardware — scanners, printers, POS',
      'Migration from legacy systems without losing historical data',
    ],
    benefits: [
      { h: 'Your process, exactly', p: 'No forcing your operations into generic software — the tool fits the business.' },
      { h: 'Works offline', p: 'Desktop software keeps working when the internet does not.' },
      { h: 'One-time investment', p: 'Own your software instead of renting per-seat SaaS licenses forever.' },
    ],
    faqs: [
      { q: 'Should I build custom software or buy off-the-shelf?', a: 'If off-the-shelf covers 90% of your needs, buy it. When you are maintaining spreadsheet workarounds and paying for unused features, custom becomes cheaper long-term.' },
      { q: 'Can you modernize our old legacy software?', a: 'Yes — we rebuild legacy tools on modern technology while preserving your data and familiar workflows.' },
    ],
    related: ['data-analytics', 'hardware-support', 'ai-automation'],
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    title: 'Business Data & Analytics Services | RKD Software Innovations',
    metaDesc: 'Turn raw business data into clear decisions. Data organization, sales and customer analytics, secure database backups, and reporting.',
    h1: 'Data & Analytics Services',
    intro: 'Your business generates data every day — sales, customers, operations. We organize it, analyze it, and turn it into answers, so you know exactly what is working and what is not.',
    bullets: [
      'Data cleaning and organization — one source of truth instead of scattered spreadsheets',
      'Sales, customer, and operations analytics',
      'Automated recurring reports delivered to your inbox',
      'Secure database backups so you never lose critical customer information',
      'Data migration between systems (CRM switches, platform upgrades)',
    ],
    benefits: [
      { h: 'Decisions from facts', p: 'See which products, customers, and channels actually drive profit.' },
      { h: 'Never lose data', p: 'Automated encrypted backups protect your most valuable asset.' },
      { h: 'Hours back', p: 'Reports that took a day of spreadsheet work generate themselves.' },
    ],
    faqs: [
      { q: 'What data should a small business track?', a: 'At minimum: sales by product and channel, customer acquisition cost, repeat-purchase rate, and cash flow. We set up tracking that fits your business model.' },
      { q: 'Our data is a mess of spreadsheets — can you help?', a: 'That is the most common starting point. We consolidate scattered spreadsheets into an organized system with automated reporting.' },
    ],
    related: ['business-dashboards', 'ai-automation', 'cloud-infrastructure'],
  },
  {
    slug: 'business-dashboards',
    name: 'Dashboards',
    title: 'Business Dashboard Development | RKD Software Innovations',
    metaDesc: 'Real-time KPI dashboards for sales, operations, and finance. Custom charts, live data, and report exports — see business performance at a glance.',
    h1: 'Business Dashboard Development',
    intro: 'Stop digging through spreadsheets to know how your business is doing. We build visual, real-time dashboards that put your most important numbers front and center — on any screen.',
    bullets: [
      'KPI dashboards for sales, operations, and finance',
      'Real-time data with live updates from your existing tools',
      'Custom charts, filters, and drill-downs',
      'Scheduled report exports (PDF, Excel) for stakeholders',
      'TV-mode displays for office and warehouse walls',
    ],
    benefits: [
      { h: 'One glance, full picture', p: 'Todays sales, this months trend, top customers — visible in seconds.' },
      { h: 'Live, not stale', p: 'Dashboards pull from your real systems continuously — no manual updating.' },
      { h: 'Share with confidence', p: 'Investors and managers get polished, always-current reporting.' },
    ],
    faqs: [
      { q: 'What tools can dashboards pull data from?', a: 'Nearly anything: QuickBooks, Stripe, Square, Shopify, CRMs, Google Sheets, SQL databases, and custom software. If it stores data, we can usually connect it.' },
      { q: 'How is this different from Excel charts?', a: 'Dashboards update themselves in real time, combine multiple data sources, and are accessible from any device — no manual refresh, no version confusion.' },
    ],
    related: ['data-analytics', 'ai-automation', 'website-development'],
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud Infrastructure',
    title: 'Cloud Migration & Infrastructure — AWS, Google Cloud | RKD Software Innovations',
    metaDesc: 'Cloud migration and infrastructure on AWS and Google Cloud. Lower tech costs, auto-scaling, backups, and disaster recovery for growing businesses.',
    h1: 'Cloud Infrastructure & Migration',
    intro: 'We move businesses to secure, scalable cloud infrastructure on AWS and Google Cloud — cutting server costs, eliminating crashes, and setting you up to grow without IT headaches.',
    bullets: [
      'Cloud migration from on-premise servers or aging hosting',
      'Architecture design on AWS and Google Cloud',
      'Cost optimization — right-sizing so you stop overpaying',
      'Auto-scaling for traffic spikes, automated backups, disaster recovery',
      'Infrastructure cleanup — eliminate the crashes and slowdowns',
    ],
    benefits: [
      { h: 'Lower monthly costs', p: 'Most businesses overpay for servers; right-sized cloud typically cuts infrastructure spend 30–60%.' },
      { h: 'No more crashes', p: 'Redundant cloud infrastructure keeps you online through hardware failures and traffic spikes.' },
      { h: 'Grow without friction', p: 'Scaling to more users becomes a configuration change, not a hardware purchase.' },
    ],
    faqs: [
      { q: 'Is the cloud safe for business data?', a: 'AWS and Google Cloud offer stronger security than nearly any on-premise setup — encryption, redundancy, and compliance certifications — when configured correctly, which is our job.' },
      { q: 'How long does cloud migration take?', a: 'A typical small-business migration completes in 1–3 weeks with zero or near-zero downtime, planned around your business hours.' },
    ],
    related: ['cybersecurity', 'networking', 'data-analytics'],
  },
  {
    slug: 'networking',
    name: 'Networking',
    title: 'Business Network Setup & Support | RKD Software Innovations',
    metaDesc: 'Network design, VPN and firewall setup, security hardening, and ongoing network support. Reliable, secure networking for offices and businesses.',
    h1: 'Business Networking Services',
    intro: 'Reliable, secure networks so your team stays connected and your business keeps moving — designed, configured, and supported end to end.',
    bullets: [
      'Network design and setup for offices, shops, and warehouses',
      'Business Wi-Fi that actually covers the whole space',
      'VPN setup for secure remote work',
      'Firewall configuration and security hardening',
      'Troubleshooting slow networks, dead zones, and dropouts',
    ],
    benefits: [
      { h: 'No more dropouts', p: 'Properly designed networks eliminate the daily frustration of dying Wi-Fi and frozen video calls.' },
      { h: 'Secure by default', p: 'Segmented guest networks, hardened firewalls, and encrypted remote access.' },
      { h: 'Support on call', p: 'When something breaks, we already know your network layout.' },
    ],
    faqs: [
      { q: 'Why is our office Wi-Fi so slow?', a: 'Usually: consumer-grade equipment, poor access-point placement, channel interference, or an undersized internet plan. We diagnose and fix all four.' },
      { q: 'Do we need a VPN for remote workers?', a: 'If staff access business systems from home or travel, yes — a VPN encrypts that traffic and keeps company data off public networks.' },
    ],
    related: ['cybersecurity', 'hardware-support', 'cloud-infrastructure'],
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    title: 'Cybersecurity Services for Business | RKD Software Innovations',
    metaDesc: 'Vulnerability assessments, penetration testing, firewall and endpoint security, compliance audits, and incident response. Protect your business before attackers strike.',
    h1: 'Cybersecurity Services',
    intro: 'Small businesses are the #1 target for cyberattacks — because attackers know defenses are weakest there. We secure your systems, data, and people before that happens.',
    bullets: [
      'Vulnerability assessments — find the holes before attackers do',
      'Penetration testing of websites, apps, and networks',
      'Firewall, endpoint, and email security setup',
      'Employee phishing awareness and security training',
      'Security audits, compliance support, and incident response',
    ],
    benefits: [
      { h: 'Know your exposure', p: 'A clear, prioritized report of every weakness and how to fix it.' },
      { h: 'Ransomware resilience', p: 'Hardened systems plus tested backups mean an attack becomes an inconvenience, not a catastrophe.' },
      { h: 'Customer trust', p: 'Demonstrable security wins enterprise clients and satisfies vendor questionnaires.' },
    ],
    faqs: [
      { q: 'My business is small — do I really need cybersecurity?', a: 'Small businesses are attacked more than enterprises precisely because they invest less in security. One ransomware incident often costs more than years of protection.' },
      { q: 'What does a vulnerability assessment include?', a: 'We scan and manually test your websites, networks, and systems, then deliver a prioritized report: what is exposed, how severe, and exactly how to fix it.' },
      { q: 'Can you help after a hack or ransomware attack?', a: 'Yes — incident response, containment, recovery from backups, and hardening so it does not happen again.' },
    ],
    related: ['networking', 'cloud-infrastructure', 'website-development'],
  },
  {
    slug: 'hardware-support',
    name: 'Hardware',
    title: 'Business Hardware Setup & Support | RKD Software Innovations',
    metaDesc: 'Workstation and server procurement, hardware troubleshooting, printer and peripheral setup. End-to-end hardware support for businesses.',
    h1: 'Hardware Procurement & Support',
    intro: 'The physical tech your business runs on — sourced, configured, and supported end to end, so equipment problems never slow your team down.',
    bullets: [
      'Workstation and server procurement — right-specced, not overpriced',
      'New employee setup: machines imaged, accounts ready on day one',
      'Hardware troubleshooting and repairs',
      'Printer, scanner, POS, and peripheral configuration',
      'Equipment lifecycle planning and secure disposal',
    ],
    benefits: [
      { h: 'Buy once, buy right', p: 'Correct specifications for the actual workload — no overspending on unused power.' },
      { h: 'Day-one productivity', p: 'New hires sit down to fully configured machines.' },
      { h: 'One call for everything', p: 'Hardware, software, and network issues — one team owns it all.' },
    ],
    faqs: [
      { q: 'Should my business buy or lease computers?', a: 'Buying usually wins for machines kept 4+ years; leasing suits rapid refresh cycles. We run the numbers for your situation.' },
      { q: 'Do you support existing equipment we already own?', a: 'Yes — we service and support hardware regardless of where you bought it.' },
    ],
    related: ['networking', 'desktop-software', 'cybersecurity'],
  },
];

const posts = [
  {
    slug: 'custom-software-solutions-small-business',
    title: 'Custom Software Solutions for Small Business: When to Build vs Buy',
    metaDesc: 'When should a small business invest in custom software solutions vs off-the-shelf tools? A practical decision guide with real cost break-even points.',
    date: TODAY, readMin: 6,
    sections: [
      { h: 'The spreadsheet breaking point', ps: [
        'Every growing business hits the same wall: the spreadsheet that runs operations becomes the thing that breaks operations. Version conflicts, formula errors nobody can trace, one person who "knows how it works" — these are the symptoms that push owners to look at software solutions.',
        'The question is never whether to use software. It is whether off-the-shelf tools fit your business, or whether your business needs software shaped around it.',
      ]},
      { h: 'When off-the-shelf wins', ps: [
        'Buy existing software when your process is standard. Accounting (QuickBooks), email marketing (Mailchimp), scheduling (Calendly) — these problems are identical across millions of businesses, so mass-market tools solve them cheaply and well.',
        'Rule of thumb: if an existing tool covers 90% of your need and the missing 10% is tolerable, buy it.',
      ]},
      { h: 'When custom software solutions win', ps: [
        'Build custom when your process IS your competitive advantage. If you win business because you operate differently — special pricing logic, unique fulfillment flow, service model competitors cannot match — generic software will flatten exactly what makes you different.',
        'Custom also wins on cost more often than owners expect. Five SaaS subscriptions at $50–200/month each, plus staff hours spent gluing them together with exports and re-typing, frequently exceed the amortized cost of one purpose-built tool within two to three years.',
      ]},
      { h: 'The hybrid path most businesses should take', ps: [
        'The smart pattern: keep commodity tools for commodity problems, build custom only for the workflow that differentiates you, and connect everything with integrations so data flows automatically.',
        'That is exactly how we approach projects at RKD Software Innovations — a free discovery call maps your process, then we recommend the cheapest path to the outcome, even when that means telling you not to build.',
      ]},
    ],
  },
  {
    slug: 'ai-automation-small-business-guide',
    title: 'AI Automation for Small Business: A Practical 2026 Guide',
    metaDesc: 'What AI automation actually does for small businesses in 2026 — real use cases, costs, and where to start. No hype, just the practical wins.',
    date: TODAY, readMin: 7,
    sections: [
      { h: 'What AI automation actually means', ps: [
        'Strip away the hype and AI automation is simple: software that handles judgment-requiring tasks that previously needed a human — reading an email and drafting the right reply, extracting totals from an invoice photo, answering a customer question from your policies.',
        'The 2026 difference is accessibility. Capabilities that cost enterprises millions five years ago now deploy for small businesses in days.',
      ]},
      { h: 'The four highest-ROI use cases', ps: [
        '1. Customer service assistants: an AI trained on your business answers common questions 24/7 — pricing, availability, policies — and hands complex cases to humans with full context.',
        '2. Document processing: invoices, receipts, and forms get read, extracted, and entered into your systems automatically.',
        '3. Lead follow-up: every inquiry gets an instant, personalized response and intelligent routing, because speed-to-response is the strongest predictor of closing.',
        '4. Report generation: weekly sales summaries, inventory alerts, and performance digests write themselves from your live data.',
      ]},
      { h: 'What it costs and where to start', ps: [
        'Entry-level automation — one AI assistant or one automated workflow — typically lands in the low four figures to build, with modest monthly running costs. Compare that against the loaded hourly cost of the staff time it replaces; payback in under six months is common.',
        'Start with the task your team complains about most. Repetition plus volume plus low complexity equals the perfect first automation. We offer a free assessment that identifies the highest-ROI candidates in your operation.',
      ]},
    ],
  },
  {
    slug: 'how-much-does-a-business-website-cost',
    title: 'How Much Does a Business Website Cost in 2026?',
    metaDesc: 'Real 2026 pricing for business websites — what drives cost up, where cheap sites hide their price, and how to budget for a site that actually generates business.',
    date: TODAY, readMin: 5,
    sections: [
      { h: 'The honest price ranges', ps: [
        'Template site you assemble yourself (Wix/Squarespace): $200–600/year in subscriptions, plus your weekends. Custom-designed business site from a professional team: roughly $2,000–10,000 depending on size and features. E-commerce or booking functionality: add $2,000–15,000. Web application with accounts and payments: five figures and up.',
        'Anyone quoting far below these ranges is reselling a template with your logo on it.',
      ]},
      { h: 'What actually drives the cost', ps: [
        'Three factors dominate: number of unique page designs, custom functionality (booking, payments, portals), and content creation (copywriting, photography). SEO done properly — structured data, performance optimization, keyword-mapped pages — adds cost upfront and pays it back in free traffic for years.',
      ]},
      { h: 'Where cheap sites get expensive', ps: [
        'The $500 site costs more later: slow loading kills conversions, missing SEO means invisible on Google, security neglect gets sites hacked, and platform lock-in means rebuilding from scratch when you outgrow it.',
        'Budget for the site as a revenue asset, not an expense. A site that brings two extra customers a month pays for itself within the year — that is the standard we build to at RKD Software Innovations.',
      ]},
    ],
  },
  {
    slug: 'cloud-migration-guide-small-business',
    title: 'Cloud Migration for Small Business: AWS vs Google Cloud, Step by Step',
    metaDesc: 'A plain-English cloud migration guide for small businesses — when to move, AWS vs Google Cloud, real costs, and the migration steps that avoid downtime.',
    date: TODAY, readMin: 6,
    sections: [
      { h: 'Signals it is time to move', ps: [
        'Aging server hardware facing a replacement bill. Team needs remote access to office-bound systems. Backups are manual, untested, or missing. Hosting crashes under traffic. Any one of these makes cloud migration worth pricing; two or more make it urgent.',
      ]},
      { h: 'AWS vs Google Cloud for small business', ps: [
        'Both are excellent; the differences at small-business scale are marginal. AWS has the broadest service catalog and the largest talent pool. Google Cloud often wins on simplicity and pricing transparency, and integrates naturally with Google Workspace shops.',
        'The honest answer: the choice of migration partner matters more than the choice of cloud. Misconfigured AWS costs more than well-configured anything.',
      ]},
      { h: 'The migration process that avoids disasters', ps: [
        '1. Inventory: catalog every system, dependency, and data store. 2. Prioritize: move low-risk systems first, build confidence. 3. Parallel-run: new cloud systems run alongside old ones until verified. 4. Cutover: switch during off-hours with a tested rollback plan. 5. Optimize: right-size resources after real usage data arrives — this step alone typically cuts the bill 30%.',
        'Done this way, most small-business migrations complete in one to three weeks with zero unplanned downtime. That is the process we run at RKD Software Innovations.',
      ]},
    ],
  },
  {
    slug: 'cybersecurity-checklist-small-business',
    title: 'The Small Business Cybersecurity Checklist (12 Items, Most Are Free)',
    metaDesc: 'A 12-point cybersecurity checklist for small businesses — the free basics that stop most attacks, plus the paid layers that matter as you grow.',
    date: TODAY, readMin: 6,
    sections: [
      { h: 'Why attackers prefer small businesses', ps: [
        'Nearly half of cyberattacks target small businesses — not because the payoff is bigger, but because the defenses are weaker. Attackers automate; your business gets scanned for open doors whether anyone is "targeting" you or not.',
      ]},
      { h: 'The free basics (do these this week)', ps: [
        '1. Turn on multi-factor authentication everywhere — email first. 2. Use a password manager; kill password reuse. 3. Enable automatic updates on every device. 4. Turn on disk encryption (built into Windows and Mac). 5. Separate guest Wi-Fi from business Wi-Fi. 6. Set up automatic cloud backups — then actually test a restore. 7. Remove ex-employee accounts the day they leave.',
      ]},
      { h: 'The paid layers that earn their cost', ps: [
        '8. Business-grade firewall with current rules. 9. Endpoint protection on every machine (beyond default antivirus). 10. Email security filtering — phishing remains the #1 entry point. 11. An annual vulnerability assessment to find what you missed. 12. Phishing awareness training, because your team is the real perimeter.',
        'A professional assessment prioritizes all of this against your actual exposure. RKD Software Innovations runs vulnerability assessments and penetration tests that tell you exactly where you stand — before an attacker does.',
      ]},
    ],
  },
  {
    slug: 'business-dashboards-vs-spreadsheets',
    title: 'Business Dashboards vs Spreadsheets: When to Upgrade Your Reporting',
    metaDesc: 'Spreadsheets got you here — dashboards get you further. The real signs your business reporting has outgrown Excel, and what live dashboards change.',
    date: TODAY, readMin: 5,
    sections: [
      { h: 'The hidden cost of spreadsheet reporting', ps: [
        'The Monday-morning report ritual — export, paste, fix formulas, email the file — quietly consumes hours weekly. Worse than the time is the staleness: by the time anyone reads it, the numbers describe last week. Decisions run on outdated data, and version confusion ("is this the final-final file?") erodes trust in the numbers themselves.',
      ]},
      { h: 'What changes with a live dashboard', ps: [
        'A dashboard connects directly to your systems — sales platform, accounting, CRM — and updates continuously. Today’s revenue is visible today. Trends show as charts, not tabs of raw rows. Everyone sees the same numbers, on any device, with zero manual assembly.',
        'The compounding win: questions get asked and answered in the moment ("why did Tuesday spike?") instead of waiting for next week’s report cycle.',
      ]},
      { h: 'When to make the switch', ps: [
        'Upgrade when any of these is true: reporting consumes 3+ hours weekly; decisions wait on data assembly; multiple versions of "the numbers" circulate; or stakeholders ask questions your spreadsheet cannot answer without surgery.',
        'RKD Software Innovations builds dashboards that connect to the tools you already use — typically live within two weeks. The spreadsheet ritual ends there.',
      ]},
    ],
  },
  {
    slug: 'mobile-app-vs-website-for-business',
    title: 'Mobile App vs Website: Which Does Your Business Actually Need?',
    metaDesc: 'App or website first? A practical decision framework — what each does best, real costs, and the order that works for most businesses.',
    date: TODAY, readMin: 5,
    sections: [
      { h: 'The default answer: website first', ps: [
        'A website is discoverable (Google), frictionless (no install), and universal (every device). For attracting new customers, nothing beats it — people search for solutions on the web, not in app stores. If you have neither, build the website first. Almost no exceptions.',
      ]},
      { h: 'When an app earns its place', ps: [
        'Apps win for repeat engagement with people who already chose you: loyalty programs, ordering from regulars, appointment management, communities, and anything needing push notifications, offline access, or device hardware (camera, GPS).',
        'The test: will the same person use this weekly or more? Yes — app justified. No — a well-built mobile website delivers the experience without the install barrier.',
      ]},
      { h: 'Costs and the sequencing that works', ps: [
        'Websites: roughly $2,000–10,000 for a professional business site. Apps: low five figures upward, plus store fees and ongoing updates. The proven sequence for most businesses: website → grow audience → add app when repeat-usage demand is real.',
        'RKD Software Innovations builds both — and because we do, our recommendation in the free discovery call is based on your economics, not what we want to sell.',
      ]},
    ],
  },
  {
    slug: 'signs-your-business-needs-it-support',
    title: '8 Signs Your Business Has Outgrown DIY IT Support',
    metaDesc: 'How to know when ad-hoc IT stops being enough — 8 concrete signals, what each one costs you, and what professional IT support changes.',
    date: TODAY, readMin: 5,
    sections: [
      { h: 'The DIY phase and its expiry date', ps: [
        'Every business starts with DIY IT: the most tech-comfortable person fixes the printer, picks the laptops, and googles the error messages. It works — until the cost of it working badly exceeds the cost of doing it right.',
      ]},
      { h: 'The eight signals', ps: [
        '1. Your "IT person" has an actual job they keep getting pulled from. 2. The same problems recur monthly because root causes never get fixed. 3. Nobody is sure backups work (or exist). 4. New employees wait days for accounts and equipment. 5. Wi-Fi and network complaints are background noise. 6. Software subscriptions accumulate with no owner or audit. 7. Security is "we have antivirus." 8. A single hardware failure could stop revenue for days.',
        'Each signal is a quantifiable cost: interrupted salaried work, staff downtime, security exposure, and revenue fragility. Three or more signals means DIY is already the expensive option.',
      ]},
      { h: 'What changes with professional support', ps: [
        'Root causes get fixed once. Backups run and get tested. Onboarding is same-day. The network just works. Security gets layered properly. And your team stops burning hours on problems outside their jobs.',
        'RKD Software Innovations provides end-to-end IT support — hardware, networking, cloud, and security under one roof, with 24/7 availability. One partner, one call, everything handled.',
      ]},
    ],
  },
];

// ---------- template helpers ----------

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonEsc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const nav = `
  <nav class="nav scrolled" id="nav">
    <div class="container nav-inner">
      <a href="/" class="logo">
        <img src="/logo.png" alt="RKD Software Innovations" class="logo-img" />
        <span class="logo-accent">Software Innovations</span>
      </a>
      <ul class="nav-links">
        <li><a href="/#services">Services</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/#about">About</a></li>
        <li><a href="/#contact" class="btn-nav">Get a Free Consult</a></li>
      </ul>
    </div>
  </nav>`;

const footer = `
  <footer class="footer">
    <div class="container footer-inner">
      <a href="/" class="logo">
        <img src="/logo.png" alt="RKD Software Innovations" class="logo-img" />
        <span class="logo-accent">Software Innovations</span>
      </a>
      <p class="footer-copy">&copy; 2026 RKD Software Innovations. All rights reserved.</p>
      <div class="footer-links">
        <a href="/#services">Services</a>
        <a href="/blog">Blog</a>
        <a href="/#contact">Contact</a>
      </div>
    </div>
  </footer>`;

function head({ title, desc, path, schema }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y21XH74M57"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-Y21XH74M57');
  </script>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${SITE}${path}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE}${path}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${SITE}/og-image.png" />
  <meta property="og:site_name" content="RKD Software Innovations" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${SITE}/og-image.png" />
${schema.map(s => `  <script type="application/ld+json">\n  ${JSON.stringify(s)}\n  </script>`).join('\n')}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="stylesheet" href="/style.css" />
</head>
<body>`;
}

const breadcrumb = items => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: SITE + url,
  })),
});

// ---------- service pages ----------

mkdirSync(join(ROOT, 'services'), { recursive: true });
for (const s of services) {
  const path = `/services/${s.slug}`;
  const schema = [
    breadcrumb([['Home', '/'], ['Services', '/#services'], [s.name, path]]),
    {
      '@context': 'https://schema.org', '@type': 'Service',
      name: s.name, description: s.metaDesc,
      provider: { '@type': 'Organization', name: 'RKD Software Innovations', url: SITE },
      url: SITE + path, areaServed: 'Worldwide',
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: s.faqs.map(f => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
  const relLinks = s.related.map(r => {
    const rs = services.find(x => x.slug === r);
    return `<a class="pill" href="/services/${rs.slug}">${esc(rs.name)}</a>`;
  }).join('\n          ');

  const html = `${head({ title: s.title, desc: s.metaDesc, path, schema })}
${nav}
  <main class="page-main">
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#services">Services</a> › <span>${esc(s.name)}</span></nav>
      <header class="page-header">
        <span class="section-tag">${esc(s.name)}</span>
        <h1>${esc(s.h1)}</h1>
        <p class="page-intro">${esc(s.intro)}</p>
        <div class="hero-cta"><a href="/#contact" class="btn btn-glow">Get a Free Consultation</a></div>
      </header>

      <section class="page-section">
        <h2>What we do</h2>
        <ul class="card-list big-list">
${s.bullets.map(b => `          <li>${esc(b)}</li>`).join('\n')}
        </ul>
      </section>

      <section class="page-section">
        <h2>Why it pays off</h2>
        <div class="benefit-grid">
${s.benefits.map(b => `          <div class="faq-item"><h3>${esc(b.h)}</h3><p>${esc(b.p)}</p></div>`).join('\n')}
        </div>
      </section>

      <section class="page-section">
        <h2>Frequently asked questions</h2>
        <div class="faq-grid">
${s.faqs.map(f => `          <div class="faq-item"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('\n')}
        </div>
      </section>

      <section class="page-section">
        <h2>Related services</h2>
        <div class="pill-row">
          ${relLinks}
        </div>
      </section>

      <section class="page-cta">
        <h2>Ready to get started?</h2>
        <p>Free 30-minute discovery call. We map your needs and give you a plan — no pressure, no jargon.</p>
        <a href="/#contact" class="btn btn-glow">Start a Project</a>
      </section>
    </div>
  </main>
${footer}
</body>
</html>
`;
  writeFileSync(join(ROOT, 'services', `${s.slug}.html`), html);
}

// ---------- blog posts ----------

mkdirSync(join(ROOT, 'blog'), { recursive: true });
for (const p of posts) {
  const path = `/blog/${p.slug}`;
  const schema = [
    breadcrumb([['Home', '/'], ['Blog', '/blog'], [p.title, path]]),
    {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: p.title, description: p.metaDesc,
      datePublished: p.date, dateModified: p.date,
      author: { '@type': 'Organization', name: 'RKD Software Innovations', url: SITE },
      publisher: { '@type': 'Organization', name: 'RKD Software Innovations', logo: { '@type': 'ImageObject', url: SITE + '/logo.png' } },
      mainEntityOfPage: SITE + path, image: SITE + '/og-image.png',
    },
  ];
  const html = `${head({ title: `${p.title} | RKD Software Innovations`, desc: p.metaDesc, path, schema })}
${nav}
  <main class="page-main">
    <div class="container article-container">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog">Blog</a></nav>
      <article>
        <header class="page-header">
          <h1>${esc(p.title)}</h1>
          <p class="article-meta">${p.date} · ${p.readMin} min read · RKD Software Innovations</p>
        </header>
${p.sections.map(sec => `        <section class="article-section">\n          <h2>${esc(sec.h)}</h2>\n${sec.ps.map(t => `          <p>${esc(t)}</p>`).join('\n')}\n        </section>`).join('\n')}
        <section class="page-cta">
          <h2>Need help with this?</h2>
          <p>RKD Software Innovations builds custom software solutions — AI automation, websites, apps, cloud, and security — for businesses of all sizes.</p>
          <a href="/#contact" class="btn btn-glow">Get a Free Consultation</a>
        </section>
      </article>
    </div>
  </main>
${footer}
</body>
</html>
`;
  writeFileSync(join(ROOT, 'blog', `${p.slug}.html`), html);
}

// ---------- blog index ----------

const blogIndexSchema = [
  breadcrumb([['Home', '/'], ['Blog', '/blog']]),
  {
    '@context': 'https://schema.org', '@type': 'Blog',
    name: 'RKD Software Innovations Blog', url: SITE + '/blog',
    description: 'Practical guides on software solutions, AI automation, cybersecurity, cloud, and business technology.',
  },
];
const blogIndex = `${head({ title: 'Blog — Software Solutions & Business Technology Guides | RKD Software Innovations', desc: 'Practical guides on custom software, AI automation, websites, cybersecurity, cloud migration, and business technology — from RKD Software Innovations.', path: '/blog', schema: blogIndexSchema })}
${nav}
  <main class="page-main">
    <div class="container">
      <header class="page-header">
        <span class="section-tag">Blog</span>
        <h1>Software Solutions &amp; Business Tech Guides</h1>
        <p class="page-intro">Practical, no-hype guides on the technology decisions your business faces.</p>
      </header>
      <div class="faq-grid">
${posts.map(p => `        <a class="faq-item post-card" href="/blog/${p.slug}">\n          <h3>${esc(p.title)}</h3>\n          <p>${esc(p.metaDesc)}</p>\n          <p class="article-meta">${p.date} · ${p.readMin} min read</p>\n        </a>`).join('\n')}
      </div>
    </div>
  </main>
${footer}
</body>
</html>
`;
writeFileSync(join(ROOT, 'blog', 'index.html'), blogIndex);

// ---------- sitemap ----------

const urls = [
  { loc: `${SITE}/`, pri: '1.0' },
  ...services.map(s => ({ loc: `${SITE}/services/${s.slug}`, pri: '0.8' })),
  { loc: `${SITE}/blog`, pri: '0.7' },
  ...posts.map(p => ({ loc: `${SITE}/blog/${p.slug}`, pri: '0.6' })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);

console.log(`Generated: ${services.length} service pages, ${posts.length} posts, blog index, sitemap (${urls.length} URLs).`);
