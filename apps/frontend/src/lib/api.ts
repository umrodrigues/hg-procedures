import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    console.log('🔑 Token encontrado:', token ? 'Sim' : 'Não')
    console.log('🔑 Token (primeiros 20 chars):', token?.substring(0, 20))
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('📤 Enviando requisição para:', config.url)
      console.log('📤 Com Authorization header:', config.headers.Authorization?.substring(0, 30))
    } else {
      console.warn('⚠️ Token não encontrado no localStorage')
      console.warn('⚠️ localStorage keys:', Object.keys(localStorage))
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('❌ Erro 401 - Não autorizado');
      console.error('📋 Detalhes do erro:', error.response?.data);
    }
    return Promise.reject(error)
  }
)

