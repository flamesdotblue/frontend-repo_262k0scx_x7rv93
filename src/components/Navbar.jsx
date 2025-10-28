import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkBase = 'text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
  const active = ({ isActive }) => `${linkBase} ${isActive ? 'text-gray-900' : ''}`

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-amber-400" />
          <span className="text-gray-900 font-semibold">AIMarket</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={active} end>
            Home
          </NavLink>
          <NavLink to="/ugc-generator" className={active}>
            UGC Video Generator
          </NavLink>
          <NavLink to="/content-intelligence" className={active}>
            Content Intelligence
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/ugc-generator" className="inline-flex items-center rounded-full bg-gray-900 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-800 transition-colors">
            Try It Now
          </Link>
        </div>
      </div>
    </header>
  )
}
