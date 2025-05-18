import { Province } from '../types/province';

const provinces: Province[] = [
  {
    id: 'atlantic-immigration-program',
    name: 'Atlantic Immigration Program',
    description: 'The Atlantic Immigration Program is a pathway to permanent residence for skilled foreign workers and international graduates from a Canadian institution who want to work and live in 1 of Canada\'s 4 Atlantic provinces—New Brunswick, Nova Scotia, Prince Edward Island or Newfoundland and Labrador.',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Atlantic Immigration Program',
        description: 'A pathway to permanent residence for skilled workers and international graduates who want to work and live in Atlantic Canada. The program helps employers in Atlantic Canada hire qualified candidates for jobs they haven\'t been able to fill locally.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/atlantic-immigration.html'
      }
    ]
  },
  {
    id: 'northwest-territories',
    name: 'Northwest Territories',
    description: 'Explore immigration opportunities in Canada\'s Northwest Territories through the Northwest Territories Nominee Program (NTNP), designed to support the territory\'s economic growth and meet labor market needs.',
    image: 'https://images.unsplash.com/photo-1469125155630-7ed37e065743?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1517339234442-5cfdc9a90a69?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Northwest Territories Nominee Program',
        description: 'Explore all immigration pathways available through the Northwest Territories Nominee Program (NTNP).',
        url: 'https://www.immigratenwt.ca/employer-driven-stream'
      }
    ]
  },
  {
    id: 'yukon',
    name: 'Yukon',
    description: 'Discover opportunities in Canada\'s westernmost territory through the Yukon Nominee Program (YNP) and other immigration pathways designed to address labor market needs and support economic growth.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Yukon Nominee Program',
        description: 'Explore all immigration pathways available through the Yukon Nominee Program (YNP), including Skilled Worker, Critical Impact Worker, Express Entry, Community Program, and Business streams.',
        url: 'https://yukon.ca/en/immigrate-yukon'
      }
    ]
  },
  {
    id: 'new-brunswick',
    name: 'New Brunswick',
    description: "New Brunswick's immigration program streams are pathways to permanent residence (PR) for foreign workers who have the skills, education, and work experience necessary to successfully contribute to New Brunswick's economy. Each program stream has specific eligibility requirements relating to age, language test scores, education levels, and professional experience.",
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1543039625-14cbd3802e7d?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'New Brunswick Express Entry Stream',
        description: 'The New Brunswick Express Entry Stream of the New Brunswick Provincial Nominee Program (NBPNP) connects to the federal express entry system and will increase your chance of being issued an Invitation to Apply (ITA) for permanent residency from Immigration, Refugees and Citizenship Canada.',
        url: 'https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/nb-express-entry-stream.html'
      },
      {
        name: 'New Brunswick Strategic Initiative Stream',
        description: 'The New Brunswick Strategic Initiative Stream is for French-speaking workers with the skills, education, and work experience to contribute to New Brunswick\'s economy, and who are ready to live and work in New Brunswick permanently.',
        url: 'https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/nb-strategic-initiative-stream.html'
      },
      {
        name: 'New Brunswick Private Career College Graduate Pilot Program',
        description: 'The New Brunswick Private Career College Graduate Pilot Program is for international graduates with the skills, education, and work experience to contribute to New Brunswick\'s economy, and who are ready to live and work in New Brunswick permanently. The objective of the pilot program is to make available an immigration pathway to international graduates from select one-year and two-year programs of study that lead to careers in priority occupations in Education and Social Development, Health, IT and Cybersecurity, Business Administration, and in Supply Chain and Logistics.',
        url: 'https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/private-career-college-graduate-pilot-program.html'
      },
      {
        name: 'New Brunswick Skilled Worker Stream',
        description: 'The New Brunswick Skilled Worker Stream is designed for Foreign Nationals who possess a job offer in New Brunswick, and have the skills, education, and work experience needed to contribute to New Brunswick\'s economy. Candidates must meet the program\'s minimum eligibility requirements, have a genuine offer of employment from a New Brunswick Employer, and have the full intent to live and work in the province on a permanent basis.',
        url: 'https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/nb-skilled-worker-stream.html'
      },
      {
        name: 'New Brunswick Business Immigration Stream',
        description: 'The New Brunswick Business Immigration Stream is an economic immigration pathway for experienced entrepreneurs who are ready to establish, operate, and actively manage a business while living and settling in New Brunswick permanently.',
        url: 'https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/nb-business-immigration-stream.html'
      },
      {
        name: 'New Brunswick Critical Worker Pilot',
        description: 'The New Brunswick Critical Worker Pilot Program is an employer-driven stream, based on targeted recruitment for skilled workers and therefore candidate applications to the pilot are made through the participating employer. The program does not accept direct applications from interested candidates.',
        url: 'https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/nb-critical-workers-pilot.html'
      }
    ]
  },
  {
    id: 'ontario',
    name: 'Ontario',
    description: 'Explore permanent residency pathways in Canada\'s most populous province.',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'OINP - Human Capital Priorities Stream',
        description: 'For skilled workers with work experience in high-demand occupations. Requires an Express Entry profile.',
        url: 'https://www.ontario.ca/page/ontarios-express-entry-human-capital-priorities-stream'
      },
      {
        name: 'OINP - French-Speaking Skilled Worker Stream',
        description: 'For French-speaking skilled workers with strong English or French language skills.',
        url: 'https://www.ontario.ca/page/ontarios-express-entry-french-speaking-skilled-worker-stream'
      },
      {
        name: 'OINP - Skilled Trades Stream',
        description: 'For skilled tradespeople with work experience in eligible trades.',
        url: 'https://www.ontario.ca/page/ontarios-express-entry-skilled-trades-stream'
      },
      {
        name: 'OINP - Foreign Worker Stream',
        description: 'For foreign workers with a valid job offer in Ontario.',
        url: 'https://www.ontario.ca/page/oinp-employer-job-offer-foreign-worker-stream'
      },
      {
        name: 'OINP - International Student Stream',
        description: 'For international students with a valid job offer in Ontario.',
        url: 'https://www.ontario.ca/page/oinp-employer-job-offer-international-student-stream'
      },
      {
        name: 'OINP - In-Demand Skills Stream',
        description: 'For workers with job offers in specific in-demand occupations.',
        url: 'https://www.ontario.ca/page/oinp-employer-job-offer-demand-skills-stream'
      },
      {
        name: 'OINP - Masters Graduate Stream',
        description: 'For international students who completed a master\'s degree in Ontario. No job offer required.',
        url: 'https://www.ontario.ca/page/oinp-masters-graduate-stream'
      },
      {
        name: 'OINP - PhD Graduate Stream',
        description: 'For international students who completed a PhD in Ontario. No job offer required.',
        url: 'https://www.ontario.ca/page/oinp-phd-graduate-stream'
      },
      {
        name: 'Canadian Experience Class (CEC)',
        description: 'For temporary workers or international students with at least 1 year of skilled work experience in Canada.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/canadian-experience-class.html'
      },
      {
        name: 'Federal Skilled Worker Program (FSWP)',
        description: 'For skilled workers with foreign work experience who meet eligibility criteria.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html'
      },
      {
        name: 'Federal Skilled Trades Program (FSTP)',
        description: 'For skilled tradespeople with work experience in eligible trades.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/skilled-trades.html'
      },
      {
        name: 'Rural and Northern Immigration Pilot (RNIP)',
        description: 'For skilled workers who want to settle in participating rural communities in Ontario.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/rural-northern-immigration-pilot.html'
      },
      {
        name: 'Agri-Food Immigration Pilot',
        description: 'For workers in the agri-food industry with job offers in eligible occupations.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/agri-food-pilot.html'
      },
      {
        name: 'Start-up Visa Program',
        description: 'For entrepreneurs who want to start a business in Canada.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html'
      },
      {
        name: 'Self-employed Persons Program',
        description: 'For individuals who want to be self-employed in Canada in athletics or cultural activities.',
        url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/self-employed.html'
      }
    ]
  },
  {
    id: 'british-columbia',
    name: 'British Columbia',
    description: 'Discover opportunities on Canada\'s beautiful west coast through various immigration streams including Skills Immigration, Express Entry BC, and Entrepreneur pathways.',
    image: 'https://images.unsplash.com/photo-1560814304-4f05b62af116?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1502675135487-e971002a6adb?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Skills Immigration',
        description: 'For workers and recent graduates with the skills, experience and qualifications needed by B.C. employers. This includes various streams for skilled workers, healthcare professionals, international graduates, and entry-level workers.',
        url: 'https://www.welcomebc.ca/immigrate-to-b-c/skills-immigration'
      },
      {
        name: 'Entrepreneur Immigration',
        description: 'For experienced entrepreneurs who intend to create and actively manage a business in the province. This pathway supports business innovation and investment in British Columbia.',
        url: 'https://www.welcomebc.ca/immigrate-to-b-c/entrepreneur-immigration'
      },
      {
        name: 'Additional Resources',
        description: 'Find detailed information about application timelines, required documentation, employer responsibilities, and other important aspects of immigrating to British Columbia. This comprehensive guide will help you understand the complete immigration process.',
        url: 'https://www.welcomebc.ca/immigrate-to-b-c'
      }
    ]
  },
  {
    id: 'quebec',
    name: 'Quebec',
    description: 'Quebec has a unique immigration agreement with the Government of Canada, granting it the authority to select its own immigrants. Unlike other provinces, federal programs like Express Entry (FSWP, CEC, FSTP) do not apply to Quebec. Instead, Quebec manages its own immigration programs, requiring candidates to first obtain a Certificat de sélection du Québec (CSQ) before applying for permanent residence. Experience the unique culture and opportunities in French Canada through various immigration streams including the Quebec Skilled Worker Program, Quebec Experience Program, and specialized pilot programs.',
    image: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Skilled Worker Selection Program (PSTQ)',
        description: 'The main immigration program for skilled workers looking to settle permanently in Quebec.',
        url: 'https://www.quebec.ca/en/immigration/permanent/skilled-workers/skilled-worker-selection-program'
      },
      {
        name: 'Regular Skilled Worker Program (PRTQ)',
        description: 'Now replaced by PSTQ, this program was the previous version of Quebec\'s skilled worker selection system.',
        url: 'https://www.quebec.ca/en/immigration/permanent/skilled-workers/regular-skilled-worker-program'
      },
      {
        name: 'Québec Experience Program (PEQ)',
        description: 'Fast-track program for temporary foreign workers and international students who have lived and worked/studied in Quebec.',
        url: 'https://www.quebec.ca/en/immigration/permanent/skilled-workers/quebec-experience-program'
      },
      {
        name: 'Open Work Permit (IMP+ Program)',
        description: 'Allows skilled workers to obtain an open work permit while waiting for permanent residence.',
        url: 'https://www.quebec.ca/en/immigration/permanent/skilled-workers/open-work-permit'
      },
      {
        name: 'Food Processing Workers Pilot Program',
        description: 'Permanent immigration pathway for workers in the food processing industry.',
        url: 'https://www.quebec.ca/en/immigration/permanent/skilled-workers/food-processing'
      },
      {
        name: 'Orderlies Pilot Program',
        description: 'Permanent immigration pathway specifically for healthcare orderlies.',
        url: 'https://www.quebec.ca/en/immigration/permanent/skilled-workers/orderlies'
      },
      {
        name: 'AI, IT, and Visual Effects Pilot Program',
        description: 'For workers in artificial intelligence, information technologies, and visual effects sectors.',
        url: 'https://www.quebec.ca/en/immigration/permanent/skilled-workers/artificial-intelligence'
      },
      {
        name: 'Self-Employed Worker Program',
        description: 'For individuals who wish to settle in Quebec and work for themselves.',
        url: 'https://www.quebec.ca/en/immigration/permanent/immigrate-business/self-employed-workers'
      },
      {
        name: 'Family Sponsorship Program',
        description: 'Allows Quebec residents to sponsor certain family members for permanent residence.',
        url: 'https://www.quebec.ca/en/immigration/permanent/sponsor-family-member'
      }
    ]
  },
  {
    id: 'alberta',
    name: 'Alberta',
    description: 'Find opportunities in Canada\'s energy and technology hub through various streams under the Alberta Advantage Immigration Program (AAIP) and other pathways.',
    image: 'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1469053913977-1d2f009670d9?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Alberta Opportunity Stream',
        description: 'For temporary foreign workers already working in Alberta with a valid job offer.',
        url: 'https://www.alberta.ca/aaip-alberta-opportunity-stream'
      },
      {
        name: 'Alberta Express Entry Stream',
        description: 'For candidates in the federal Express Entry pool aligned with Alberta\'s labor needs (includes dedicated pathways for healthcare, tech, and police occupations).',
        url: 'https://www.alberta.ca/aaip-alberta-express-entry-stream'
      },
      {
        name: 'Rural Renewal Stream',
        description: 'For workers with a job offer in a designated rural Alberta community + community endorsement.',
        url: 'https://www.alberta.ca/aaip-rural-renewal-stream'
      },
      {
        name: 'Tourism and Hospitality Stream',
        description: 'For workers in Alberta\'s tourism/hospitality sector with a full-time job offer.',
        url: 'https://www.alberta.ca/tourism-and-hospitality-stream'
      },
      {
        name: 'Rural Entrepreneur Stream',
        description: 'To start or buy a business in rural Alberta (requires community support).',
        url: 'https://www.alberta.ca/aaip-rural-entrepreneur-stream'
      },
      {
        name: 'Graduate Entrepreneur Stream',
        description: 'For Alberta post-secondary graduates launching a business.',
        url: 'https://www.alberta.ca/aaip-graduate-entrepreneur-stream'
      },
      {
        name: 'Foreign Graduate Entrepreneur Stream',
        description: 'For international graduates (outside Canada) launching an innovative startup (requires designated agency support).',
        url: 'https://www.alberta.ca/aaip-foreign-graduate-entrepreneur-stream'
      },
      {
        name: 'Farm Stream',
        description: 'For experienced farmers buying/starting a farm in Alberta.',
        url: 'https://www.alberta.ca/aaip-farm-stream'
      }
    ]
  },
  {
    id: 'manitoba',
    name: 'Manitoba',
    description: 'Explore opportunities in the heart of Canada through the Manitoba Provincial Nominee Program (MPNP) and its various streams for skilled workers, graduates, and entrepreneurs.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Skilled Worker in Manitoba Stream',
        description: 'For qualified temporary foreign workers and international student graduates who are working in Manitoba and have been offered a permanent job by their Manitoba employer.',
        url: 'https://immigratemanitoba.com/immigrate-to-manitoba/swm'
      },
      {
        name: 'Skilled Worker Overseas Stream',
        description: 'For qualified skilled workers who can demonstrate a strong connection to Manitoba through family/friends, previous education/work experience, or invitation through MPNP Strategic Recruitment initiatives.',
        url: 'https://immigratemanitoba.com/immigrate-to-manitoba/swo'
      },
      {
        name: 'Manitoba Express Entry Pathway',
        description: 'For candidates in the federal Express Entry pool who meet Manitoba\'s labor market needs and selection criteria.',
        url: 'https://immigratemanitoba.com/immigrate/federal/'
      },
      {
        name: 'International Education Stream',
        description: 'Provides international students graduating from designated Manitoba post-secondary institutions a faster pathway to nomination through Career Employment, Graduate Internship, and International Student Entrepreneur Pilot pathways.',
        url: 'https://immigratemanitoba.com/immigrate/ies/'
      },
      {
        name: 'Expression of Interest (EOI)',
        description: 'The ranking system that applies to pathways under the Skilled Worker Stream and International Education Stream. Business Investor Stream has a separate EOI process.',
        url: 'https://immigratemanitoba.com/immigrate/apply/eoi/'
      },
      {
        name: 'Business Investor Stream - Entrepreneur Pathway',
        description: 'For entrepreneurs who want to start or buy a business in Manitoba. Requires a business plan, exploratory visit, and net worth proof.',
        url: 'https://immigratemanitoba.com/immigrate/bis/entrepreneur'
      },
      {
        name: 'Business Investor Stream - Farm Investor Pathway',
        description: 'For experienced farm business owners/managers who want to invest in and operate a farm in Manitoba. Requires minimum $300,000 equity, business plan, and exploratory visit.',
        url: 'https://immigratemanitoba.com/immigrate/bis/fip/'
      }
    ]
  },
  {
    id: 'saskatchewan',
    name: 'Saskatchewan',
    description: 'Explore diverse opportunities in Canada\'s prairie province through the Saskatchewan Immigrant Nominee Program (SINP) and its various streams for skilled workers, entrepreneurs, and graduates.',
    image: 'https://images.unsplash.com/photo-1500491460312-c32fc2dbc751?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1471978445661-ad6ec1f5ba50?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'International Skilled Worker',
        description: 'For skilled workers from outside Canada who want to live and work in Saskatchewan.',
        url: 'https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program/browse-sinp-programs/applicants-international-skilled-workers'
      },
      {
        name: 'Worker with Saskatchewan Work Experience',
        description: 'For individuals who are already working in Saskatchewan with valid work permits.',
        url: 'https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program/browse-sinp-programs/applicants-with-saskatchewan-experience'
      },
      {
        name: 'Entrepreneur',
        description: 'For business people who want to invest in and actively manage a business in Saskatchewan.',
        url: 'https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program/browse-sinp-programs/entrepreneur'
      },
      {
        name: 'Farm Owner and Operator',
        description: 'For experienced farm owners and operators who plan to purchase and operate a farm in Saskatchewan.',
        url: 'https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program/browse-sinp-programs/farm-owner-and-operator'
      }
    ]
  },
  {
    id: 'nova-scotia',
    name: 'Nova Scotia',
    description: 'Discover diverse opportunities in Canada\'s ocean playground through various streams including Express Entry, Labour Market Priorities, and Entrepreneur pathways.',
    image: 'https://images.unsplash.com/photo-1509515837298-2c67a3933321?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1494948141550-221698c089c2?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Skilled Worker',
        description: 'For skilled workers who want to live and work permanently in Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Occupations in Demand',
        description: 'For workers with experience in specific in-demand occupations in Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Critical Construction Worker Pilot',
        description: 'For workers in critical construction occupations needed in Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'International Graduates in Demand',
        description: 'For international graduates in specific high-demand occupations.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'International Graduate Entrepreneur',
        description: 'For international graduates who want to start or buy a business in Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Entrepreneur',
        description: 'For experienced business owners who want to establish a business in Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Physician',
        description: 'For physicians who want to practice medicine in Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Labour Market Priorities for Physicians',
        description: 'For physicians who meet Nova Scotia\'s specific labor market needs.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Labour Market Priorities',
        description: 'For candidates who meet Nova Scotia\'s specific labor market needs.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Experience: Express Entry',
        description: 'For Express Entry candidates with experience working in Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      },
      {
        name: 'Healthcare Professionals Immigration Pilot',
        description: 'For healthcare professionals who have received a Letter of Interest from Nova Scotia.',
        url: 'https://liveinnovascotia.com/nova-scotia-nominee-program#tab-0'
      }
    ]
  },
  {
    id: 'newfoundland-and-labrador',
    name: 'Newfoundland and Labrador',
    description: 'Discover opportunities in Canada\'s easternmost province through various immigration streams for skilled workers, entrepreneurs, and international graduates.',
    image: 'https://images.unsplash.com/photo-1508693926297-1d61ee3df82a?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'Newfoundland and Labrador Provincial Nominee Program',
        description: 'For temporary foreign workers and international graduates.',
        url: 'https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/'
      },
      {
        name: 'Express Entry Skilled Worker',
        description: 'For skilled workers in the Express Entry pool who have a job offer from a Newfoundland and Labrador employer.',
        url: 'https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/applicants/express-entry-skilled-worker/'
      },
      {
        name: 'Skilled Worker Category',
        description: 'For skilled workers who have a job offer from a Newfoundland and Labrador employer but are not in the Express Entry pool.',
        url: 'https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/applicants/skilled-worker/'
      },
      {
        name: 'International Graduate Category',
        description: 'For international graduates from eligible Canadian institutions who have a job offer from a Newfoundland and Labrador employer.',
        url: 'https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/applicants/international-graduate/'
      },
      {
        name: 'International Entrepreneur Category',
        description: 'For experienced business owners or senior managers who want to establish, join, or take over a business in Newfoundland and Labrador.',
        url: 'https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/entrepreneurs/international-entrepreneur/eligibility-criteria/'
      },
      {
        name: 'International Graduate Entrepreneur Category',
        description: 'For international graduates who have completed a program at Memorial University or College of the North Atlantic and want to establish a business in Newfoundland and Labrador.',
        url: 'https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/entrepreneurs/international-graduate-entrepreneur/eligibility-criteria/'
      }
    ]
  },
  {
    id: 'prince-edward-island',
    name: 'Prince Edward Island',
    description: 'Discover opportunities in Canada\'s smallest province through various streams under the Prince Edward Island Provincial Nominee Program (PE PNP).',
    image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=2000',
    darkImage: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=2000',
    pathways: [
      {
        name: 'PEI PNP Eligibility Tool',
        description: 'Use our program selector to find out which PEI provincial programs you may be eligible for. This tool is based on current program criteria for PEI provincial programs only.',
        url: 'https://gov.questionpro.ca/a/TakeSurvey?tt=W1mdx79xPENBnoZ3imjk0Q%3D%3D'
      },
      {
        name: 'Critical Workers',
        description: 'PEI Provincial immigration pathways are dependent upon federal immigration allocations, application volumes, and provincial labour market needs. The PEI Office of Immigration is currently selecting and prioritizing skilled workers in higher demand.',
        url: 'https://www.princeedwardisland.ca/en/information/office-of-immigration/critical-workers'
      },
      {
        name: 'Intermediate Experience Stream',
        description: 'PEI Provincial immigration pathways are dependent upon federal immigration allocations, application volumes, and provincial labour market needs. The PEI Office of Immigration is currently selecting and prioritizing skilled workers in higher demand.',
        url: 'https://www.princeedwardisland.ca/en/information/office-of-immigration/intermediate-experience-stream'
      },
      {
        name: 'International Graduates',
        description: 'PEI Provincial immigration pathways are dependent upon federal immigration allocations, application volumes, and provincial labour market needs. The PEI Office of Immigration is currently selecting and prioritizing skilled workers in higher demand.',
        url: 'https://www.princeedwardisland.ca/en/information/office-of-immigration/international-graduates'
      },
      {
        name: 'Occupations in Demand',
        description: 'PEI Provincial immigration pathways are dependent upon federal immigration allocations, application volumes, and provincial labour market needs. The PEI Office of Immigration is currently selecting and prioritizing skilled workers in higher demand.',
        url: 'https://www.princeedwardisland.ca/en/information/office-of-immigration/occupations-in-demand'
      },
      {
        name: 'PEI Express Entry',
        description: 'PEI Provincial immigration pathways are dependent upon federal immigration allocations, application volumes, and provincial labour market needs. The PEI Office of Immigration is currently selecting and prioritizing skilled workers in higher demand.',
        url: 'https://www.princeedwardisland.ca/en/information/office-of-immigration/pei-express-entry'
      },
      {
        name: 'Skilled Workers in PEI',
        description: 'PEI Provincial immigration pathways are dependent upon federal immigration allocations, application volumes, and provincial labour market needs. The PEI Office of Immigration is currently selecting and prioritizing skilled workers in higher demand.',
        url: 'https://www.princeedwardisland.ca/en/information/office-of-immigration/skilled-workers-in-pei'
      },
      {
        name: 'Skilled Workers Outside Canada',
        description: 'PEI Provincial immigration pathways are dependent upon federal immigration allocations, application volumes, and provincial labour market needs. The PEI Office of Immigration is currently selecting and prioritizing skilled workers in higher demand.',
        url: 'https://www.princeedwardisland.ca/en/information/office-of-immigration/skilled-workers-outside-canada'
      }
    ]
  }
];

export default provinces;

export { provinces }