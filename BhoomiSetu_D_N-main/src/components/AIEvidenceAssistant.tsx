import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  FileText,
  Database as DbIcon,
  Settings,
  Key,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { answerQuestionWithRAG } from '@/lib/ai/ragPipeline';
import {
  getGeminiApiKey,
  setGeminiApiKey,
  getSelectedModel,
  setSelectedModel,
  AVAILABLE_MODELS,
  hasGeminiApiKey,
} from '@/lib/ai/geminiClient';
import type { CitedSource, RetrievalResult } from '@/lib/ai/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: CitedSource[];
  retrievedChunks?: RetrievalResult[];
  modelUsed?: string;
  isLiveAI?: boolean;
}

const suggestedQuestions = [
  'What does research say about women\'s land ownership?',
  'Explain DILRMP and Bhu-Aadhar (ULPIN)',
  'How does SVAMITVA use drone surveys in rural areas?',
  'What are the key findings on FRA tribal claims?',
  'Show datasets related to agricultural land use',
];

export default function AIEvidenceAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Namaste! I am the **BhoomiSetu AI Evidence Assistant**, powered by a Retrieval-Augmented Generation (RAG) pipeline with **Google Gemini**.\n\nI answer questions strictly grounded in our repository of research papers, government datasets, policy innovations, and land governance records. Ask me anything or select a suggested topic below!',
      isLiveAI: hasGeminiApiKey(),
      modelUsed: hasGeminiApiKey() ? getSelectedModel() : 'RAG Pipeline Ready',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [selectedModel, setSelectedModelState] = useState(getSelectedModel());
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [expandedChunkMsgIdx, setExpandedChunkMsgIdx] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setApiKeyInput(getGeminiApiKey());
    setSelectedModelState(getSelectedModel());
  }, [showSettings]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSaveSettings = () => {
    setGeminiApiKey(apiKeyInput);
    setSelectedModel(selectedModel);
    setIsKeySaved(true);
    setTimeout(() => {
      setIsKeySaved(false);
      setShowSettings(false);
    }, 700);
  };

  const handleSend = async (question: string) => {
    if (!question.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const result = await answerQuestionWithRAG(question);

      const assistantMsg: Message = {
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        retrievedChunks: result.retrievedChunks,
        modelUsed: result.modelUsed,
        isLiveAI: result.isLiveAI,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'An unexpected error occurred while processing your request. Please try again.',
          modelUsed: 'Error',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format simple markdown (bold, lists, code)
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const itemText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc my-1">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </li>
        );
      }
      if (line.trim().match(/^\d+\.\s/)) {
        const itemText = line.replace(/^\d+\.\s/, '');
        return (
          <li key={idx} className="ml-4 list-decimal my-1">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(itemText) }} />
          </li>
        );
      }
      if (line.trim().startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm font-bold text-navy-900 mt-3 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.trim().startsWith('## ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-navy-900 mt-3 mb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="my-1">
          <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
        </p>
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-forest-100 text-forest-900 px-1 py-0.5 rounded text-xs">$1</code>');
  };

  const hasKey = hasGeminiApiKey();

  return (
    <div className="rounded-xl border border-forest-900/10 bg-white shadow-soft overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-800 via-forest-700 to-forest-600 px-5 py-4 flex items-center justify-between text-cream-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
            <Sparkles className="w-5 h-5 text-saffron-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-cream-50 font-semibold text-base">AI Evidence Assistant</h3>
              <span className="badge bg-saffron-400/20 text-saffron-200 text-[10px] ring-1 ring-saffron-400/30">
                RAG Grounded
              </span>
            </div>
            <p className="text-cream-200 text-xs flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${hasKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {hasKey ? `Gemini Active (${getSelectedModel()})` : 'Static Semantic RAG (Demo mode)'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-cream-100 transition-colors"
          title="Configure Gemini API Key & Model"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>

      {/* Settings Modal / Drawer */}
      {showSettings && (
        <div className="bg-cream-100 border-b border-forest-900/10 p-5 animate-fade-in text-navy-800 text-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-bold flex items-center gap-2 text-forest-800">
                <Key className="w-4 h-4 text-forest-600" /> Google Gemini API Settings
              </h4>
              <p className="text-xs text-navy-500 mt-1">
                Connect your Gemini API key to query the static BhoomiSetu knowledge base with live Google Gemini generation.
              </p>
            </div>
          </div>

          <div className="space-y-3 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                Gemini API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="input-field text-xs flex-1"
                />
                <button onClick={handleSaveSettings} className="btn-primary text-xs py-2 px-4 whitespace-nowrap">
                  {isKeySaved ? <Check className="w-4 h-4" /> : 'Save Key'}
                </button>
              </div>
              <p className="text-[11px] text-navy-400 mt-1">
                Keys are stored locally in your browser. You can also specify <code>VITE_GEMINI_API_KEY</code> in your <code>.env</code> file.{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-forest-700 underline font-medium inline-flex items-center gap-0.5 ml-1"
                >
                  Get free key from Google AI Studio <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1">
                Gemini Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModelState(e.target.value)}
                className="input-field text-xs py-2"
              >
                {AVAILABLE_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Messages Feed */}
      <div className="p-5 space-y-4 max-h-[460px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-forest-700 text-cream-50'
                  : 'bg-cream-100 text-navy-800 border border-forest-900/5'
              }`}
            >
              {renderFormattedContent(msg.content)}

              {/* Model badge */}
              {msg.role === 'assistant' && msg.modelUsed && (
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-navy-400 border-t border-navy-900/5 pt-2">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-forest-600" />
                    Model: {msg.modelUsed}
                  </span>
                  {msg.retrievedChunks && msg.retrievedChunks.length > 0 && (
                    <button
                      onClick={() =>
                        setExpandedChunkMsgIdx(expandedChunkMsgIdx === i ? null : i)
                      }
                      className="text-forest-700 hover:text-forest-800 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {expandedChunkMsgIdx === i ? (
                        <>Hide Grounding Chunks <ChevronUp className="w-3 h-3" /></>
                      ) : (
                        <>Inspect {msg.retrievedChunks.length} RAG Chunks <ChevronDown className="w-3 h-3" /></>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Inspected RAG Chunks Accordion */}
              {expandedChunkMsgIdx === i && msg.retrievedChunks && (
                <div className="mt-3 p-3 bg-white/80 rounded-lg border border-forest-900/10 space-y-2.5 text-xs text-navy-700 animate-fade-in">
                  <p className="font-semibold text-forest-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Retrieved Static Grounding Chunks:
                  </p>
                  {msg.retrievedChunks.map((res, cIdx) => (
                    <div key={cIdx} className="p-2 bg-cream-50 rounded border border-navy-900/5">
                      <div className="flex items-center justify-between font-medium text-navy-900">
                        <span className="truncate max-w-[80%]">#{cIdx + 1} {res.chunk.title}</span>
                        <span className="text-[10px] badge bg-forest-50 text-forest-700">
                          Score: {Math.round(res.score * 10) / 10}
                        </span>
                      </div>
                      <p className="text-[11px] text-navy-500 line-clamp-2 mt-1">
                        {res.chunk.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sources Badges */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-navy-900/10">
                  <p className="text-[11px] font-semibold text-navy-500 mb-1.5 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Grounded In:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.sources.map((src) => {
                      const isLink = Boolean(src.route);
                      return isLink ? (
                        <Link
                          key={src.id}
                          to={src.route!}
                          className="badge bg-white text-forest-700 border border-forest-700/20 hover:bg-forest-50 transition-colors inline-flex items-center gap-1 text-[11px]"
                        >
                          {src.category === 'Dataset' ? <DbIcon className="w-2.5 h-2.5" /> : <FileText className="w-2.5 h-2.5" />}
                          {src.title}
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </Link>
                      ) : (
                        <span
                          key={src.id}
                          className="badge bg-white text-navy-700 border border-navy-200 text-[11px]"
                        >
                          {src.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-cream-100 rounded-xl px-4 py-3 flex items-center gap-2 border border-forest-900/5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
              </div>
              <span className="text-xs text-navy-500 ml-1">
                Searching static knowledge & generating with Gemini...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-5 pb-3">
          <p className="text-xs text-navy-400 mb-2 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Suggested queries:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="badge bg-forest-50 text-forest-700 hover:bg-forest-100 transition-colors cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Field */}
      <div className="border-t border-forest-900/10 p-4 bg-cream-50/50 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend(input)}
          placeholder="Ask a question grounded in our static data repository..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button
          onClick={() => !loading && handleSend(input)}
          disabled={loading || !input.trim()}
          className="btn-primary px-4 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Footer helper note */}
      <div className="px-5 py-2 bg-cream-100/60 border-t border-forest-900/5 text-[11px] text-navy-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-navy-400" />
          RAG Pipeline with static BhoomiSetu corpus & Gemini API
        </span>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-forest-700 hover:underline cursor-pointer"
        >
          {hasKey ? 'API Key Configured ✓' : 'Add Gemini Key'}
        </button>
      </div>
    </div>
  );
}
