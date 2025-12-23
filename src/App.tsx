// src/App.tsx
import { useState, useEffect } from 'react';
import { AiProviderService } from './api/ai-provider';

const providerKeys = [
  { name: 'Cerebras', key: 'CEREBRAS_API_KEY' },
  { name: 'Gemini', key: 'GEMINI_API_KEY' },
  { name: 'Groq', key: 'GROQ_API_KEY' },
  { name: 'Mistral', key: 'MISTRAL_API_KEY' },
  { name: 'NVIDIA', key: 'NVIDIA_API_KEY' },
  { name: 'Cloudflare', key: 'CLOUDFLARE_API_KEY', accountKey: 'CLOUDFLARE_ACCOUNT_ID' },
];

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadedKeys: Record<string, string> = {};
    providerKeys.forEach(p => {
      loadedKeys[p.key] = localStorage.getItem(p.key) || '';
      if (p.accountKey) {
        loadedKeys[p.accountKey] = localStorage.getItem(p.accountKey) || '';
      }
    });
    setApiKeys(loadedKeys);
  }, []);

  const handleApiKeyChange = (key: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(key, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const aiService = new AiProviderService();
      const result = await aiService.generateContent(prompt);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-4xl font-bold text-center">AI Orchestration Demo</h1>
        <p className="text-center text-gray-400">Powered by a multi-provider fallback chain (2026 Paradigm)</p>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* API Key Management */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
          <div className="space-y-4">
            {providerKeys.map(p => (
              <div key={p.key}>
                <label className="block text-sm font-medium text-gray-300">{p.name}</label>
                <input
                  type="password"
                  value={apiKeys[p.key] || ''}
                  onChange={(e) => handleApiKeyChange(p.key, e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                />
                {p.accountKey && (
                  <>
                    <label className="block text-sm font-medium text-gray-300 mt-2">{p.name} Account ID</label>
                    <input
                      type="text"
                      value={apiKeys[p.accountKey] || ''}
                      onChange={(e) => handleApiKeyChange(p.accountKey, e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Prompt and Response */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Chat</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full h-32 bg-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 disabled:bg-gray-500"
              disabled={isLoading}
            >
              {isLoading ? 'Thinking...' : 'Submit'}
            </button>
          </form>

          {error && <div className="mt-4 text-red-400">{error}</div>}

          {response && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Response:</h3>
              <div className="bg-gray-700 rounded-md p-4 mt-2">
                <p>{response}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
