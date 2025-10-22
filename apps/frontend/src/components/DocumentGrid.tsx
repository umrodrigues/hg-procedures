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
          className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-6"
        >
          <svg
            className="mx-auto h-16 w-16 text-blue-500"
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
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border border-gray-100 hover:border-blue-200"
        >
          <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 h-40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-800/20"></div>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-xl">
                <div className="flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-white"
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
                <div className="text-center">
                  <div className="text-white font-bold text-sm mb-1">PDF</div>
                  <div className="text-white/80 text-xs">Documento</div>
                </div>
              </div>
            </motion.div>
            <div className="absolute top-2 right-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="p-5">
            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors">
              {doc.title}
            </h3>
            {doc.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {doc.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-blue-600">PDF</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="text-gray-400">{doc.filename}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

