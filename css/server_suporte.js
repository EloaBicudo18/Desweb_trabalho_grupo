const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '',
    database: 'loja_suporte' // Banco específico de suporte
});

app.get('/suporte', (req, res) => {
    db.query('SELECT * FROM suporte ORDER BY data_envio DESC', (err, results) => res.json(results));
});

app.post('/suporte', (req, res) => {
    const { nome, email, mensagem } = req.body;
    db.query('INSERT INTO suporte (nome, email, mensagem) VALUES (?, ?, ?)', 
    [nome, email, mensagem], () => res.send("Mensagem enviada!"));
});

// ATENÇÃO: Use uma porta diferente para não dar conflito!
app.listen(3008, () => console.log("Servidor SUPORTE rodando na porta 3008"));