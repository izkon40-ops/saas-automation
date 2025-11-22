'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('analyze')
  const [googleMapsUrl, setGoogleMapsUrl] = useState('')
  const [businessId, setBusinessId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  const handleAnalyzeBusiness = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const response = await fetch('/api/analyze-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          googleMapsUrl,
          userId: user?.email || 'demo-user'
        }),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.data)
        setBusinessId(data.businessId || 'biz-' + Date.now())
        setError('')
      } else {
        setError(data.error || 'Analysis failed')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to analyze business')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateWebsite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId) {
      setError('Please analyze a business first')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/create-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, userId: user?.email }),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.website)
        setError('')
      } else {
        setError(data.error || 'Website creation failed')
      }
    } catch (error) {
      setError('Failed to create website')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateVoiceAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId) {
      setError('Please analyze a business first')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/create-voice-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, userId: user?.email }),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.agent)
        setError('')
      } else {
        setError(data.error || 'Voice agent creation failed')
      }
    } catch (error) {
      setError('Failed to create voice agent')
    } finally {
      setLoading(false)
    }
  }

  const handleGetAutomations = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId) {
      setError('Please analyze a business first')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/get-automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, userId: user?.email }),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.automations)
        setError('')
      } else {
        setError(data.error || 'Failed to get automations')
      }
    } catch (error) {
      setError('Failed to get automations')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-purple-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AutoSaaS
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-purple-300">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <p className="text-purple-300">Welcome {user?.email}! Let's automate a business.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-800/50 pb-4 overflow-x-auto">
          {['analyze', 'website', 'voice', 'automations'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setResult(null)
                setError('')
              }}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
              }`}
            >
              {tab === 'analyze' && '🔍 Analyze'}
              {tab === 'website' && '🌐 Website'}
              {tab === 'voice' && '🎤 Voice Agent'}
              {tab === 'automations' && '⚙️ Automations'}
            </button>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Input Forms */}
          <div className="backdrop-blur-sm bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8">
            
            {/* ANALYZE TAB */}
            {activeTab === 'analyze' && (
              <form onSubmit={handleAnalyzeBusiness} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">🔍 Analyze Business</h3>
                  <p className="text-purple-300 mb-6">Paste a Google Maps business link to get started</p>
                </div>

                <div>
                  <label className="block text-purple-300 mb-2 font-semibold">Google Maps URL</label>
                  <input
                    type="text"
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/maps/place/..."
                    className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !googleMapsUrl.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? '🔄 Analyzing...' : '🚀 Analyze Business'}
                </button>
              </form>
            )}

            {/* WEBSITE TAB */}
            {activeTab === 'website' && (
              <form onSubmit={handleCreateWebsite} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">🌐 Create Website</h3>
                  <p className="text-purple-300 mb-6">Generate a professional website automatically</p>
                </div>

                <div className="bg-purple-800/30 rounded-lg p-4">
                  <p className="text-purple-200 text-sm">
                    <strong>Business ID:</strong> {businessId || 'Please analyze a business first'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !businessId}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? '🔄 Creating Website...' : '🌟 Create Website'}
                </button>

                {!businessId && (
                  <p className="text-orange-300 text-sm">ℹ️ First analyze a business to create a website</p>
                )}
              </form>
            )}

            {/* VOICE AGENT TAB */}
            {activeTab === 'voice' && (
              <form onSubmit={handleCreateVoiceAgent} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">🎤 Create Voice Agent</h3>
                  <p className="text-purple-300 mb-6">Build a 24/7 AI customer service agent</p>
                </div>

                <div className="bg-purple-800/30 rounded-lg p-4">
                  <p className="text-purple-200 text-sm">
                    <strong>Business ID:</strong> {businessId || 'Please analyze a business first'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !businessId}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? '🔄 Creating Voice Agent...' : '🤖 Create Voice Agent'}
                </button>

                {!businessId && (
                  <p className="text-orange-300 text-sm">ℹ️ First analyze a business to create a voice agent</p>
                )}
              </form>
            )}

            {/* AUTOMATIONS TAB */}
            {activeTab === 'automations' && (
              <form onSubmit={handleGetAutomations} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">⚙️ Get Automations</h3>
                  <p className="text-purple-300 mb-6">Discover automation opportunities</p>
                </div>

                <div className="bg-purple-800/30 rounded-lg p-4">
                  <p className="text-purple-200 text-sm">
                    <strong>Business ID:</strong> {businessId || 'Please analyze a business first'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !businessId}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? '🔄 Loading Automations...' : '⚡ Get Automations'}
                </button>

                {!businessId && (
                  <p className="text-orange-300 text-sm">ℹ️ First analyze a business to see automations</p>
                )}
              </form>
            )}
          </div>

          {/* Right Section - Results */}
          <div className="backdrop-blur-sm bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">📊 Results</h3>
            
            {!result && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-purple-300">Results will appear here after you run an action</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-pulse">⏳</div>
                <p className="text-purple-300">Processing your request...</p>
              </div>
            )}

            {result && activeTab === 'analyze' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Business Analysis</h4>
                <div className="space-y-3">
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Name:</strong> {result.businessName}</p>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Rating:</strong> ⭐ {result.rating}/5 ({result.reviewCount} reviews)</p>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Address:</strong> {result.address}</p>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Phone:</strong> {result.phone}</p>
                  </div>
                  
                  {result.painPoints && (
                    <div className="bg-orange-900/30 rounded-lg p-3">
                      <strong>Pain Points:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {result.painPoints.map((point: string, i: number) => (
                          <li key={i} className="text-sm">{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.recommendedAutomations && (
                    <div className="bg-green-900/30 rounded-lg p-3">
                      <strong>Recommended Automations:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {result.recommendedAutomations.map((auto: string, i: number) => (
                          <li key={i} className="text-sm">{auto}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result && activeTab === 'website' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Website Created! 🎉</h4>
                <div className="space-y-3">
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Name:</strong> {result.name}</p>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>URL:</strong> 
                      <a href={result.url} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-400 hover:text-blue-300 ml-2">
                        {result.url}
                      </a>
                    </p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-3">
                    <p><strong>Status:</strong> ✅ {result.status}</p>
                  </div>
                </div>
              </div>
            )}

            {result && activeTab === 'voice' && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Voice Agent Ready! 🤖</h4>
                <div className="space-y-3">
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Agent Name:</strong> {result.name}</p>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Phone Number:</strong> {result.phoneNumber}</p>
                  </div>
                  <div className="bg-purple-800/30 rounded-lg p-3">
                    <p><strong>Agent ID:</strong> {result.agentId}</p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-3">
                    <p><strong>Status:</strong> ✅ {result.status}</p>
                  </div>
                </div>
              </div>
            )}

            {result && activeTab === 'automations' && Array.isArray(result) && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Available Automations ⚙️</h4>
                <div className="space-y-2">
                  {result.map((automation: any, i: number) => (
                    <div key={i} className="bg-purple-800/30 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold">{automation.name}</p>
                          <p className="text-sm text-purple-300">{automation.description}</p>
                          <span className="text-xs bg-purple-600 px-2 py-1 rounded">{automation.category}</span>
                        </div>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
                          Enable
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
