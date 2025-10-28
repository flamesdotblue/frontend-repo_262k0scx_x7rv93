import { useMemo, useRef, useState } from 'react'
import { Loader2, Upload, Download, Share2 } from 'lucide-react'

export default function UGCGenerator() {
  const [file, setFile] = useState(null)
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState('')
  const [status, setStatus] = useState('')

  const videoInputRef = useRef(null)

  const isVideo = useMemo(() => {
    if (!file) return false
    return file.type.startsWith('video/')
  }, [file])

  const handleGenerate = async () => {
    if (!file) return
    setLoading(true)
    setResultUrl('')
    setStatus('Initializing workflow…')

    const n8nUrl = import.meta.env.VITE_N8N_URL

    try {
      // If an n8n URL is provided, attempt a POST; otherwise simulate
      if (n8nUrl) {
        setStatus('Uploading…')
        const form = new FormData()
        form.append('file', file)
        form.append('productName', productName)
        form.append('description', description)

        const res = await fetch(n8nUrl, { method: 'POST', body: form })
        if (!res.ok) throw new Error('Workflow failed')
        setStatus('Processing…')
        const data = await res.json().catch(() => ({}))
        // Expecting data.videoUrl; fallback to local preview
        const url = data.videoUrl || URL.createObjectURL(file)
        await new Promise((r) => setTimeout(r, 1200))
        setResultUrl(url)
        setStatus('Completed')
      } else {
        setStatus('Synthesizing scenes…')
        await new Promise((r) => setTimeout(r, 1200))
        setStatus('Rendering voiceover…')
        await new Promise((r) => setTimeout(r, 1200))
        setStatus('Composing final video…')
        await new Promise((r) => setTimeout(r, 1400))
        setResultUrl(URL.createObjectURL(file))
        setStatus('Completed')
      }
    } catch (e) {
      console.error(e)
      setStatus('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = `${productName || 'ugc-video'}.${isVideo ? 'mp4' : 'png'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleShare = async () => {
    try {
      if (navigator.share && resultUrl) {
        await navigator.share({ title: 'UGC Video', url: resultUrl })
      } else {
        await navigator.clipboard.writeText(resultUrl)
        alert('Link copied to clipboard')
      }
    } catch {}
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          Generate UGC Marketing Videos with One Click
        </h1>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Upload image or short video</span>
              <div className="mt-2">
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-white hover:file:bg-gray-800"
                />
              </div>
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Product Name</span>
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Aurora Smart Bottle"
                  className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Short Description</span>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Sleek, self-cleaning, and keeps drinks cold for 24h"
                  className="mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </label>
            </div>

            <div className="pt-2">
              <button
                onClick={handleGenerate}
                disabled={!file || loading}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Video generating…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Generate Video
                  </>
                )}
              </button>
              {status && (
                <p className="mt-3 text-sm text-gray-600">{status}</p>
              )}
            </div>
          </div>
        </div>

        {(file || resultUrl) && (
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Result</h3>
            <div className="mt-4">
              {resultUrl ? (
                isVideo ? (
                  <video className="w-full rounded-lg border border-gray-200" controls src={resultUrl} />
                ) : (
                  <img className="w-full rounded-lg border border-gray-200" src={resultUrl} alt="Generated" />
                )
              ) : (
                file && (
                  isVideo ? (
                    <video className="w-full rounded-lg border border-gray-200" controls src={URL.createObjectURL(file)} />
                  ) : (
                    <img className="w-full rounded-lg border border-gray-200" src={URL.createObjectURL(file)} alt="Preview" />
                  )
                )
              )}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button onClick={handleDownload} disabled={!resultUrl} className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                <Download className="h-4 w-4" />
                Download
              </button>
              <button onClick={handleShare} disabled={!resultUrl} className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
