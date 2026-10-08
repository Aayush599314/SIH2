export type UserRole = 'citizen' | 'researcher' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface Research {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  year: number;
  domain: string;
  region: string;
  abstract: string;
  tags: string[];
  relatedDatasetIds: string[];
  relatedPolicyIds: string[];
}

export interface Dataset {
  id: string;
  title: string;
  source: string;
  year: number;
  category: string;
  geography: string;
  format: string;
  size: string;
  description: string;
  variables: string[];
  relatedResearchIds: string[];
}

export interface PolicyInnovation {
  id: string;
  title: string;
  problem: string;
  solution: string;
  targetArea: string;
  expectedImpact: string;
  stage: 'Proposed' | 'Pilot' | 'Evaluated';
  relatedResearchIds: string[];
  relatedDatasetIds: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  problem: string;
  intervention: string;
  evidence: string;
  outcome: string;
  lessons: string;
  year: number;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  type: 'Report' | 'Policy Brief' | 'Guideline' | 'FAQ';
  source: string;
  year: number;
  summary: string;
}

export interface SavedResource {
  id: string;
  resource_id: string;
  resource_type: 'research' | 'dataset';
  title: string;
  created_at: string;
}

export interface StateData {
  id: string;
  name: string;
  districts: string[];
  indicators: {
    landlessHouseholds: number;
    landRecordDigitized: number;
    disputeCases: number;
    avgLandholding: number;
    womenLandOwnership: number;
    tribalLandClaims: number;
  };
  trend: { year: number; digitized: number; disputes: number }[];
}

export interface EvidenceNode {
  id: string;
  label: string;
  type: 'problem' | 'research' | 'data' | 'evidence' | 'policy' | 'impact';
  title: string;
  description: string;
}
