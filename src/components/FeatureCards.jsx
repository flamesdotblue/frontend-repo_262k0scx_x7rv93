import { Link } from 'react-router-dom'
import { PlayCircle, ChartBar } from 'lucide-react'

export default function FeatureCards() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold text-gray-900">UGC Video Generator</h3>
              <span className="rounded-full bg-purple-50 text-purple-600 text-xs px-2 py-1">New</span>
            </div>
            <p className="mt-2 text-gray-600">Turn your product image into engaging influencer-style videos.</p>
            <Link to="/ugc-generator" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-purple-700 hover:text-purple-800">
              <PlayCircle className="h-4 w-4" />
              Try It
            </Link>
          </div>

          <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold text-gray-900">AI Content Intelligence</h3>
              <span className="rounded-full bg-blue-50 text-blue-600 text-xs px-2 py-1">Pro</span>
            </div>
            <p className="mt-2 text-gray-600">Discover trending topics and auto-generate viral posts.</p>
            <Link to="/content-intelligence" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800">
              <ChartBar className="h-4 w-4" />
              Explore It
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
