import {
  researchData,
  datasetsData,
  policyData,
  caseStudiesData,
  knowledgeData,
} from '../data';
import type { KnowledgeChunk } from './types';

/**
 * Custom static documents added by developers or users.
 * You can easily append your own custom data here!
 */
export const customStaticDocuments: KnowledgeChunk[] = [
  {
    id: 'custom-1',
    title: 'Digital India Land Records Modernization Programme (DILRMP) Overview',
    category: 'Custom Knowledge',
    tags: ['dilrmp', 'digitization', 'survey', 'cadastral', 'resurvey'],
    metadata: {
      source: 'Department of Land Resources (DoLR)',
      year: 2024,
      location: 'National',
    },
    content: `
The Digital India Land Records Modernization Programme (DILRMP) is a flagship central sector scheme aimed at modernizing management of land records, minimizing scope of land/property disputes, and enhancing transparency in the land records maintenance system.
Key pillars include:
1. Computerization of land records including Record of Rights (RoRs).
2. Digitization of cadastral maps and integration with textual records.
3. Modern resurveys using drone technology and high-resolution satellite imagery (HRSI).
4. Computerization of registration offices and integration between deed registration and land revenue offices.
5. Unique Land Parcel Identification Number (ULPIN), also known as 'Bhu-Aadhar', providing a 14-digit alphanumeric identification for every land parcel based on longitude and latitude coordinates.
    `.trim(),
  },
  {
    id: 'custom-2',
    title: 'SVAMITVA Scheme: Drone Survey and Property Cards in Rural Abadi',
    category: 'Custom Knowledge',
    tags: ['svamitva', 'drone', 'abadi', 'property cards', 'panchayat'],
    metadata: {
      source: 'Ministry of Panchayati Raj',
      year: 2023,
      location: 'Rural India',
    },
    content: `
SVAMITVA (Survey of Villages and Mapping with Improvised Technology in Village Areas) is a Central Sector Scheme launched by the Ministry of Panchayati Raj.
Key Objectives:
- Providing property rights to rural households in inhabited (Abadi) areas using drone surveys and CORS (Continuously Operating Reference Station) network technology.
- Issuing Property Cards / Title deeds (Sampatti Patrak) to village household owners, allowing them to monetize assets for bank loans.
- Reducing boundary disputes and enabling Gram Panchayats to carry out accurate property tax assessments and village-level spatial planning.
- Over 300,000 villages have been covered under drone survey flights, benefiting millions of rural homeowners.
    `.trim(),
  },
  {
    id: 'custom-3',
    title: 'Women Land Rights and Legal Precedents in Hindu Succession Act',
    category: 'Custom Knowledge',
    tags: ['succession', 'women rights', 'inheritance', 'coparcenary', 'hsa'],
    metadata: {
      source: 'Supreme Court of India (Vineeta Sharma v. Rakesh Sharma)',
      year: 2020,
      location: 'All India',
    },
    content: `
The landmark 2020 Supreme Court judgment in Vineeta Sharma v. Rakesh Sharma clarified that daughters have equal coparcenary rights in ancestral property under the amended Hindu Succession Act (2005) by birth.
Key legal tenets:
- The right is by birth and not dependent on whether the father was alive when the 2005 amendment took effect.
- Encourages states to institute joint titling of land and mandatory registration of wives in land allocation schemes.
- Research shows formal recognition of women's land rights directly boosts child nutrition, education expenditures, and household food security.
    `.trim(),
  },
];

// Runtime dynamic storage (in case users add notes via UI during a session)
let runtimeDocuments: KnowledgeChunk[] = [];

export function addRuntimeKnowledgeChunk(chunk: KnowledgeChunk) {
  runtimeDocuments.push(chunk);
}

export function clearRuntimeKnowledge() {
  runtimeDocuments = [];
}

/**
 * Converts all existing BhoomiSetu data and custom static data into a unified RAG corpus.
 */
export function getAllKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // 1. Research papers
  for (const r of researchData) {
    chunks.push({
      id: `research-${r.id}`,
      title: r.title,
      category: 'Research',
      tags: [...r.tags, r.domain.toLowerCase(), r.region.toLowerCase()],
      metadata: {
        source: r.institution,
        year: r.year,
        authors: r.authors,
        location: r.region,
        route: `/research/${r.id}`,
      },
      content: `Research Title: ${r.title}\nAuthors: ${r.authors.join(', ')}\nInstitution: ${r.institution}\nYear: ${r.year}\nDomain: ${r.domain}\nRegion: ${r.region}\nAbstract & Findings: ${r.abstract}\nKey Keywords: ${r.tags.join(', ')}`,
    });
  }

  // 2. Datasets
  for (const d of datasetsData) {
    chunks.push({
      id: `dataset-${d.id}`,
      title: d.title,
      category: 'Dataset',
      tags: [d.category.toLowerCase(), ...d.variables],
      metadata: {
        source: d.source,
        year: d.year,
        location: d.geography,
        route: `/data/${d.id}`,
      },
      content: `Dataset Title: ${d.title}\nSource: ${d.source}\nYear: ${d.year}\nCategory: ${d.category}\nCoverage: ${d.geography}\nFormat: ${d.format} (Size: ${d.size})\nDescription: ${d.description}\nAvailable Variables: ${d.variables.join(', ')}`,
    });
  }

  // 3. Policy Innovations
  for (const p of policyData) {
    chunks.push({
      id: `policy-${p.id}`,
      title: p.title,
      category: 'Policy',
      tags: ['policy', 'reform', p.stage.toLowerCase(), ...p.targetArea.toLowerCase().split(', ')],
      metadata: {
        source: 'BhoomiSetu Policy Innovation Lab',
        location: p.targetArea,
        route: `/policy`,
      },
      content: `Policy Proposal: ${p.title}\nStage: ${p.stage}\nTarget Area: ${p.targetArea}\nIdentified Problem: ${p.problem}\nProposed Solution: ${p.solution}\nExpected Impact: ${p.expectedImpact}`,
    });
  }

  // 4. Case Studies
  for (const c of caseStudiesData) {
    chunks.push({
      id: `casestudy-${c.id}`,
      title: c.title,
      category: 'Case Study',
      tags: ['case study', c.location.toLowerCase()],
      metadata: {
        source: 'Field Case Study',
        year: c.year,
        location: c.location,
        route: `/case-studies`,
      },
      content: `Case Study: ${c.title}\nLocation: ${c.location} (${c.year})\nContext/Problem: ${c.problem}\nIntervention: ${c.intervention}\nEmpirical Evidence: ${c.evidence}\nOutcomes: ${c.outcome}\nPolicy Lessons: ${c.lessons}`,
    });
  }

  // 5. Knowledge items / Guidelines / Reports
  for (const k of knowledgeData) {
    chunks.push({
      id: `knowledge-${k.id}`,
      title: k.title,
      category: 'Report / Guide',
      tags: [k.type.toLowerCase(), 'knowledge centre'],
      metadata: {
        source: k.source,
        year: k.year,
        route: `/knowledge`,
      },
      content: `Document: ${k.title}\nType: ${k.type}\nPublished by: ${k.source} (${k.year})\nSummary: ${k.summary}`,
    });
  }

  // 6. Custom static documents
  chunks.push(...customStaticDocuments);

  // 7. Runtime documents
  chunks.push(...runtimeDocuments);

  return chunks;
}
