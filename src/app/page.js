// src/app/page.js
'use client';
import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import ContentGenerator from '../components/ContentGenerator';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-800">
              🚀 AI Assistant Hub
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === 'generate'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ⚡ Generate
              </button>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {activeTab === 'chat' ? <ChatInterface /> : <ContentGenerator />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">🤖 AI Assistant Hub</h3>
            <p className="text-gray-300">
              Powered by Gemini AI & N8N Integration
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <div>💬 Interactive Chat</div>
            <div>⚡ Content Generation</div>
            <div>🔗 Webhook Integration</div>
            <div>📊 Activity Logging</div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
            Built with Next.js 14 • Ready for Production
          </div>
        </div>
      </footer>
      
    </div>
  );
}
