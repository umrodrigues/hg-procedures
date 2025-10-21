'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAdmin(!!token)
  }, [])

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Hospital</h1>
              <p className="text-xs text-blue-200">Procedimentos Médicos</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link
              href="/"
              className="hover:text-blue-200 transition-colors"
            >
              Início
            </Link>
            {isAdmin ? (
              <Link
                href="/admin"
                className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Admin
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

