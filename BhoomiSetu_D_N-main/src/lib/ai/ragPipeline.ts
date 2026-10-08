import { retrieveKnowledge } from './retriever';
import { callGeminiRAG, generateLocalRAGAnswer, hasGeminiApiKey } from './geminiClient';
import type { RAGResponse, CitedSource } from './types';

export async function answerQuestionWithRAG(
  query: string,
  topK = 4
): Promise<RAGResponse> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return {
      answer: 'Please enter a question to query the BhoomiSetu knowledge base.',
      sources: [],
      modelUsed: 'None',
      isLiveAI: false,
      retrievedChunks: [],
    };
  }

  // 1. Retrieve most relevant static chunks
  const retrievedChunks = retrieveKnowledge(cleanQuery, topK);

  // 2. Map cited sources for UI badges and links
  const sources: CitedSource[] = retrievedChunks.map((res) => ({
    id: res.chunk.id,
    title: res.chunk.title,
    category: res.chunk.category,
    route: res.chunk.metadata.route as string | undefined,
    score: Math.round(res.score * 10) / 10,
  }));

  // 3. Try Gemini API generation if key is present; otherwise gracefully fallback
  if (hasGeminiApiKey()) {
    try {
      const { text, model } = await callGeminiRAG(cleanQuery, retrievedChunks);
      return {
        answer: text,
        sources,
        modelUsed: model,
        isLiveAI: true,
        retrievedChunks,
      };
    } catch (err: unknown) {
      console.warn('Gemini API call failed or encountered error, using fallback:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      // If error is invalid API key or quota, explain clearly to the user
      const fallback = generateLocalRAGAnswer(cleanQuery, retrievedChunks);
      return {
        answer: `${fallback.text}\n\n⚠️ *(Note: Live Gemini call encountered an issue: "${errorMessage}". Please check your API key in Settings.)*`,
        sources,
        modelUsed: 'Local Fallback (API Error)',
        isLiveAI: false,
        retrievedChunks,
      };
    }
  }

  // 4. No API key provided: use intelligent local retrieval synthesizer
  const localResult = generateLocalRAGAnswer(cleanQuery, retrievedChunks);
  return {
    answer: localResult.text,
    sources,
    modelUsed: localResult.model,
    isLiveAI: false,
    retrievedChunks,
  };
}
