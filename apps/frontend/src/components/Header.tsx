'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('token')
    setIsAdmin(!!token)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-2xl backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-4 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span className="text-blue-600 font-bold text-2xl">H</span>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Hospital</h1>
              <p className="text-sm text-blue-200">Procedimentos Médicos</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="hover:text-blue-200 transition-all duration-300 font-medium"
            >
              Início
            </Link>
            {mounted && (
              <>
                {isAdmin ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/admin"
                      className="px-6 py-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg"
                    >
                      Admin
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/login"
                      className="px-6 py-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg"
                    >
                      Login
                    </Link>
                  </motion.div>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

