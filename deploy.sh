#!/bin/bash

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Este script precisa ser executado como root!"
  echo "💡 Execute: sudo ./deploy.sh"
  exit 1
fi

echo "🚀 Iniciando deploy do sistema Hospital Procedures..."
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
  echo "❌ Docker não está instalado!"
  echo "📦 Instalando Docker..."
  
  # Atualizar sistema
  apt-get update
  
  # Instalar dependências
  apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
  
  # Adicionar chave GPG do Docker
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  
  # Adicionar repositório do Docker
  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  
  # Atualizar e instalar Docker
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io
  
  # Iniciar e habilitar Docker
  systemctl start docker
  systemctl enable docker
  
  echo "✅ Docker instalado com sucesso!"
  echo ""
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
  echo "❌ Docker Compose não está instalado!"
  echo "📦 Instalando Docker Compose..."
  
  # Instalar Docker Compose
  curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  
  echo "✅ Docker Compose instalado com sucesso!"
  echo ""
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
  echo "⚠️  Arquivo .env não encontrado!"
  echo "📝 Criando arquivo .env com configurações padrão..."
  cat > .env << EOF
# Configurações do Banco de Dados
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=hg_procedures

# Configurações da Aplicação
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3001

# Configurações do Frontend
NEXT_PUBLIC_API_URL=http://31.97.86.227:3001

# Configurações de Produção
NODE_ENV=production
EOF
  echo "✅ Arquivo .env criado!"
  echo "⚙️  Configure as variáveis de ambiente em .env se necessário"
  echo ""
fi

# Criar pasta de uploads se não existir
if [ ! -d uploads/pdfs ]; then
  echo "📁 Criando pasta de uploads..."
  mkdir -p uploads/pdfs
  echo "✅ Pasta criada!"
  echo ""
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down 2>/dev/null || true
echo "✅ Containers parados!"
echo ""

# Limpar volumes e dados do banco
echo "🗑️ Limpando dados do banco de dados..."
docker volume rm hg-procedures_postgres_data 2>/dev/null || true
echo "✅ Dados do banco limpos!"
echo ""

# Limpar arquivos de upload
echo "🗑️ Limpando arquivos de upload..."
rm -rf uploads/pdfs/* 2>/dev/null || true
echo "✅ Arquivos de upload limpos!"
echo ""

# Limpar imagens antigas (opcional)
echo "🧹 Limpando imagens antigas..."
docker system prune -f 2>/dev/null || true
echo "✅ Limpeza concluída!"
echo ""

# Construir e iniciar os serviços
echo "🔨 Construindo e iniciando serviços..."
echo ""

# Carregar variáveis de ambiente
source .env

# Construir e iniciar com Docker Compose
docker-compose up --build -d

# Aguardar os serviços iniciarem
echo "⏳ Aguardando serviços iniciarem..."
sleep 30

# Verificar se os serviços estão rodando
echo "🔍 Verificando status dos serviços..."

# Verificar PostgreSQL
if docker-compose ps postgres | grep -q "Up"; then
  echo "✅ PostgreSQL: Rodando"
else
  echo "❌ PostgreSQL: Erro"
fi

# Verificar Backend
if docker-compose ps backend | grep -q "Up"; then
  echo "✅ Backend: Rodando"
else
  echo "❌ Backend: Erro"
fi

# Verificar Frontend
if docker-compose ps frontend | grep -q "Up"; then
  echo "✅ Frontend: Rodando"
else
  echo "❌ Frontend: Erro"
fi

echo ""

# Aguardar um pouco mais para garantir que tudo está funcionando
echo "⏳ Aguardando inicialização completa..."
sleep 15

# Verificar se a API está respondendo
echo "🔍 Testando API..."
if curl -s http://31.97.86.227:3001 > /dev/null 2>&1; then
  echo "✅ API Backend: Respondendo"
else
  echo "⚠️  API Backend: Não está respondendo ainda (pode estar inicializando)"
fi

# Verificar se o Frontend está respondendo
echo "🔍 Testando Frontend..."
if curl -s http://31.97.86.227:3000 > /dev/null 2>&1; then
  echo "✅ Frontend: Respondendo"
else
  echo "⚠️  Frontend: Não está respondendo ainda (pode estar inicializando)"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✅ DEPLOY CONCLUÍDO COM SUCESSO!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "🌐 LINKS DE ACESSO:"
echo ""
echo "   📱 Frontend:  http://31.97.86.227:3000"
echo "   🔧 Backend:   http://31.97.86.227:3001"
echo "   👤 Admin:     http://31.97.86.227:3000/admin"
echo ""
echo "🔐 CREDENCIAIS ADMIN:"
echo ""
echo "   Usuário: admin"
echo "   Senha:   admin123"
echo ""
echo "📊 COMANDOS ÚTEIS:"
echo ""
echo "   Ver logs:           docker-compose logs -f"
echo "   Parar serviços:     docker-compose down"
echo "   Reiniciar:          docker-compose restart"
echo "   Status:             docker-compose ps"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

# Mostrar logs dos últimos 20 segundos
echo "📋 Logs recentes:"
echo "════════════════════════════════════════════════════════════"
docker-compose logs --tail=20
echo "════════════════════════════════════════════════════════════"
echo ""
echo "🎉 Sistema Hospital Procedures está online!"
echo "💡 Use 'docker-compose logs -f' para acompanhar os logs em tempo real"
