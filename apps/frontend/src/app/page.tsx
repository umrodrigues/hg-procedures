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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Procedimentos Obstetrícia
          </h1>
          <p className="text-xl text-gray-600">
            Documentação especializada em cuidados obstétricos e ginecológicos
          </p>
        </div>

        <SearchFilter onSearch={handleSearch} />

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Carregando documentos...</p>
          </div>
        ) : (
          <DocumentGrid documents={filteredDocuments} />
        )}
      </main>

      <Footer />
    </div>
  )
}

