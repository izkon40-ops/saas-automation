// src/components/ContentGenerator.js
'use client';
import { useState } from 'react';

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('text');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateContent = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          type,
          options: { language }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.response);
        
        // Add to history
        const historyItem = {
          id: Date.now(),
          prompt: prompt.substring(0, 50) + '...',
          type,
          timestamp: new Date(),
          result: data.response
        };
        setHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10
        
        setPrompt(''); // Clear input after successful generation
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Generation error:', error);
      setResult('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('📋 Content copied to clipboard!');
  };

  const loadFromHistory = (item) => {
    setResult(item.result);
    setType(item.type);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        ⚡ AI Content Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Generate Content</h2>
          
          {/* Content Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">📝 Text Content</option>
              <option value="code">💻 Code Generation</option>
              <option value="explanation">📚 Explanation</option>
            </select>
          </div>

          {/* Language Selection (for code) */}
          {type === 'code' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="java">Java</option>
                <option value="php">PHP</option>
              </select>
            </div>
          )}

          {/* Prompt Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Prompt:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Enter your ${type} generation prompt here...`}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              disabled={loading}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateContent}
            disabled={!prompt.trim() || loading}
            className={`w-full py-3 rounded-lg font-semibold ${
              !prompt.trim() || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            } transition-colors`}
          >
            {loading ? '⏳ Generating...' : '🚀 Generate Content'}
          </button>
        </div>

        {/* History Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Recent Generations</h2>
          
          {history.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No history yet.<br />Generate some content!
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-800">
                    {item.prompt}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.type} • {item.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result Panel */}
      {result && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">✨ Generated Content</h2>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              📋 Copy
            </button>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 overflow-x-auto">
              {result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
