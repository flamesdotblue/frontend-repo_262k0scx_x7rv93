import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureCards from './components/FeatureCards'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import UGCGenerator from './components/UGCGenerator'
import ContentIntelligence from './components/ContentIntelligence'

function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <Testimonials />
    </main>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ugc-generator" element={<UGCGenerator />} />
        <Route path="/content-intelligence" element={<ContentIntelligence />} />
      </Routes>
      <Footer />
    </div>
  )
}
