import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/80?img=12',
    quote: 'We generated 10+ studio-quality UGC clips for our product launch in a single afternoon.'
  },
  {
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/80?img=32',
    quote: 'The content intelligence insights are spot on — our engagement doubled in a week.'
  },
  {
    name: 'Marco Rossi',
    avatar: 'https://i.pravatar.cc/80?img=5',
    quote: 'Simple, fast, and beautiful. Our social pipeline finally feels effortless.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Loved by creators and teams</h2>
          <p className="mt-2 text-gray-600">Join marketers who move faster with AI</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
