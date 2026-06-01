/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ServiceItem, PortfolioItem, FAQItem } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ugc-ads",
    name: "UGC Ads Video Production",
    tagline: "Short-form attention-grabbing social media ads that convert scrollers into customers.",
    description: "Our User Generated Content (UGC) ad service connects your brand with real, engaging creators who write, record, and edit highly relatable video ads. We focus on natural storytelling, high-energy hooks, and clear calls-to-action suitable for TikTok, Facebook, Instagram Reels, and YouTube Shorts platforms.",
    category: "Paid Social Ads",
    iconName: "Tv",
    keyBenefits: [
      "Scroll-stopping 3-second hooks engineered for high retention",
      "Sourced by experienced, platform-vetted UGC creators matching your target demographic",
      "End-to-end management: scripting, filming, and post-production editing",
      "Native native feel that blends organically into feeds, lowering CPMs and raising ROAS",
      "Sized in 9:16 portrait ratio with precise custom typography subtitles"
    ],
    packages: [
      {
        name: "Starter UGC Pack",
        price: 299,
        deliveryTime: "5 Business Days",
        revisions: "1 Revision",
        features: [
          "1 UGC Ad Video (15-30s)",
          "1 Hook Variant (Total 2 Hooks)",
          "Professional Subtitles & Captions",
          "Includes 1 Creator Profile Match",
          "Scripting & Conceptualization"
        ]
      },
      {
        name: "Growth UGC Pack",
        price: 599,
        deliveryTime: "7 Business Days",
        revisions: "2 Revisions",
        features: [
          "3 Polished UGC Videos (30-45s)",
          "2 Hooks per Video (6 Total Variants)",
          "A/B Splitting Option",
          "Background music licensing included",
          "Vetted Creator Sourcing & Talent Fee"
        ]
      },
      {
        name: "Premium Scale UGC Pack",
        price: 999,
        deliveryTime: "10 Business Days",
        revisions: "Unlimited Revisions",
        features: [
          "5 High-Converting UGC Videos",
          "3 Hook Options & 2 CTA Options per video",
          "High-end color grading & sound engineering",
          "Dedicated creative strategist & script writer",
          "Raw footage retrieval option"
        ]
      }
    ],
    faqs: [
      {
        question: "How do we select creators for our brand?",
        answer: "We analyze your brand guidelines and demographic target, then pair you with our vetted network of UGC creators. You get to review and approve the selected creators before filming starts."
      },
      {
        question: "Do you handle product shipping to creators?",
        answer: "Yes, once you approve the script, we coordinate shipping details directly with the selected creator. This timeline starts as soon as the physical product is received by them."
      }
    ]
  },
  {
    id: "content-creation",
    name: "Social Media Content Creation",
    tagline: "High-volume organic video content to scale your community and build brand authority.",
    description: "Stay top-of-mind across social media channels without spending all your time filming. We produce engaging Reels, YouTube Shorts, and TikTok content complete with magnetic hooks, dynamic sound design, interactive captions, and optimal content calendars designed to capture search intent and community favor.",
    category: "Organic Growth",
    iconName: "Clapperboard",
    keyBenefits: [
      "Custom trend-focused scripts matching current platform algorithms",
      "Optimized video thumbnails & title design for click-through rate optimization",
      "Interactive social media captions with highly relevant seo meta keywords",
      "Coordinated monthly content calendars outlining high-priority posting times"
    ],
    packages: [
      {
        name: "Starter Reels Pack",
        price: 349,
        deliveryTime: "5 Business Days",
        revisions: "1 Revision",
        features: [
          "5 Custom Edited Reels/Shorts (15-60s)",
          "Engaging hook script copywriting",
          "Dynamic text overlay styling",
          "Platform hashtag strategy"
        ]
      },
      {
        name: "Growth Content Engine",
        price: 799,
        deliveryTime: "8 Business Days",
        revisions: "2 Revisions",
        features: [
          "15 Ready-to-Post Short Videos",
          "Full content calendar & scheduling advice",
          "Thumbnails design & interactive captions",
          "Sound selection & dynamic kinetic subtitles"
        ]
      },
      {
        name: "Premium Creator Takeover",
        price: 1399,
        deliveryTime: "12 Business Days",
        revisions: "3 Revisions",
        features: [
          "30 Organic Short Videos (Daily posting layout)",
          "Comprehensive industry visual audit",
          "Personal dedicated editor & strategist",
          "Monthly asset package delivery"
        ]
      }
    ],
    faqs: [
      {
        question: "Can we use our own raw footage for editing?",
        answer: "Absolutely! You can upload raw clips, Zoom recordings, or talking head videos into a secure drive, and our professional editors will transform them into high-performing short-form content."
      }
    ]
  },
  {
    id: "social-marketing",
    name: "Social Media Marketing Strategy",
    tagline: "Data-driven marketing campaigns designed to convert viewers into paying loyalists.",
    description: "Take the guesswork out of paid ads and digital marketing. Renova Motion builds custom social media marketing workflows focusing on targeted conversion funnels, pixel setup, pixel optimization, demographic analysis, and platform-specific ad assets to maximize return on advertising spend (ROAS).",
    category: "Performance Marketing",
    iconName: "TrendingUp",
    keyBenefits: [
      "End-to-end campaign blueprints customized for your business category",
      "Integration of conversion triggers and strategic demographic profiling",
      "Pixel audits and cross-channel tracking setup support",
      "Continuous split-testing frameworks for creatives, copy, and visual setups"
    ],
    packages: [
      {
        name: "Campaign Blueprint",
        price: 450,
        deliveryTime: "6 Business Days",
        revisions: "1 Revision",
        features: [
          "Comprehensive Campaign Strategy Deck",
          "Target Audience Persona Profiling",
          "Ad Copy Copywriting (3 Angles)",
          "Budget allocation roadmap"
        ]
      },
      {
        name: "Growth Funnel Setup",
        price: 890,
        deliveryTime: "10 Business Days",
        revisions: "2 Revisions",
        features: [
          "Complete ad manager structural config",
          "3 custom creative asset templates",
          "Retargeting funnel layout design",
          "Pixel tracking setup consultation"
        ]
      },
      {
        name: "Scale Strategy Partnership",
        price: 1750,
        deliveryTime: "15 Business Days",
        revisions: "3 Revisions",
        features: [
          "Full pre-launch audit of existing funnels",
          "10 premium ad creative templates",
          "Cross-platform scale roadmap (TikTok + Meta)",
          "30-day post-delivery technical support"
        ]
      }
    ],
    faqs: [
      {
        question: "Is ad budget included in the package?",
        answer: "No, the package prices reflect our creation, setup, and creative strategy fees. Ad spend budget is paid directly to platforms like Meta or TikTok."
      }
    ]
  },
  {
    id: "social-management",
    name: "Social Media Management",
    tagline: "Full-service account curation & brand management to keep your platforms active 24/7.",
    description: "Unlock high-quality, hands-off community building and brand authority. Our full-service social media management keeps your feeds active, plans strategic postings, engages with incoming queries, builds strong community affinity, and provides in-depth metrics reporting to measure absolute organic growth.",
    category: "Organic Management",
    iconName: "UserCheck",
    keyBenefits: [
      "Hands-off, premium scheduling and publishing across chosen networks",
      "Active brand monitoring and friendly community QA response handling",
      "Aesthetic alignment across profile grids, highlights, and bios",
      "Monthly data and performance reporting indicating verified growth indicators"
    ],
    packages: [
      {
        name: "Essential Presence",
        price: 499,
        deliveryTime: "Monthly Service",
        revisions: "Ongoing",
        features: [
          "Management of 2 social profiles",
          "3 scheduled posts per week",
          "Basic customer direct message triaging",
          "Monthly metrics growth reports"
        ]
      },
      {
        name: "Brand Accelerator Pack",
        price: 899,
        deliveryTime: "Monthly Service",
        revisions: "Ongoing",
        features: [
          "Management of 3 social profiles",
          "5 strategic posts per week",
          "1 hour daily community interaction",
          "Grid planning & bio optimization review"
        ]
      },
      {
        name: "Omnipresent Gold Core",
        price: 1599,
        deliveryTime: "Monthly Service",
        revisions: "Ongoing",
        features: [
          "Management of 5 platforms (YT, TikTok, IG, FB, LinkedIn)",
          "Daily strategic publication schedules",
          "Active community reply & query management",
          "Bi-weekly live video consult meetings"
        ]
      }
    ],
    faqs: [
      {
        question: "Is there a minimum monthly commitment?",
        answer: "Our management services operate on a flexible, month-to-month commitment schedule. You are welcome to scale up, scale down, or cancel with 14 days' notice."
      }
    ]
  },
  {
    id: "video-production",
    name: "Professional Video Production",
    tagline: "Cinematic, AI-enhanced, and highly polished videos built to tell your unique brand story.",
    description: "Combining high-end manual cinematography aesthetics with cutting-edge generative AI-assisted scaling tools, we prepare premium product hero clips, promotional spots, storytelling sequences, and corporate highlights. From cinematic transitions to flawless sound effects, we elevate every pixel.",
    category: "Cinematic Media",
    iconName: "Sparkles",
    keyBenefits: [
      "High-end color profiling, cinema-style sound layouts, and SFX",
      "Strategic AI-workflow integrations for cinematic rendering speed and effect generation",
      "Professional pacing calibrated for viewer psychological retention metrics",
      "High resolution file exports with premium visual filters"
    ],
    packages: [
      {
        name: "Cinematic Commercial Spot",
        price: 599,
        deliveryTime: "6 Business Days",
        revisions: "2 Revisions",
        features: [
          "1 High-End Product Video (15-30s)",
          "Cinematic sound design & custom FX",
          "Advanced color grading & text titles",
          "Licensed royalty-free audio tracks"
        ]
      },
      {
        name: "Brand Story Core Video",
        price: 1250,
        deliveryTime: "10 Business Days",
        revisions: "3 Revisions",
        features: [
          "1 Anchor Brand Video (60-90s)",
          "Full scripting, dynamic music selection",
          "Voiceover audio track recording in-studio",
          "Horizontal (16:9) & Vertical (9:16) file formats"
        ]
      },
      {
        name: "Elite Media Suite Pack",
        price: 2490,
        deliveryTime: "14 Business Days",
        revisions: "Unlimited Revisions",
        features: [
          "1 Brand Feature Video + 5 Customized Cutdowns",
          "Aesthetic AI visual integrations",
          "Premium custom title overlay animations",
          "Full commercial platform rights license"
        ]
      }
    ],
    faqs: [
      {
        question: "What raw footage format do you support?",
        answer: "We support all standard digital file extensions like MP4, MOV, ProRes, and HEVC formats. Support is optimized up to 4K resolutions perfectly."
      }
    ]
  },
  {
    id: "guides-courses",
    name: "Video Production Guides & Courses",
    tagline: "Vetted self-paced professional learning models for scaling brands and video creators.",
    description: "Prefer to produce high-performing campaigns in-house? Renova Motion designs top-tier digital training toolkits, templates, and courses to quickly bypass structural learning curves. Master advanced lighting, storytelling scripts, modern editing software, and AI prompting methodologies instantly.",
    category: "Digital Learning",
    iconName: "BookOpen",
    keyBenefits: [
      "No-nonsense professional strategies used daily by leading agencies",
      "Instant, server-side verified secure downloadable items delivered to accounts",
      "Accompanying templates, prompt frameworks, and spreadsheets included",
      "Direct code access & guides available forever without recurring monthly cost structure"
    ],
    packages: [
      {
        name: "Starter Toolkit Access",
        price: 49,
        deliveryTime: "Instant Download",
        revisions: "Not Applicable",
        features: [
          "Access to 3 fundamental script worksheets",
          "Lighting & camera configuration charts",
          "Custom edit timeline cheatsheets",
          "Life-time version update access"
        ]
      },
      {
        name: "The Creator Masterclass Course",
        price: 199,
        deliveryTime: "Instant Portal Delivery",
        revisions: "Creator Community Access",
        features: [
          "8 detailed video modules (4+ hours)",
          "UGC Ads scripting frameworks standard",
          "Figma/Canva visual layout presets",
          "Privileged access to exclusive Discord community"
        ]
      },
      {
        name: "Elite Agency Scale Blueprint",
        price: 399,
        deliveryTime: "Instant Vault Access",
        revisions: "Ongoing Group Calls",
        features: [
          "All core courses + script archives",
          "Contract, invoicing, and proposal templates",
          "Cold-outreach scripting databases",
          "Weekly community feedback loops"
        ]
      }
    ],
    faqs: [
      {
        question: "Can I receive invoice records for corporate training expenses?",
        answer: "Yes, automated premium invoice generation is included. Your corporate entity name can be specified during the payment flow easily."
      }
    ]
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "ugc-script-pack",
    name: "UGC Ad Script Pack",
    shortDescription: "50 high-converting user-generated content templates & visual blueprints optimized for eCommerce.",
    fullDescription: "Writing high-performing video ads is hard. Skip the learning curve with 50 highly modular, plug-and-play user-generated content scripts. We break down the absolute anatomy of a converting ad: Hook, Pain Point Definition, Product Demo, Obstacle Handling, and clear Call To Action. Perfect for founders, agencies, and creators alike looking to generate ads quickly.",
    price: 29.00,
    whatsIncluded: [
      "50 copy-paste script outlines sorted by category",
      "Aesthetic visual direction templates (camera setups, pacing tips)",
      "Ad-agency hook formula reference handbook",
      "Call-to-Action database with 15 variations to split-test"
    ],
    fileFormat: "Interactive PDF & Notion Workspace Link",
    deliveryMethod: "Instant secure digital download link via customer portal after purchase checkout validation",
    rating: 4.9,
    salesCount: 1420,
    imageAccent: "linear-gradient(135deg, #0a0a0a 0%, #3a2e1d 100%)"
  },
  {
    id: "viral-hook-guide",
    name: "Viral Video Hook Guide",
    shortDescription: "100+ proven title and auditory hooks to trap viewer attention on TikTok, Reels, & Shorts.",
    fullDescription: "In short-form content, the first 3 seconds define whether your video gets millions of views or disappears into the void. This digital guide lists 100+ highly emotional, curious, and psychological hook scripts that force users to stop scrolling. Each hook includes written examples and directions on sound delivery.",
    price: 19.00,
    whatsIncluded: [
      "100+ scroll-stopping hooks with high psychological pull",
      "Topic-specific templates (Shopify brands, B2B services, creators)",
      "Audio and caption text alignment patterns for extreme retention ratios",
      "3-part visual hook framing blueprint"
    ],
    fileFormat: "PDF E-Book & Google Sheet Dashboard",
    deliveryMethod: "Instant download file provided in your order records and email receipt.",
    rating: 4.8,
    salesCount: 2854,
    imageAccent: "linear-gradient(135deg, #111111 0%, #2e2617 100%)"
  },
  {
    id: "content-calendar-template",
    name: "Social Media Content Calendar",
    shortDescription: "A 365-day structured plan, tracking dashboard, and ideation module to maintain total consistency.",
    fullDescription: "Stop wondering what to post today. Get 365 days of high-performing content templates and strategy frameworks formatted in a unified dashboard. Designed with content marketing pillars in mind, this database allows creators and team administrators to track scripts, coordinate approvals, organize files, and plan multiple platform channels simultaneously.",
    price: 25.00,
    whatsIncluded: [
      "365 Days of Content Prompts organized logically by theme pillars",
      "Comprehensive tracking matrix for workflows: Idea -> Sourced -> Edited -> Scheduled",
      "Visual grid previews for Instagram, TikTok, and YouTube Shorts",
      "Daily hashtags analysis and trending keywords search blueprint"
    ],
    fileFormat: "Fully customizable Notion Dashboard, Figma Grid template, and Excel sheet",
    deliveryMethod: "Instant access vault token delivered to your profile page after card approval.",
    rating: 5.0,
    salesCount: 912,
    imageAccent: "linear-gradient(135deg, #080808 0%, #473a21 100%)"
  },
  {
    id: "ai-video-prompt",
    name: "AI Video Prompt Pack",
    shortDescription: "The absolute directory for Midjourney, Runway Gen-2, and Luma Dream Machine to build cinematic videos.",
    fullDescription: "Master generative AI cinematography instantly. We provide our precise script commands, framing cues, and stylistic parameters used to create realistic products and cinematic scenes. Stop struggling with shaky or deformed outputs—start generating brand assets that look completely professional and high-budget.",
    price: 35.00,
    whatsIncluded: [
      "250+ custom prompt formulas sorted by aesthetic tone",
      "Luma Gen-2 camera path coordinates and Runway ratio blueprints",
      "Visual mood boards pairing prompts directly with output previews",
      "Post-production guide explaining how to up-res and clean generative video noise"
    ],
    fileFormat: "Notion Directory, TXT Asset file, & Video Tutorials Portal",
    deliveryMethod: "Immediate digital delivery to account upon processing checkout.",
    rating: 4.7,
    salesCount: 651,
    imageAccent: "linear-gradient(135deg, #050505 0%, #523f20 100%)"
  },
  {
    id: "video-starter-course",
    name: "Video Production Starter Course",
    shortDescription: "A complete step-by-step masterclass teaching lighting, sound, pacing, and editing.",
    fullDescription: "The ultimate pathway from visual amateur to digital agency expert. We guide you through the layout of smartphone and mirrorless shooting, standard 3-point studio lighting configurations, raw microphone capturing, dynamic audio mixing, sound effect styling, and the art of professional pacing. Start editing videos that secure premium service rates.",
    price: 99.00,
    whatsIncluded: [
      "12 Video Chapters of practical, zero-fluff video production training",
      "Raw video files archive download to follow and edit side-by-side with us",
      "Custom LUT files (color profiles) for quick Premiere, CapCut, & DaVinci styling",
      "Direct certification upon completing final modules"
    ],
    fileFormat: "Video Portal Access & Downloable resource ZIP archives",
    deliveryMethod: "Secure dashboard link and lifetime access token delivered to email address.",
    rating: 4.9,
    salesCount: 432,
    imageAccent: "linear-gradient(135deg, #151515 0%, #3b301c 100%)"
  },
  {
    id: "fb-reels-guide",
    name: "Facebook Reels Growth Guide",
    shortDescription: "The algorithms playbook to unlock reach, monetization, and virality on Facebook.",
    fullDescription: "Facebook is currently pushing reels through massive organic distribution and direct creator funding. Many creators are generating upwards of $5,000 monthly using non-saturated techniques. This step-by-step guide covers set ups, video formats that trigger the algorithm, cross-posting from TikTok, page setup optimization, and scaling monetization directly.",
    price: 15.00,
    whatsIncluded: [
      "Comprehensive algorithm breakdown detailing viral trigger conditions",
      "Account setup workflow for maximum profile safety and payment verification approval",
      "Copyright-safe source directories cataloging audio & templates",
      "Daily post template plan optimized specifically for FB Reels interface"
    ],
    fileFormat: "A4 Digital PDF Playbook & checklist sheet",
    deliveryMethod: "Instant email ZIP file containing the Guide and accompanying spreadsheet charts.",
    rating: 4.6,
    salesCount: 1109,
    imageAccent: "linear-gradient(135deg, #0d0d0d 0%, #302613 100%)"
  },
  {
    id: "yt-shorts-guide",
    name: "YouTube Shorts Strategy Guide",
    shortDescription: "Algorithm hacks, loop scripting, and SEO metadata strategies to master YouTube Shorts.",
    fullDescription: "YouTube Shorts can act as the absolute engine to scale long-form channel memberships, digital sales, and brand positioning. Learn the loop-scripting mechanics that force users to watch your Shorts 1.5 times, boosting your retention scores past 130%. Discover how search index optimization acts as an ongoing distribution driver.",
    price: 22.00,
    whatsIncluded: [
      "Loop scripting templates (generating continuous infinite scroll hooks)",
      "High-index keyword cataloging methodology to lock in search views indefinitely",
      "Thumbnail style guide and dynamic custom card vectors",
      "Complete editing breakdown outlining high-pacing cuts"
    ],
    fileFormat: "Comprehensive PDF Guidebook & Scripting spreadsheet tools",
    deliveryMethod: "Instant secure link generated inside order portal checkout area instantly.",
    rating: 4.8,
    salesCount: 789,
    imageAccent: "linear-gradient(135deg, #020202 0%, #261e12 100%)"
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "port-1",
    title: "EcoClean - Converting UGC Ad Series",
    category: "UGC Ads",
    description: "Generated 3 dedicated creators to film problem-solution hooks for an eco-friendly cleaning client. Styled with dynamic typography highlights and rapid product demos.",
    platform: "Meta Ads",
    result: "3.42x Verifed ROAS",
    metric: "+242% Conv. Rate",
    clientName: "EcoClean Home Products",
    bgGradient: "linear-gradient(135deg, #000000 0%, #d4af37 100%)"
  },
  {
    id: "port-2",
    title: "TechPro - Daily Reels Organic Engine",
    category: "Social Media Videos",
    description: "Planned and customized 15 strategic talking-head reels and shorts using the tech-growth system, optimizing key hooks and sound effects for developer engagement channels.",
    platform: "Instagram Reels",
    result: "1.2M Combined Views",
    metric: "+42K Followers",
    clientName: "TechPro SaaS Systems",
    bgGradient: "linear-gradient(135deg, #111 0%, #1c1810 100%)"
  },
  {
    id: "port-3",
    title: "GoldPlate - Gourmet Recipe Showcase",
    category: "Recipe Videos",
    description: "Cinematic close-up product pacing, high-end sound effects (ASMR slicing and sizzling), and color correction to premium gold hues for an artisanal olive brand.",
    platform: "TikTok",
    result: "4.5M Organic Views",
    metric: "+150% Web Traffic",
    clientName: "GoldPlate Premium Olive Oils",
    bgGradient: "linear-gradient(135deg, #1a1a1a 0%, #e0c25a 100%)"
  },
  {
    id: "port-4",
    title: "BarkyFoods - Hyper Pet Content",
    category: "Pet & Animal Content",
    description: "Coordinated with dynamic pet creators to film humorous reaction videos showcasing raw food transformation benefits. Captions styled to look native to organic posts.",
    platform: "YouTube Shorts",
    result: "780K Total Impressions",
    metric: "+84% Subscriber Base",
    clientName: "BarkyFoods Premium",
    bgGradient: "linear-gradient(135deg, #000000 0%, #aa8c2c 100%)"
  },
  {
    id: "port-5",
    title: "Luminary - High-End Brand Video",
    category: "Brand Videos",
    description: "Structured an immersive storytelling experience for a luxury watch brand. Masterfully blended live cinematography shadows, crisp micro-shots of gear actions, and a rich, deep voiceover.",
    platform: "All Platforms",
    result: "Professional Brand Anchor",
    metric: "Mercury Gates Approved",
    clientName: "Luminary Watch Co.",
    bgGradient: "linear-gradient(135deg, #222222 0%, #f3e5ab 100%)"
  },
  {
    id: "port-6",
    title: "RetroWear - Gen-AI Fashion Ad",
    category: "AI Video Projects",
    description: "Engineered cinematic visual concepts matching nostalgic retro fashion aesthetics using Midjourney paired with high-clarity Runway Luma motion. Seamless editing transitions.",
    platform: "TikTok",
    result: "Creative Innovation Spot",
    metric: "+15% CTR Increase",
    clientName: "RetroWear Clothing",
    bgGradient: "linear-gradient(135deg, #0c0a06 0%, #bf9821 100%)"
  }
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: "What is the delivery time after purchase?",
    answer: "For all digital files (Script Packs, Guides, Templates), delivery is completely instant. Your secure download links will be rendered immediately on the successful checkout page, listed on your Customer Account page, and sent via an automated business confirmation email. For custom media production services, typical turnaround takes between 5 to 14 business days depending on client shipping and selected packages.",
    category: "General"
  },
  {
    question: "How do custom services project launches work?",
    answer: "Choose your service package or coordinate a Custom Quote Request first. Once payment authorization is secure, we setup a streamlined onboarding dashboard where you upload product assets, target personas, and branding guidelines. If physical product shipping is required, we match the best creators in our network and deliver shipping coordinates instantly.",
    category: "Services"
  },
  {
    question: "Are your payments secured inside the platform?",
    answer: "Renova Motion utilizes fully compliant, encrypted card sandbox patterns mimicking Stripe, PayPal, and global business routing layouts. Your transactions are safe and we supply official itemized invoices suitable for business accounting audits, Wise balances, and financial records.",
    category: "Payment & Custom Quotes"
  },
  {
    question: "Do you offer refunds on digital goods?",
    answer: "Because digital templates and script guides are accessible immediately upon delivery, we operate a limited refund policy on software and documentation products. If you receive an incorrect file format, or experience structural downloading issues, our team always resolves or assists with manual file transfers within 24 hours.",
    category: "Digital Products"
  }
];

export const LEGAL_PRIVACY_POLICY = `
## Privacy Policy

**Last Updated: June 1, 2026**

Renova Motion ("we," "us," or "our") operates RenovaMotion.com. This Privacy Policy details our procedures regarding the collection, secure handling, storage, and protection of customer personal information.

### 1. Information Collected
We collect the following personal and professional details:
* **Contact Data**: Individual full name, corporate name, email address, physical shipping address.
* **Transaction Data**: Details regarding packages bought, e-commerce downloads redeemed, and custom quotes requested.
* **Technical Analytics**: Browser metadata, IP addresses, cookie tracking to evaluate client preferences, and layout conversion optimization.

### 2. How We Use Information
Your details are used strictly to:
* Validate digital product ownership and render secure cloud download keys.
* Dispatch automatic service confirmations, platform updates, and invoices.
* Coordinate script creator matches and physical product delivery logistics.
* Ensure compliant, audit-ready payment approvals with credit institutions (PayPal, Wise, Mercury, Stripe).

### 3. Sharing & Disclosures
We never sell individual demographic data. Information is shared strictly with compliant cloud hosting services, payment gateways, and shipping logistics partners necessary to fulfill your booked services.
`;

export const LEGAL_TERMS_OF_SERVICE = `
## Terms of Service

**Last Updated: June 1, 2026**

These Terms of Service govern your access to RenovaMotion.com and purchases of services/digital goods. By accessing or using our platform, you agree to these terms.

### 1. Digital Products License
Upon paying the specified fees for digital guides, script archives, or templates, Renova Motion grants you a non-exclusive, perpetual, royalty-free, single-user license to implement our written blueprints inside your personal or commercial brand campaigns. 

**Prohibited Actions**: Redistribution, reselling, or public white-labeling of the digital assets as competing masterclass templates is strictly forbidden.

### 2. Custom Production Services
* **Timeline**: Service completion timelines start only after physical items have arrived at approved creator studios AND all onboarding question sheets are loaded into our dashboards.
* **Client Approvals**: Custom services include dedicated revision rounds. Unused revisions expire 30 days after draft delivery.
* **Commercial Rights**: Upon final payment approval and campaign signature, full copyright distribution privileges for completed short-form video files transfer directly to the client.

### 3. Gateway Compliance & Chargebacks
Any visual dispute should first be raised directly with Renova Motion Support. We strive to provide premium edits and replace assets within 2 Business Days to coordinate friendly and compliant business resolutions.
`;

export const LEGAL_REFUND_POLICY = `
## Refund Policy

**Last Updated: June 1, 2026**

Our refund guidelines are framed to ensure complete compliance with international business transaction portals and consumer protection laws.

### 1. Digital Goods
Due to the non-returnable nature of downloadable digital publications, courses, script bundles, and templates, all digital product sales are generally final once the download link is generated on your screen.
* **Exceptions**: If a buyer makes a duplicate purchase error, or is unable to extract the delivery file formats, we will process a manual refund or deliver file alternatives upon validation within 7 days of the transaction.

### 2. Custom Media & Marketing Services
* **Pre-Filming Cancellation**: A full refund of any custom package can be requested at any time prior to the scripting or physical creator matching state.
* **In-Production Cancellation**: If writing or creator sourcing is already complete, a 15% creative reservation fee is withheld to compensate creators.
* **Delivered Files**: If customized videos are delivered and revisions are utilized, no refunds are authorized. We offer unlimited or defined modifications depending on your chosen service tier to guarantee 100% video satisfaction.
`;
