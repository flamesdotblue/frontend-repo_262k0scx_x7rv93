import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'
import { Rocket } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-3 py-1 text-xs text-gray-600">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            New: UGC videos in seconds
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Supercharge Your Marketing with AI
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Create UGC-style videos and AI-powered social content in seconds.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link to="/ugc-generator" className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-gray-800 transition-colors">
              <Rocket className="h-4 w-4" />
              Try It Now
            </Link>
          </div>
        </div>
        <div className="relative h-[360px] sm:h-[420px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
