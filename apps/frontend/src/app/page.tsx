'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DocumentGrid from '@/components/DocumentGrid'
import SearchFilter from '@/components/SearchFilter'
import { api } from '@/lib/api'

interface Document {
  id: string
  title: string
  description: string
  filename: string
  createdAt: string
}

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadDocuments()
  }, [])

  useEffect(() => {
    if (search) {
      const filtered = documents.filter(doc =>
        doc.title.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredDocuments(filtered)
    } else {
      setFilteredDocuments(documents)
    }
  }, [search, documents])

  const loadDocuments = async () => {
    try {
      const response = await api.get('/documents')
      setDocuments(response.data)
      setFilteredDocuments(response.data)
    } catch (error) {
      console.error('Erro ao carregar documentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Procedimentos Hospitalares
          </h1>
          <p className="text-gray-600">
            Documentação e protocolos médicos
          </p>
        </div>

        <SearchFilter onSearch={handleSearch} />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <DocumentGrid documents={filteredDocuments} />
        )}
      </main>

      <Footer />
    </div>
  )
}

