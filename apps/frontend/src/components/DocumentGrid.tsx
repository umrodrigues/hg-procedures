'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

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
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="mx-auto h-20 w-20 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </motion.div>
        <h3 className="mt-6 text-2xl font-semibold text-gray-700">
          Nenhum documento encontrado
        </h3>
        <p className="mt-2 text-gray-500">
          Faça login como admin para adicionar procedimentos.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          onClick={() => router.push(`/document/${doc.id}`)}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
        >
          <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 h-40 flex items-center justify-center relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-20 h-20 text-white opacity-90"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="p-5">
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-lg group-hover:text-purple-600 transition-colors">
              {doc.title}
            </h3>
            {doc.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {doc.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
              <span className="font-medium">PDF</span>
              <span>{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

