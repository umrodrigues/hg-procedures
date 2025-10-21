'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { api } from '@/lib/api'

interface Document {
  id: string
  title: string
  description: string
  filename: string
  createdAt: string
}

export default function DocumentView() {
  const params = useParams()
  const router = useRouter()
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDocument()
  }, [params.id])

  const loadDocument = async () => {
    try {
      const response = await api.get(`/documents/${params.id}`)
      setDocument(response.data)
    } catch (error) {
      console.error('Erro ao carregar documento:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/${params.id}/download`
    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Documento não encontrado
            </h2>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-primary hover:bg-secondary text-white rounded-lg transition-colors"
            >
              Voltar
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-primary hover:text-secondary mb-4 flex items-center"
          >
            ← Voltar
          </button>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {document.title}
            </h1>
            {document.description && (
              <p className="text-gray-600 mb-4">{document.description}</p>
            )}
            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-primary hover:bg-secondary text-white rounded-lg transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <iframe
            src={`${process.env.NEXT_PUBLIC_API_URL}/documents/${params.id}/view`}
            className="w-full h-[800px] border-0"
            title={document.title}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

