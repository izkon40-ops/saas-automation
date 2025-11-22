'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      // For demo: just redirect to dashboard
      if (email && password) {
        localStorage.setItem('user', JSON.stringify({ email }))
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-effect rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
        <p className="text-purple-300 mb-8">Create your account to begin</p>

        {error && <div className="bg-red-500/20 border border-red-500 rounded p-3 mb-4 text-red-300">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-purple-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-purple-300 mt-6">
          Already have an account? <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
