import type {
  Research,
  Dataset,
  PolicyInnovation,
  CaseStudy,
  KnowledgeItem,
  StateData,
  EvidenceNode,
} from './types';

export const researchData: Research[] = [
  {
    id: 'r1',
    title: 'Impact of Digital Land Records on Tenant Farmer Security in Central India',
    authors: ['Dr. Anjali Deshmukh', 'Prof. Rajesh Kumar'],
    institution: 'National Institute of Rural Development',
    year: 2024,
    domain: 'Land Governance',
    region: 'Central India',
    abstract:
      'This study examines how the digitization of land records under the DILRMP programme has affected tenure security among tenant farmers in Madhya Pradesh and Chhattisgarh. Using mixed-methods across 240 villages, we find that digital record access reduced dispute resolution time by 38% but did not significantly improve tenant formalization.',
    tags: ['digitization', 'tenure security', 'DILRMP', 'tenant farmers'],
    relatedDatasetIds: ['d1', 'd2'],
    relatedPolicyIds: ['p1'],
  },
  {
    id: 'r2',
    title: 'Women\'s Land Ownership and Household Economic Outcomes: Evidence from 12 States',
    authors: ['Dr. Meera Nair', 'Dr. Sunil Bhat'],
    institution: 'Indian Council for Research on International Economic Relations',
    year: 2023,
    domain: 'Gender & Land',
    region: 'All India',
    abstract:
      'Analysing 18,000 household records across 12 states, this paper finds that women-owned land parcels correlate with a 22% increase in household investment in education and a 15% rise in agricultural productivity. The study recommends mandatory joint titling in all state land allocation schemes.',
    tags: ['gender', 'land ownership', 'economic outcomes', 'joint titling'],
    relatedDatasetIds: ['d3'],
    relatedPolicyIds: ['p2'],
  },
  {
    id: 'r3',
    title: 'Tribal Land Alienation and Forest Rights Act Implementation in Scheduled Areas',
    authors: ['Dr. Vikram Salam', 'Dr. Priya Sundaresan'],
    institution: 'Tata Institute of Social Sciences',
    year: 2024,
    domain: 'Tribal Land Rights',
    region: 'Eastern India',
    abstract:
      'A comprehensive assessment of FRA 2006 implementation across Jharkhand, Odisha, and Chhattisgarh. The study finds that 41% of eligible community forest rights claims remain unresolved after 5+ years. GIS mapping reveals systematic gaps in claim processing in remote tribal belts.',
    tags: ['FRA', 'tribal rights', 'forest land', 'community claims'],
    relatedDatasetIds: ['d2', 'd4'],
    relatedPolicyIds: ['p3'],
  },
  {
    id: 'r4',
    title: 'Land Use Change and Agricultural Productivity: A District-Level Analysis (2010-2023)',
    authors: ['Prof. Arun Sharma', 'Dr. Lakshmi Iyer'],
    institution: 'Centre for Policy Research',
    year: 2023,
    domain: 'Land Use',
    region: 'All India',
    abstract:
      'Using satellite-derived land use data across 640 districts, this paper tracks conversion of agricultural land to non-agricultural uses. The findings show a 7.3% net loss of cultivable land per decade in peri-urban districts, with significant implications for food security projections.',
    tags: ['land use change', 'agriculture', 'urbanisation', 'food security'],
    relatedDatasetIds: ['d1'],
    relatedPolicyIds: ['p4'],
  },
  {
    id: 'r5',
    title: 'Land Dispute Resolution through Gram Nyayalayas: Efficiency and Equity Analysis',
    authors: ['Dr. Sanjay Agnihotri'],
    institution: 'National Law University',
    year: 2022,
    domain: 'Land Disputes',
    region: 'Northern India',
    abstract:
      'This research evaluates the performance of Gram Nyayalayas in resolving land disputes across Rajasthan and Uttar Pradesh. Findings indicate that cases resolved through village courts cost 85% less and resolved 3x faster than district courts, but face challenges in enforcement of judgments.',
    tags: ['dispute resolution', 'gram nyayalaya', 'access to justice'],
    relatedDatasetIds: ['d5'],
    relatedPolicyIds: ['p1'],
  },
  {
    id: 'r6',
    title: 'Climate Resilience and Land Governance: Evidence from Drought-Prone Regions',
    authors: ['Dr. Kavita Reddy', 'Prof. Mohammad Ali'],
    institution: 'Indian Institute of Technology, Madras',
    year: 2024,
    domain: 'Climate & Land',
    region: 'Southern India',
    abstract:
      'Investigating the intersection of climate adaptation and land governance in drought-prone districts of Karnataka and Telangana. The study finds that secure land tenure increases adoption of climate-resilient agricultural practices by 47%, highlighting the importance of land rights in climate adaptation strategies.',
    tags: ['climate resilience', 'drought', 'tenure security', 'adaptation'],
    relatedDatasetIds: ['d3', 'd4'],
    relatedPolicyIds: ['p4'],
  },
];

export const datasetsData: Dataset[] = [
  {
    id: 'd1',
    title: 'District-Level Land Use Statistics (2010-2023)',
    source: 'Ministry of Agriculture & Farmers Welfare',
    year: 2024,
    category: 'Land Use',
    geography: 'All India (640 districts)',
    format: 'CSV / GeoJSON',
    size: '42 MB',
    description:
      'Comprehensive dataset tracking land use patterns across all districts in India from 2010 to 2023. Includes categories for agricultural, forest, built-up, wasteland, and water bodies with annual temporal resolution.',
    variables: ['district_code', 'land_use_category', 'area_hectares', 'year', 'change_pct'],
    relatedResearchIds: ['r4', 'r1'],
  },
  {
    id: 'd2',
    title: 'Forest Rights Act Claims Registry — Scheduled Areas',
    source: 'Ministry of Tribal Affairs',
    year: 2024,
    category: 'Tribal Land',
    geography: '8 States (Scheduled Areas)',
    format: 'CSV',
    size: '18 MB',
    description:
      'Registry of community and individual forest rights claims filed and processed under the Forest Rights Act 2006. Includes claim status, area claimed, area granted, and processing timelines.',
    variables: ['claim_id', 'state', 'district', 'claim_type', 'status', 'area_hectares', 'date_filed', 'date_resolved'],
    relatedResearchIds: ['r3', 'r1'],
  },
  {
    id: 'd3',
    title: 'Household Land Ownership & Gender Disaggregation Survey',
    source: 'National Sample Survey Office',
    year: 2023,
    category: 'Gender & Land',
    geography: 'All India (12 states)',
    format: 'CSV / Stata',
    size: '65 MB',
    description:
      'Large-scale household survey capturing land ownership patterns with gender disaggregation. Covers 18,000 households across 12 states, including parcel size, ownership type, and economic indicators.',
    variables: ['household_id', 'state', 'owner_gender', 'parcel_size', 'ownership_type', 'income', 'education_spending'],
    relatedResearchIds: ['r2', 'r6'],
  },
  {
    id: 'd4',
    title: 'Climate Vulnerability Index — Agricultural Districts',
    source: 'Indian Council of Agricultural Research',
    year: 2024,
    category: 'Climate',
    geography: '100 drought-prone districts',
    format: 'CSV / GeoTIFF',
    size: '28 MB',
    description:
      'Multi-dimensional vulnerability index for agricultural districts prone to drought. Integrates rainfall variability, soil moisture, groundwater depletion, and socio-economic adaptive capacity indicators.',
    variables: ['district_code', 'vulnerability_score', 'rainfall_variability', 'groundwater_index', 'adaptive_capacity'],
    relatedResearchIds: ['r6', 'r3'],
  },
  {
    id: 'd5',
    title: 'Land Dispute Case Registry — Gram Nyayalaya & District Courts',
    source: 'Department of Justice',
    year: 2022,
    category: 'Land Disputes',
    geography: 'Rajasthan & Uttar Pradesh',
    format: 'CSV',
    size: '12 MB',
    description:
      'Case-level data from Gram Nyayalayas and district courts covering land dispute filings, resolution timelines, costs, and outcomes. Includes 4,200 cases with judgment enforcement tracking.',
    variables: ['case_id', 'court_type', 'filing_date', 'resolution_date', 'cost_inr', 'outcome', 'enforcement_status'],
    relatedResearchIds: ['r5'],
  },
];

export const policyData: PolicyInnovation[] = [
  {
    id: 'p1',
    title: 'Digital Land Dispute Resolution at Village Level (Prototype)',
    problem:
      'Land dispute cases in district courts take 3-7 years on average, with high costs that exclude marginal farmers from accessing justice.',
    solution:
      'Establish a digital dispute resolution framework using Gram Nyayalayas with online evidence submission, digital land record verification, and time-bound resolution within 90 days.',
    targetArea: 'Madhya Pradesh, Rajasthan, Uttar Pradesh',
    expectedImpact:
      'Reduce average dispute resolution time from 4 years to 6 months, decrease costs by 80%, and improve access for 2.3 million pending cases.',
    stage: 'Pilot',
    relatedResearchIds: ['r1', 'r5'],
    relatedDatasetIds: ['d5'],
  },
  {
    id: 'p2',
    title: 'Mandatory Joint Titling for State-Allocated Land (Prototype)',
    problem:
      'Only 14% of agricultural land in India is owned by women, despite constitutional provisions. State land allocation schemes rarely include joint titling provisions.',
    solution:
      'Mandate joint titling (husband and wife) in all state land allocation, redistribution, and regularization schemes. Create a verification mechanism through digital land records.',
    targetArea: '12 states (national rollout)',
    expectedImpact:
      'Increase women\'s land ownership from 14% to 40% within 5 years, improve household investment in education by 22%, and boost agricultural productivity by 15%.',
    stage: 'Proposed',
    relatedResearchIds: ['r2'],
    relatedDatasetIds: ['d3'],
  },
  {
    id: 'p3',
    title: 'Accelerated Forest Rights Claim Processing via GIS Verification (Prototype)',
    problem:
      '41% of eligible community forest rights claims remain unresolved after 5+ years due to bureaucratic delays and lack of verification infrastructure.',
    solution:
      'Deploy GIS-based verification using satellite imagery and community mapping to process pending FRA claims. Create a time-bound processing framework with 180-day deadlines and transparency portals.',
    targetArea: 'Jharkhand, Odisha, Chhattisgarh',
    expectedImpact:
      'Resolve 90% of pending community forest rights claims within 2 years, secure 1.5 million hectares of tribal land, and strengthen forest-dependent livelihoods.',
    stage: 'Evaluated',
    relatedResearchIds: ['r3'],
    relatedDatasetIds: ['d2'],
  },
  {
    id: 'p4',
    title: 'Agricultural Land Protection Zones in Peri-Urban Districts (Prototype)',
    problem:
      'Peri-urban districts are losing 7.3% of cultivable land per decade to non-agricultural conversion, threatening food security and farmer livelihoods.',
    solution:
      'Designate Agricultural Land Protection Zones in peri-urban districts with restrictions on non-agricultural conversion. Integrate with master planning and provide compensation mechanisms for affected landowners.',
    targetArea: '100 peri-urban districts nationwide',
    expectedImpact:
      'Protect 2.8 million hectares of cultivable land, maintain food security projections, and create structured compensation pathways for 500,000 farmers.',
    stage: 'Proposed',
    relatedResearchIds: ['r4', 'r6'],
    relatedDatasetIds: ['d1', 'd4'],
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'c1',
    title: 'Bhoomi Project: Digitising Land Records in Karnataka',
    location: 'Karnataka, India',
    problem:
      'Manual land records led to corruption, delays in mutation, and disputes affecting 15 million landowners. Citizens had no transparent access to their land records.',
    intervention:
      'The Bhoomi project digitised 20 million land records across all 30 districts, creating online access through kiosks and later via a web portal. Mutations are processed digitally with biometric authentication.',
    evidence:
      'Research showed mutation processing time reduced from 45 days to 7 days. Corruption at the patwari level dropped by 73%. Over 90% of landowners accessed their records digitally within 2 years of launch.',
    outcome:
      'Karnataka became the first state with fully digitised land records. The model was replicated by 8 states under DILRMP. An estimated ₹500 crore in citizen time and corruption costs was saved.',
    lessons:
      'Digital land records work best when paired with legal backing for digital records. Last-mile access through kiosks is critical for rural adoption. Biometric authentication prevents fraudulent mutations.',
    year: 2022,
  },
  {
    id: 'c2',
    title: 'Community Forest Rights in Gadchiroli',
    location: 'Gadchiroli, Maharashtra',
    problem:
      'Tribal communities in Gadchiroli faced eviction from ancestral forest land. Without formal recognition, they could not access government schemes or protect forests from encroachment.',
    intervention:
      'A collaborative effort between district administration, civil society organisations, and gram sabhas to process community forest rights claims under FRA 2006. GIS mapping was used to verify claims.',
    evidence:
      'Over 336 villages received community forest rights titles covering 1.2 million hectares. Research documented a 62% increase in forest-based income and a 40% reduction in illegal logging.',
    outcome:
      'Gadchiroli became the district with the highest FRA coverage in India. Community-managed forests showed improved biodiversity indicators. The model influenced FRA implementation guidelines nationally.',
    lessons:
      'Gram sabha-led claim filing is more effective than top-down approaches. GIS verification accelerates processing. Community forest management creates stronger conservation incentives than state policing.',
    year: 2023,
  },
  {
    id: 'c3',
    title: 'Joint Pattadar Passbooks: Women\'s Land Rights in Telangana',
    location: 'Telangana, India',
    problem:
      'Women in Telangana held only 11% of agricultural land. Even when families allocated land to women, the absence of formal titles meant they could not access credit or government schemes.',
    intervention:
      'Telangana introduced mandatory joint pattadar passbooks (land ownership documents) listing both spouses. The reform was integrated with the state\'s land records digitisation programme.',
    evidence:
      'Research showed women\'s documented land ownership rose from 11% to 28% within 3 years. Households with joint titles showed 18% higher education spending and 12% higher agricultural investment.',
    outcome:
      'Over 1.2 million joint passbooks were issued. Telangana\'s model was cited in national policy recommendations for joint titling. Agricultural credit access for women improved by 35%.',
    lessons:
      'Political commitment at the highest level is essential for gender-responsive land reform. Integration with existing digitisation programmes reduces implementation costs. Financial literacy training amplifies the impact of land titles.',
    year: 2023,
  },
];

export const knowledgeData: KnowledgeItem[] = [
  {
    id: 'k1',
    title: 'National Land Governance Framework — Comprehensive Report 2024',
    type: 'Report',
    source: 'Ministry of Rural Development',
    year: 2024,
    summary:
      'A comprehensive assessment of land governance across India, covering digitization progress, dispute resolution mechanisms, gender equity, and tribal land rights. Includes state-by-state rankings and policy recommendations.',
  },
  {
    id: 'k2',
    title: 'Policy Brief: Accelerating Digital Land Records Under DILRMP',
    type: 'Policy Brief',
    source: 'NITI Aayog',
    year: 2024,
    summary:
      'Examines the progress of the Digital India Land Records Modernization Programme and recommends pathways for states lagging in implementation. Highlights the role of interoperable systems.',
  },
  {
    id: 'k3',
    title: 'Guidelines for Community Forest Rights Claim Processing',
    type: 'Guideline',
    source: 'Ministry of Tribal Affairs',
    year: 2023,
    summary:
      'Operational guidelines for district-level officials and gram sabhas for filing, verifying, and processing community forest rights claims under FRA 2006. Includes templates and timelines.',
  },
  {
    id: 'k4',
    title: 'FAQ: Understanding Your Land Rights as a Citizen',
    type: 'FAQ',
    source: 'BhoomiSetu Platform',
    year: 2024,
    summary:
      'Plain-language answers to common questions about land records, mutation processes, dispute resolution, and how to access digital land records in your state.',
  },
  {
    id: 'k5',
    title: 'Research Compendium: Land and Climate Resilience in India',
    type: 'Report',
    source: 'ICAR & IIT Madras',
    year: 2024,
    summary:
      'A compendium of 14 research papers examining the intersection of land governance and climate adaptation. Covers drought-prone regions, coastal zones, and peri-urban land conversion.',
  },
  {
    id: 'k6',
    title: 'Policy Brief: Gender-Responsive Land Reform Pathways',
    type: 'Policy Brief',
    source: 'UN Women & Ministry of Rural Development',
    year: 2023,
    summary:
      'Analyses the gap between constitutional provisions for women\'s land rights and on-ground reality. Recommends joint titling mandates, inheritance law enforcement, and credit linkages.',
  },
  {
    id: 'k7',
    title: 'Guidelines for Digital Land Dispute Resolution Systems',
    type: 'Guideline',
    source: 'Department of Justice',
    year: 2023,
    summary:
      'Technical and procedural guidelines for states implementing digital dispute resolution at the Gram Nyayalaya level. Covers evidence submission, case management, and enforcement mechanisms.',
  },
  {
    id: 'k8',
    title: 'FAQ: Forest Rights Act — Community and Individual Claims',
    type: 'FAQ',
    source: 'BhoomiSetu Platform',
    year: 2024,
    summary:
      'Frequently asked questions about the Forest Rights Act 2006, covering eligibility, claim types, filing procedures, and common challenges in implementation.',
  },
];

export const stateData: StateData[] = [
  {
    id: 's1',
    name: 'Maharashtra',
    districts: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Amravati', 'Kolhapur', 'Solapur'],
    indicators: {
      landlessHouseholds: 18.4,
      landRecordDigitized: 89,
      disputeCases: 12400,
      avgLandholding: 1.4,
      womenLandOwnership: 16,
      tribalLandClaims: 3400,
    },
    trend: [
      { year: 2020, digitized: 62, disputes: 18000 },
      { year: 2021, digitized: 71, disputes: 16000 },
      { year: 2022, digitized: 78, disputes: 14500 },
      { year: 2023, digitized: 85, disputes: 13200 },
      { year: 2024, digitized: 89, disputes: 12400 },
    ],
  },
  {
    id: 's2',
    name: 'Madhya Pradesh',
    districts: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Chhindwara'],
    indicators: {
      landlessHouseholds: 22.1,
      landRecordDigitized: 76,
      disputeCases: 8900,
      avgLandholding: 2.1,
      womenLandOwnership: 12,
      tribalLandClaims: 5200,
    },
    trend: [
      { year: 2020, digitized: 45, disputes: 12000 },
      { year: 2021, digitized: 55, disputes: 11000 },
      { year: 2022, digitized: 64, disputes: 9800 },
      { year: 2023, digitized: 71, disputes: 9200 },
      { year: 2024, digitized: 76, disputes: 8900 },
    ],
  },
  {
    id: 's3',
    name: 'Karnataka',
    districts: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi', 'Gulbarga', 'Dharwad', 'Kalaburagi'],
    indicators: {
      landlessHouseholds: 15.2,
      landRecordDigitized: 94,
      disputeCases: 5600,
      avgLandholding: 1.8,
      womenLandOwnership: 28,
      tribalLandClaims: 1100,
    },
    trend: [
      { year: 2020, digitized: 82, disputes: 8200 },
      { year: 2021, digitized: 87, disputes: 7100 },
      { year: 2022, digitized: 90, disputes: 6500 },
      { year: 2023, digitized: 92, disputes: 5900 },
      { year: 2024, digitized: 94, disputes: 5600 },
    ],
  },
  {
    id: 's4',
    name: 'Rajasthan',
    districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bharatpur'],
    indicators: {
      landlessHouseholds: 24.8,
      landRecordDigitized: 68,
      disputeCases: 9700,
      avgLandholding: 2.8,
      womenLandOwnership: 9,
      tribalLandClaims: 2800,
    },
    trend: [
      { year: 2020, digitized: 38, disputes: 14000 },
      { year: 2021, digitized: 48, disputes: 12500 },
      { year: 2022, digitized: 56, disputes: 11200 },
      { year: 2023, digitized: 62, disputes: 10300 },
      { year: 2024, digitized: 68, disputes: 9700 },
    ],
  },
  {
    id: 's5',
    name: 'Uttar Pradesh',
    districts: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Allahabad', 'Gorakhpur', 'Bareilly'],
    indicators: {
      landlessHouseholds: 28.3,
      landRecordDigitized: 72,
      disputeCases: 18500,
      avgLandholding: 0.9,
      womenLandOwnership: 11,
      tribalLandClaims: 300,
    },
    trend: [
      { year: 2020, digitized: 40, disputes: 24000 },
      { year: 2021, digitized: 52, disputes: 22000 },
      { year: 2022, digitized: 61, disputes: 20500 },
      { year: 2023, digitized: 67, disputes: 19500 },
      { year: 2024, digitized: 72, disputes: 18500 },
    ],
  },
  {
    id: 's6',
    name: 'Telangana',
    districts: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nalgonda', 'Adilabad'],
    indicators: {
      landlessHouseholds: 19.6,
      landRecordDigitized: 85,
      disputeCases: 6200,
      avgLandholding: 1.5,
      womenLandOwnership: 28,
      tribalLandClaims: 2100,
    },
    trend: [
      { year: 2020, digitized: 60, disputes: 9000 },
      { year: 2021, digitized: 70, disputes: 7800 },
      { year: 2022, digitized: 78, disputes: 7000 },
      { year: 2023, digitized: 82, disputes: 6500 },
      { year: 2024, digitized: 85, disputes: 6200 },
    ],
  },
  {
    id: 's7',
    name: 'Jharkhand',
    districts: ['Ranchi', 'Dhanbad', 'Bokaro', 'Jamshedpur', 'Hazaribagh', 'Deoghar', 'Giridih', 'Dumka'],
    indicators: {
      landlessHouseholds: 26.2,
      landRecordDigitized: 54,
      disputeCases: 7300,
      avgLandholding: 1.7,
      womenLandOwnership: 8,
      tribalLandClaims: 6800,
    },
    trend: [
      { year: 2020, digitized: 28, disputes: 9500 },
      { year: 2021, digitized: 36, disputes: 8800 },
      { year: 2022, digitized: 43, disputes: 8200 },
      { year: 2023, digitized: 48, disputes: 7700 },
      { year: 2024, digitized: 54, disputes: 7300 },
    ],
  },
  {
    id: 's8',
    name: 'Odisha',
    districts: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Berhampur', 'Balasore', 'Puri', 'Koraput'],
    indicators: {
      landlessHouseholds: 23.5,
      landRecordDigitized: 63,
      disputeCases: 6800,
      avgLandholding: 1.6,
      womenLandOwnership: 14,
      tribalLandClaims: 8200,
    },
    trend: [
      { year: 2020, digitized: 35, disputes: 9200 },
      { year: 2021, digitized: 44, disputes: 8400 },
      { year: 2022, digitized: 52, disputes: 7800 },
      { year: 2023, digitized: 58, disputes: 7200 },
      { year: 2024, digitized: 63, disputes: 6800 },
    ],
  },
  {
    id: 's9',
    name: 'Chhattisgarh',
    districts: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Ambikapur'],
    indicators: {
      landlessHouseholds: 21.7,
      landRecordDigitized: 58,
      disputeCases: 5400,
      avgLandholding: 2.0,
      womenLandOwnership: 13,
      tribalLandClaims: 5600,
    },
    trend: [
      { year: 2020, digitized: 30, disputes: 7100 },
      { year: 2021, digitized: 39, disputes: 6500 },
      { year: 2022, digitized: 47, disputes: 6100 },
      { year: 2023, digitized: 53, disputes: 5700 },
      { year: 2024, digitized: 58, disputes: 5400 },
    ],
  },
  {
    id: 's10',
    name: 'West Bengal',
    districts: ['Kolkata', 'Howrah', 'Darjeeling', 'Siliguri', 'Asansol', 'Malda', 'Kharagpur', 'Bankura'],
    indicators: {
      landlessHouseholds: 20.9,
      landRecordDigitized: 81,
      disputeCases: 11200,
      avgLandholding: 0.8,
      womenLandOwnership: 18,
      tribalLandClaims: 900,
    },
    trend: [
      { year: 2020, digitized: 55, disputes: 16000 },
      { year: 2021, digitized: 65, disputes: 14500 },
      { year: 2022, digitized: 72, disputes: 13200 },
      { year: 2023, digitized: 77, disputes: 12000 },
      { year: 2024, digitized: 81, disputes: 11200 },
    ],
  },
  {
    id: 's11',
    name: 'Tamil Nadu',
    districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Erode'],
    indicators: {
      landlessHouseholds: 16.8,
      landRecordDigitized: 88,
      disputeCases: 7100,
      avgLandholding: 1.2,
      womenLandOwnership: 22,
      tribalLandClaims: 500,
    },
    trend: [
      { year: 2020, digitized: 70, disputes: 9800 },
      { year: 2021, digitized: 78, disputes: 8700 },
      { year: 2022, digitized: 83, disputes: 8000 },
      { year: 2023, digitized: 86, disputes: 7500 },
      { year: 2024, digitized: 88, disputes: 7100 },
    ],
  },
  {
    id: 's12',
    name: 'Bihar',
    districts: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Arrah', 'Begusarai'],
    indicators: {
      landlessHouseholds: 30.1,
      landRecordDigitized: 61,
      disputeCases: 14800,
      avgLandholding: 0.6,
      womenLandOwnership: 7,
      tribalLandClaims: 200,
    },
    trend: [
      { year: 2020, digitized: 32, disputes: 21000 },
      { year: 2021, digitized: 42, disputes: 19000 },
      { year: 2022, digitized: 50, disputes: 17500 },
      { year: 2023, digitized: 56, disputes: 16000 },
      { year: 2024, digitized: 61, disputes: 14800 },
    ],
  },
];

export const evidenceNodes: EvidenceNode[] = [
  {
    id: 'e1',
    label: 'Problem',
    type: 'problem',
    title: 'Land disputes take 3-7 years in district courts',
    description: 'Marginal farmers cannot access justice due to high costs and lengthy proceedings. 2.3 million cases pending.',
  },
  {
    id: 'e2',
    label: 'Research',
    type: 'research',
    title: 'Gram Nyayalaya Efficiency Study (2022)',
    description: 'Dr. Sanjay Agnihotri found village courts resolve cases 3x faster at 85% lower cost than district courts.',
  },
  {
    id: 'e3',
    label: 'Data',
    type: 'data',
    title: 'Land Dispute Case Registry — Rajasthan & UP',
    description: '4,200 cases tracked across Gram Nyayalayas and district courts with resolution timelines and costs.',
  },
  {
    id: 'e4',
    label: 'Evidence',
    type: 'evidence',
    title: 'Digital dispute resolution reduces time by 85%',
    description: 'Combined research and data confirm that digital evidence submission + Gram Nyayalayas resolve disputes in under 6 months.',
  },
  {
    id: 'e5',
    label: 'Policy',
    type: 'policy',
    title: 'Digital Land Dispute Resolution at Village Level',
    description: 'Policy proposal to establish digital dispute framework with 90-day resolution timelines (Prototype / Demonstration).',
  },
  {
    id: 'e6',
    label: 'Impact',
    type: 'impact',
    title: 'Potential: 2.3M cases resolved, 80% cost reduction',
    description: 'If implemented nationally, could resolve all pending cases within 3 years and save ₹4,200 crore in citizen costs.',
  },
];

export const aiResponses: Record<string, { answer: string; sources: string[]; relatedResearch: string[]; relatedDatasets: string[] }> = {
  'land governance': {
    answer:
      'Research on land governance in India spans multiple critical areas. The most recent studies focus on the impact of digital land records on tenant farmer security (Deshmukh & Kumar, 2024), women\'s land ownership patterns (Nair & Bhat, 2023), and tribal land alienation under the Forest Rights Act (Salam & Sundaresan, 2024). Key findings suggest that digitization has reduced dispute resolution times but has not fully addressed tenure formalization gaps.',
    sources: ['National Institute of Rural Development', 'ICRIER', 'TISS'],
    relatedResearch: ['r1', 'r2', 'r3'],
    relatedDatasets: ['d1', 'd2', 'd3'],
  },
  'rural development': {
    answer:
      'Several datasets on BhoomiSetu relate to rural development. The District-Level Land Use Statistics track agricultural land conversion across 640 districts. The Household Land Ownership Survey captures ownership patterns and economic indicators. The Climate Vulnerability Index covers 100 drought-prone districts with socio-economic adaptive capacity data. These datasets are critical for understanding rural land dynamics and designing evidence-based development policies.',
    sources: ['Ministry of Agriculture & Farmers Welfare', 'NSSO', 'ICAR'],
    relatedResearch: ['r4', 'r6'],
    relatedDatasets: ['d1', 'd3', 'd4'],
  },
  'evidence': {
    answer:
      'The Evidence Matrix on BhoomiSetu demonstrates the full chain from problem to impact. For land disputes, research by Agnihotri (2022) showed Gram Nyayalayas resolve cases 3x faster. Data from 4,200 cases confirms this finding. This evidence supports a policy innovation for digital dispute resolution at the village level, which could resolve 2.3 million pending cases and reduce costs by 80%.',
    sources: ['National Law University', 'Department of Justice'],
    relatedResearch: ['r5', 'r1'],
    relatedDatasets: ['d5'],
  },
  default: {
    answer:
      'BhoomiSetu connects research, data, and evidence to support better land governance policy. The platform hosts 6 peer-reviewed research papers, 5 government datasets, 4 policy innovations, and 3 detailed case studies. You can explore the Evidence Matrix to see how problems translate into policy solutions through the research-to-impact chain, or use the Land Insights map to view district-level indicators.',
    sources: ['BhoomiSetu Platform'],
    relatedResearch: ['r1', 'r2'],
    relatedDatasets: ['d1', 'd3'],
  },
};

export function getAIResponse(query: string) {
  const q = query.toLowerCase();
  if (q.includes('land governance') || q.includes('land rights') || q.includes('research about land')) {
    return aiResponses['land governance'];
  }
  if (q.includes('rural development') || q.includes('dataset') || q.includes('data related')) {
    return aiResponses['rural development'];
  }
  if (q.includes('evidence') || q.includes('explain') || q.includes('problem')) {
    return aiResponses['evidence'];
  }
  return aiResponses.default;
}

export const platformStats = [
  { label: 'Research Papers', value: '6', icon: 'FileText' },
  { label: 'Datasets', value: '5', icon: 'Database' },
  { label: 'Policy Innovations', value: '4', icon: 'Lightbulb' },
  { label: 'States Covered', value: '12', icon: 'Map' },
];
