'use client'

import { useState } from 'react'

interface SearchFilterProps {
  onSearch: (search: string) => void
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [search, setSearch] = useState('')

  const handleChange = (value: string) => {
    setSearch(value)
    onSearch(value)
  }

  return (
    <div className="mb-8">
      <div className="max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
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
        </div>
      </div>
    </div>
  )
}

