const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '10mb' })); // Aumenta limite para aceitar imagens em base64
app.use(cors());

// Conexão com o banco de dados de postagens
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja_postagem' // Banco exclusivo da tela de postagens
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco loja_postagem:', err);
        return;
    }
    console.log('Conectado ao banco loja_postagem com sucesso!');
});

// [GET] Listar todas as postagens
app.get('/postagens', (req, res) => {
    db.query('SELECT * FROM postagens ORDER BY data_postagem DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// [POST] Criar nova postagem
app.post('/postagens', (req, res) => {
    const { titulo, autor, conteudo, imagem } = req.body;
    db.query(
        'INSERT INTO postagens (titulo, autor, conteudo, imagem) VALUES (?, ?, ?, ?)',
        [titulo, autor, conteudo, imagem || null],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, titulo, autor, conteudo });
        }
    );
});

// [DELETE] Excluir postagem
app.delete('/postagens/:id', (req, res) => {
    db.query('DELETE FROM postagens WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Postagem excluída com sucesso!' });
    });
});

app.listen(3009, () => console.log('Servidor POSTAGEM rodando na porta 3009'));
