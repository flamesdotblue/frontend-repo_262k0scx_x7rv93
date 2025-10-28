import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader2, Search, Copy, Edit, Mail, Sparkles } from 'lucide-react'

const platforms = ['Facebook', 'LinkedIn', 'X', 'Instagram']

export default function ContentIntelligence() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState(platforms[0])
  const [recent, setRecent] = useState([])

  const n8nTrendingUrl = import.meta.env.VITE_N8N_TRENDS_URL
  const n8nGenerateUrl = import.meta.env.VITE_N8N_GENERATE_URL

  const fetchTrending = async () => {
    setLoading(true)
    try {
      if (n8nTrendingUrl) {
        const res = await fetch(n8nTrendingUrl, { method: 'POST' })
        const data = await res.json()
        setResults((data?.topics || []).slice(0, 2))
      } else {
        await new Promise((r) => setTimeout(r, 1200))
        setResults([
          'AI Video for Ecommerce Launches',
          'UGC Strategies for DTC Brands'
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  const generateContent = async () => {
    if (!topic) return fetchTrending()
    setLoading(true)
    try {
      if (n8nGenerateUrl) {
        const res = await fetch(n8nGenerateUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, platform })
        })
        const data = await res.json()
        setResults(data?.posts || [])
      } else {
        await new Promise((r) => setTimeout(r, 1300))
        setResults([
          `Hot take on ${topic} for ${platform}: Why now is the moment — 3 reasons and a 1-line CTA.`,
          `Carousel idea: ${topic} — hook, myth vs fact, 3 actionable tips, final CTA.`
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  const copyItem = async (text) => {
    await navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    if (results.length) {
      setRecent((prev) => [...results, ...prev].slice(0, 10))
    }
  }, [results])

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          AI-Powered Social Media Intelligence
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Auto Trend Content</h3>
            <p className="mt-1 text-gray-600">Fetch top trending topics now.</p>
            <button onClick={fetchTrending} disabled={loading} className="mt-4 inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Fetch Top Trending Topics
            </button>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Deep Research Content</h3>
            <p className="mt-1 text-gray-600">Generate platform-ready copy.</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a keyword or topic"
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <button onClick={generateContent} disabled={loading} className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Generate
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Results</h3>
          <div className="mt-4 grid gap-4">
            {loading && (
              <div className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-600 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Working…
              </div>
            )}
            {!loading && results.map((text, idx) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-gray-800 whitespace-pre-line">{text}</p>
                <div className="mt-4 flex items-center gap-3">
                  <button onClick={() => copyItem(text)} className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                  <button onClick={() => alert('Open an editor modal in your app')} className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button onClick={() => alert('We will email you this content')} className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Mail className="h-4 w-4" />
                    Email Me This Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-sm font-semibold text-gray-700">Recent Trends</h4>
          <div className="mt-3 overflow-x-auto">
            <div className="flex gap-3 min-w-max">
              {recent.length === 0 && (
                <div className="text-sm text-gray-500">No trends yet — generate to see recent items.</div>
              )}
              {recent.map((t, i) => (
                <div key={i} className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm">
                  {typeof t === 'string' ? t : JSON.stringify(t)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
