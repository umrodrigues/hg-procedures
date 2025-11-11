'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const loginToast = toast.loading('Autenticando...')

    try {
      const response = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      document.cookie = `token=${response.data.access_token}; path=/; max-age=86400`
      
      toast.success('Login realizado com sucesso!', { id: loginToast })
      
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (err: any) {
      setError('Credenciais inválidas')
      toast.error('Usuário ou senha incorretos', { id: loginToast })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-36 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-[1.15fr_1fr]">
            <div className="relative hidden flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white md:flex">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">Hospital Geral</span>
                <h2 className="mt-6 text-3xl font-bold leading-tight">Procedimentos Obstetrícia</h2>
                <p className="mt-4 text-sm text-blue-100/80">Acesso seguro ao painel administrativo para gestão dos protocolos e documentos essenciais da instituição.</p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-blue-50/90">Controle centralizado de documentos médicos e protocolos clínicos com segurança e rastreabilidade.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-blue-50/90">Equipe especializada garantindo processos atualizados e confiáveis para toda a equipe obstétrica.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                  <span className="text-xl font-semibold">⚕️</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Hospital Geral</p>
                  <p className="text-xs text-blue-100/80">Excelência em obstetrícia e ginecologia</p>
                </div>
              </div>
            </div>
            <div className="bg-white px-6 py-8 sm:px-10 sm:py-12">
              <div className="mb-8">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">Área restrita</span>
                <h1 className="mt-4 text-3xl font-bold text-slate-900">Bem-vindo de volta</h1>
                <p className="mt-2 text-sm text-slate-500">Acesse o painel administrativo com suas credenciais.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-slate-700">Usuário</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 0115 0" />
                      </svg>
                    </span>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 pl-12 text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      placeholder="Digite seu usuário"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-slate-700">Senha</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V8.25a4.5 4.5 0 00-9 0v2.25M6.75 10.5h10.5a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 pl-12 text-slate-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      placeholder="Digite sua senha"
                      required
                    />
                  </div>
                </div>
                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <svg className="mt-0.5 h-5 w-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12V16.5zm8.488 0H3.512c-.963 0-1.558-1.045-1.077-1.875L10.923 4.125c.481-.83 1.673-.83 2.154 0l8.488 10.5c.481.83-.114 1.875-1.077 1.875z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
                      Entrando...
                    </span>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </form>
              <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
                <span>Uso exclusivo da equipe autorizada</span>
                <button
                  onClick={() => router.push('/')}
                  className="font-semibold text-blue-600 transition-colors hover:text-blue-500"
                >
                  Voltar para o site
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

