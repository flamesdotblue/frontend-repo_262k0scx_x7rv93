export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} AIMarket. All rights reserved.</p>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900">About</a>
          <a href="#" className="hover:text-gray-900">Pricing</a>
          <a href="#" className="hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
