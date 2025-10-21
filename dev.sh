#!/bin/bash

echo "🚀 Iniciando sistema Hospital Procedures..."
echo ""

if ! command -v pnpm &> /dev/null; then
  echo "❌ pnpm não está instalado!"
  echo "📦 Instale com: npm install -g pnpm"
  exit 1
fi

if [ ! -f .env ]; then
  echo "⚠️  Arquivo .env não encontrado!"
  echo "📝 Copiando .env.example para .env..."
  cp .env.example .env
  echo "✅ Arquivo .env criado!"
  echo "⚙️  Configure as variáveis de ambiente em .env"
  echo ""
fi

if [ ! -d uploads/pdfs ]; then
  echo "📁 Criando pasta de uploads..."
  mkdir -p uploads/pdfs
  echo "✅ Pasta criada!"
  echo ""
fi

echo "🧹 Limpando portas..."
source .env

BACKEND_PORT=${PORT:-3001}
FRONTEND_PORT=3000

if lsof -ti:$BACKEND_PORT &>/dev/null; then
  echo "⚠️  Matando processo na porta $BACKEND_PORT..."
  kill -9 $(lsof -ti:$BACKEND_PORT) 2>/dev/null
fi

if lsof -ti:$FRONTEND_PORT &>/dev/null; then
  echo "⚠️  Matando processo na porta $FRONTEND_PORT..."
  kill -9 $(lsof -ti:$FRONTEND_PORT) 2>/dev/null
fi

echo "✅ Portas limpas!"
echo ""

echo "🗄️  Verificando banco de dados..."

DB_EXISTS=$(PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USER -p $DATABASE_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DATABASE_NAME'" 2>/dev/null)

if [ "$DB_EXISTS" != "1" ]; then
  echo "📦 Criando banco de dados $DATABASE_NAME..."
  PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USER -p $DATABASE_PORT -c "CREATE DATABASE $DATABASE_NAME" 2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "✅ Banco de dados criado!"
  else
    echo "❌ Erro ao criar banco. Verifique se o PostgreSQL está rodando!"
    exit 1
  fi
else
  echo "✅ Banco de dados já existe!"
fi
echo ""

if [ ! -f pnpm-lock.yaml ]; then
  echo "📦 Instalando dependências com pnpm..."
  pnpm install
  echo ""
fi

echo "🔥 Iniciando serviços..."
echo ""

trap 'kill $(jobs -p) 2>/dev/null' EXIT

cd apps/backend && pnpm dev &
BACKEND_PID=$!

cd ../../apps/frontend && pnpm dev &
FRONTEND_PID=$!

sleep 5

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✅ SISTEMA RODANDO COM SUCESSO!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "🌐 LINKS DE ACESSO:"
echo ""
echo "   📱 Frontend:  http://localhost:3000"
echo "   🔧 Backend:   http://localhost:3001"
echo "   👤 Admin:     http://localhost:3000/admin"
echo ""
echo "🔐 CREDENCIAIS ADMIN:"
echo ""
echo "   Usuário: admin"
echo "   Senha:   admin123"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo "⚠️  Pressione CTRL+C para parar os serviços"
echo ""

wait

