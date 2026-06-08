-- ============================================================
--  SQL para a tela de Postagem - EcoPonto Sistema
--  Execute este script no MySQL antes de iniciar o servidor
-- ============================================================

-- 1. Criar o banco de dados exclusivo da postagem
CREATE DATABASE IF NOT EXISTS blog_postagem;

USE blog_postagem;

-- 2. Criar a tabela de postagens
--    A coluna 'imagem' armazena a imagem em formato base64 (LONGTEXT)
CREATE TABLE IF NOT EXISTS postagens (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    titulo        VARCHAR(200)   NOT NULL,
    autor         VARCHAR(100)   NOT NULL,
    conteudo      TEXT           NOT NULL,
    imagem        LONGTEXT       NULL,          -- imagem em base64 (pode ser nula)
    data_postagem DATETIME       DEFAULT NOW()
);

-- 3. Inserir uma postagem de exemplo para testar
INSERT INTO postagens (titulo, autor, conteudo) VALUES
    ('Bem-vindo ao EcoPonto!', 'Administrador', 'Esta é a primeira postagem do blog EcoPonto. Use esta área para compartilhar novidades, dicas de reciclagem e atualizações do sistema.');

-- ============================================================
-- Pronto! Agora inicie o servidor com: node server_postagem.js
-- ============================================================
