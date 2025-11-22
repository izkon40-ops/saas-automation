'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-purple-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AutoSaaS
          </h1>
          <div className="flex gap-4">
            <a href="/auth/login" className="px-4 py-2 text-purple-300 hover:text-white">
              Login
            </a>
            <a href="/auth/signup" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Business Automation
          </span>
          <br />
          Made Easy
        </h2>

        <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
          Transform any local business with AI-powered websites, voice agents, and custom automations. 
          No coding required.
        </p>

        <div className="flex justify-center gap-4">
          <a 
            href="/auth/signup"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50"
          >
            Get Started Free
          </a>
          <a 
            href="#features"
            className="px-8 py-3 border border-purple-500 rounded-lg font-semibold hover:bg-purple-900/20"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose AutoSaaS?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🔍', title: 'Business Analysis', desc: 'Analyze any business in seconds' },
            { icon: '🌐', title: 'Website Builder', desc: 'Professional websites automatically' },
            { icon: '🎤', title: 'Voice Agents', desc: '24/7 AI customer support' },
            { icon: '⚙️', title: 'Automations', desc: 'Streamline business processes' },
          ].map((feature, i) => (
            <div key={i} className="p-6 glass-effect rounded-2xl hover:border-purple-400/50 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
              <p className="text-purple-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800/50 py-8 text-center text-purple-400">
        <p>&copy; 2024 AutoSaaS. All rights reserved.</p>
      </footer>
    </div>
  )
}
