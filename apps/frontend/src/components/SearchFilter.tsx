'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SearchFilterProps {
  onSearch: (search: string) => void
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (value: string) => {
    setSearch(value)
    onSearch(value)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          animate={{ scale: isFocused ? 1.02 : 1 }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Buscar procedimentos..."
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
          />
          <svg
            className="absolute left-5 top-5 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

