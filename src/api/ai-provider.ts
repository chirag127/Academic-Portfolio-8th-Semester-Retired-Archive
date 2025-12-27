// src/api/ai-provider.ts

interface ProviderConfig {
  name: string;
  localStorageKey: string;
  baseUrl: string;
  model: string;
  createRequest: (apiKey: string, model: string, prompt: string) => { url: string; options: RequestInit };
  parseResponse: (data: any) => string;
}

const providers: ProviderConfig[] = [
  {
    name: 'Cerebras',
    localStorageKey: 'CEREBRAS_API_KEY',
    baseUrl: 'https://api.cerebras.ai/v1/chat/completions',
    model: 'qwen-3-235b-a22b-instruct-2507',
    createRequest: (apiKey, model, prompt) => ({
      url: 'https://api.cerebras.ai/v1/chat/completions',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    }),
    parseResponse: (data) => data.choices[0].message.content,
  },
  {
    name: 'Gemini',
    localStorageKey: 'GEMINI_API_KEY',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    model: 'gemma-3-27b-instruct',
    createRequest: (apiKey, model, prompt) => ({
      url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    }),
    parseResponse: (data) => data.candidates[0].content.parts[0].text,
  },
  {
    name: 'Groq',
    localStorageKey: 'GROQ_API_KEY',
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.1-405b-instruct',
    createRequest: (apiKey, model, prompt) => ({
      url: 'https://api.groq.com/openai/v1/chat/completions',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    }),
    parseResponse: (data) => data.choices[0].message.content,
  },
    {
    name: 'Mistral',
    localStorageKey: 'MISTRAL_API_KEY',
    baseUrl: 'https://api.mistral.ai/v1/chat/completions',
    model: 'mistral-large-latest',
    createRequest: (apiKey, model, prompt) => ({
      url: 'https://api.mistral.ai/v1/chat/completions',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    }),
    parseResponse: (data) => data.choices[0].message.content,
  },
  {
    name: 'NVIDIA',
    localStorageKey: 'NVIDIA_API_KEY',
    baseUrl: 'https://integrate.api.nvidia.com/v1/chat/completions',
    model: 'meta/llama3.1-405b-instruct',
     createRequest: (apiKey, model, prompt) => ({
      url: 'https://integrate.api.nvidia.com/v1/chat/completions',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    }),
    parseResponse: (data) => data.choices[0].message.content,
  },
  {
    name: 'Cloudflare',
    localStorageKey: 'CLOUDFLARE_API_KEY',
    baseUrl: 'https://api.cloudflare.com/client/v4/accounts',
    model: '@cf/meta/llama-3.1-405b-instruct',
    createRequest: (apiKey, model, prompt) => {
        const accountId = localStorage.getItem('CLOUDFLARE_ACCOUNT_ID');
        if (!accountId) throw new Error('Cloudflare Account ID not found in localStorage.');
        return {
            url: `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
            options: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
            },
        }
    },
    parseResponse: (data) => data.result.response,
  },
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AiProviderService {
  public async generateContent(prompt: string): Promise<string> {
    let lastError: any = null;
    let backoffDelay = 1000; // Start with 1 second

    for (const provider of providers) {
      const apiKey = localStorage.getItem(provider.localStorageKey);

      if (!apiKey) {
        console.warn(`API key for ${provider.name} not found. Skipping.`);
        continue;
      }

      try {
        const request = provider.createRequest(apiKey, provider.model, prompt);
        const response = await fetch(request.url, request.options);

        if (response.ok) {
          const data = await response.json();
          return provider.parseResponse(data);
        } else {
          lastError = new Error(`Provider ${provider.name} failed with status ${response.status}`);
          console.error(lastError.message, await response.text());
        }
      } catch (error) {
        lastError = error;
        console.error(`Error with provider ${provider.name}:`, error);
      }

      await sleep(backoffDelay);
      backoffDelay = Math.min(backoffDelay * 2, 32000); // Exponential backoff up to 32 seconds
    }

    throw new Error('All AI providers failed.', { cause: lastError });
  }
}
