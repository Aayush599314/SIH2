import { getAllKnowledgeChunks } from './knowledgeBase';
import type { KnowledgeChunk, RetrievalResult } from './types';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'what', 'who', 'how', 'why',
  'when', 'where', 'tell', 'me', 'about', 'can', 'you', 'give', 'show',
  'explain', 'does', 'do', 'i', 'we', 'they', 'them', 'their', 'this',
  'these', 'those', 'any', 'some', 'please',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Calculates a BM25/TF-IDF style relevance score for a chunk against user query tokens.
 */
function scoreChunk(chunk: KnowledgeChunk, query: string, queryTokens: string[]): { score: number; matchedTerms: string[] } {
  let score = 0;
  const matchedTermsSet = new Set<string>();
  const normalizedQuery = query.toLowerCase().trim();

  const titleLower = chunk.title.toLowerCase();
  const contentLower = chunk.content.toLowerCase();
  const tagsLower = chunk.tags.map((t) => t.toLowerCase());

  // 1. Exact phrase match bonus
  if (normalizedQuery.length > 5 && contentLower.includes(normalizedQuery)) {
    score += 15;
    matchedTermsSet.add(`"${query}"`);
  }
  if (normalizedQuery.length > 5 && titleLower.includes(normalizedQuery)) {
    score += 25;
  }

  // 2. Token matches
  const chunkWords = contentLower.split(/\s+/);
  const docLength = chunkWords.length || 1;
  const avgDocLength = 100;
  const lengthPenalty = 0.5 + 0.5 * (docLength / avgDocLength);

  for (const token of queryTokens) {
    let tokenScore = 0;

    // Title match (heavy weight)
    if (titleLower.includes(token)) {
      tokenScore += 8;
      matchedTermsSet.add(token);
    }

    // Tag match
    if (tagsLower.some((tag) => tag.includes(token))) {
      tokenScore += 5;
      matchedTermsSet.add(token);
    }

    // Content match frequency
    const occurrences = (contentLower.match(new RegExp(`\\b${token}`, 'g')) || []).length;
    if (occurrences > 0) {
      tokenScore += Math.min(occurrences * 1.5, 6);
      matchedTermsSet.add(token);
    }

    score += tokenScore;
  }

  // Normalize by length
  const finalScore = score / lengthPenalty;

  return {
    score: finalScore,
    matchedTerms: Array.from(matchedTermsSet),
  };
}

/**
 * Retrieves the most relevant knowledge chunks for a given query.
 */
export function retrieveKnowledge(query: string, topK = 4): RetrievalResult[] {
  const allChunks = getAllKnowledgeChunks();
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    // If query contains only stop words or greeting, return top 3 overview chunks
    return allChunks.slice(0, topK).map((chunk) => ({
      chunk,
      score: 1,
      matchedTerms: ['general overview'],
    }));
  }

  const scored: RetrievalResult[] = allChunks
    .map((chunk) => {
      const { score, matchedTerms } = scoreChunk(chunk, query, queryTokens);
      return { chunk, score, matchedTerms };
    })
    .filter((res) => res.score > 0)
    .sort((a, b) => b.score - a.score);

  // If matches were found, return the top K
  if (scored.length > 0) {
    return scored.slice(0, topK);
  }

  // Fallback if no exact keyword hit: return top overview documents
  return allChunks.slice(0, topK).map((chunk) => ({
    chunk,
    score: 0.1,
    matchedTerms: ['general context'],
  }));
}
