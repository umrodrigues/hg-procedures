-- Script de inicialização do banco de dados
-- Este arquivo é executado automaticamente quando o container PostgreSQL é criado

-- Criar usuário admin se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
        CREATE ROLE admin WITH LOGIN PASSWORD 'admin123' CREATEDB;
    END IF;
END
$$;

-- Garantir que o banco existe
SELECT 'CREATE DATABASE hg_procedures'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hg_procedures')\gexec
