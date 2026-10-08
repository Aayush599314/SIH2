import type { RetrievalResult } from './types';

const STORAGE_KEY = 'bhoomisetu_gemini_api_key';
const MODEL_STORAGE_KEY = 'bhoomisetu_gemini_model';

export const DEFAULT_MODEL = 'gemini-2.5-flash';

export const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Fast & Recommended)' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro (Deep Reasoning)' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
];

export function getGeminiApiKey(): string {
  // 1. Check runtime localStorage
  const savedKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (savedKey && savedKey.trim().length > 0) {
    return savedKey.trim();
  }
  // 2. Check Vite environment variable
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0 && envKey !== 'your_gemini_api_key_here') {
    return envKey.trim();
  }
  return '';
}

export function setGeminiApiKey(key: string) {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

export function getSelectedModel(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(MODEL_STORAGE_KEY);
    // Automatically migrate older 1.5 models or unknown models to 2.5
    if (saved && (saved.includes('1.5') || !AVAILABLE_MODELS.some((m) => m.id === saved))) {
      localStorage.setItem(MODEL_STORAGE_KEY, DEFAULT_MODEL);
      return DEFAULT_MODEL;
    }
    return saved || DEFAULT_MODEL;
  }
  return DEFAULT_MODEL;
}

export function setSelectedModel(model: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MODEL_STORAGE_KEY, model);
  }
}

export function hasGeminiApiKey(): boolean {
  return getGeminiApiKey().length > 0;
}

const SYSTEM_PROMPT = `
You are BhoomiSetu's AI Evidence Assistant, an expert AI for Indian Land Governance, Rural Development, Land Records Digitization, Forest Rights Act (FRA), and Agrarian Policy.
Your role is to provide accurate, grounded answers strictly based on the provided Reference Documents (Static Knowledge Base).

Instructions:
1. Grounding: Rely strictly on the information provided in the Reference Documents. Do not invent facts, statistics, or state laws that conflict with or are absent from the context.
2. Citations: Explicitly mention the document or study names (e.g., "[Research: Impact of Digital Land Records...]", "[Dataset: District-Level Land Use...]", or "[Policy: Digital Land Dispute Resolution...]") whenever referencing data or empirical claims.
3. Structure: Provide well-formatted, professional responses using clean markdown (bullet points, bold highlights, concise paragraphs).
4. Honesty & Scope: If the provided reference documents do not have sufficient information to answer a question, clearly explain what is covered in the platform and suggest related topics available on BhoomiSetu.
`.trim();

/**
 * Calls the Gemini API with Grounded Context (RAG).
 */
export async function callGeminiRAG(
  query: string,
  retrievedContext: RetrievalResult[]
): Promise<{ text: string; model: string }> {
  const apiKey = getGeminiApiKey();
  const model = getSelectedModel();

  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  // Format context blocks
  const formattedContext = retrievedContext
    .map((res, idx) => {
      const c = res.chunk;
      return `--- REFERENCE DOCUMENT #${idx + 1} ---
Title: ${c.title}
Category: ${c.category}
Source/Institution: ${c.metadata.source || 'BhoomiSetu'}
Year: ${c.metadata.year || 'N/A'}
Location/Scope: ${c.metadata.location || 'India'}
Content:
${c.content}
----------------------------------------`;
    })
    .join('\n\n');

  const userPrompt = `
Here are the relevant reference documents retrieved from the BhoomiSetu static data repository:

${formattedContext}

--- USER QUESTION ---
${query}

Please formulate a helpful, well-structured, evidence-backed answer to the question above based on the reference documents. Make sure to cite the specific documents where appropriate.
`.trim();

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.2,
      topP: 0.8,
      maxOutputTokens: 1024,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `Gemini API error: ${response.status} ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorBody);
      if (parsed.error && parsed.error.message) {
        errorMessage = parsed.error.message;
      }
    } catch {
      // ignore json parse error
    }

    // If requested model was not found and wasn't gemini-2.5-flash, attempt retry with gemini-2.5-flash
    if ((response.status === 404 || errorMessage.toLowerCase().includes('not found')) && model !== DEFAULT_MODEL) {
      console.warn(`Model ${model} not available, retrying with default ${DEFAULT_MODEL}...`);
      setSelectedModel(DEFAULT_MODEL);
      const retryEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${apiKey}`;
      const retryResponse = await fetch(retryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (retryResponse.ok) {
        const retryData = await retryResponse.json();
        const retryText = retryData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (retryText) {
          return { text: retryText, model: DEFAULT_MODEL };
        }
      }
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No answer generated by Gemini API.');
  }

  return { text, model };
}

/**
 * Fallback local synthesizer when no API key is provided yet.
 * Summarizes the retrieved chunks locally so the user always receives a grounded answer.
 */
export function generateLocalRAGAnswer(
  query: string,
  retrievedContext: RetrievalResult[]
): { text: string; model: string } {
  if (retrievedContext.length === 0) {
    return {
      text: 'No matching records found in the BhoomiSetu static repository for your query. Try searching for "land governance", "digitization", "FRA tribal claims", or "women land ownership".',
      model: 'Local Fallback',
    };
  }

  const chunks = retrievedContext.map((r) => r.chunk);
  const primary = chunks[0];

  const citationsList = chunks
    .map((c) => `- **${c.title}** (${c.category}${c.metadata.source ? ` · ${c.metadata.source}` : ''})`)
    .join('\n');

  const text = `
Based on **${chunks.length} static reference documents** retrieved from BhoomiSetu for **"${query}"**:

**Key Findings:**
${primary.content.split('\n').filter((l) => l.trim().length > 0).slice(0, 4).join('\n\n')}

${
  chunks.length > 1
    ? `**Additional Evidence Highlights:**\n${chunks
        .slice(1)
        .map((c) => `• **${c.title}**: ${c.content.slice(0, 160)}...`)
        .join('\n\n')}`
    : ''
}

---
*(ℹ️ **Notice**: This response was generated via local semantic retrieval. To enable live generative answers with Google Gemini, add your Gemini API Key in the AI Assistant settings.)*
`.trim();

  return { text, model: 'Local Retrieval Engine' };
}
