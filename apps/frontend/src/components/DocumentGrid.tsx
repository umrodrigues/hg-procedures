'use client'

import { useRouter } from 'next/navigation'

interface Document {
  id: string
  title: string
  description: string
  filename: string
  createdAt: string
}

interface DocumentGridProps {
  documents: Document[]
}

export default function DocumentGrid({ documents }: DocumentGridProps) {
  const router = useRouter()

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Nenhum documento encontrado
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Não há documentos cadastrados no momento.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {documents.map((doc) => (
        <div
          key={doc.id}
          onClick={() => router.push(`/document/${doc.id}`)}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
        >
          <div className="bg-gradient-to-br from-red-500 to-red-600 h-32 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
              {doc.title}
            </h3>
            {doc.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {doc.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>PDF</span>
              <span>{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

