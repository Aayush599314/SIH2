export interface KnowledgeChunk {
  id: string;
  title: string;
  category: 'Research' | 'Dataset' | 'Policy' | 'Case Study' | 'Report / Guide' | 'Custom Knowledge';
  content: string;
  tags: string[];
  metadata: {
    source?: string;
    year?: number | string;
    route?: string;
    authors?: string[];
    location?: string;
    [key: string]: unknown;
  };
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
  matchedTerms: string[];
}

export interface CitedSource {
  id: string;
  title: string;
  category: string;
  route?: string;
  score?: number;
}

export interface RAGResponse {
  answer: string;
  sources: CitedSource[];
  modelUsed: string;
  isLiveAI: boolean;
  retrievedChunks: RetrievalResult[];
}

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: CitedSource[];
  retrievedChunks?: RetrievalResult[];
  modelUsed?: string;
  isLiveAI?: boolean;
}
