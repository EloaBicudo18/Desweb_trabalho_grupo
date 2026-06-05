    const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '',
    database: 'loja_pontos' // Banco específico de pontos
});

app.get('/pontos', (req, res) => {
    db.query('SELECT * FROM pontos_coleta', (err, results) => res.json(results));
});

app.post('/pontos', (req, res) => {
    const { local, endereco, cidade, tipo_descarte } = req.body;
    db.query('INSERT INTO pontos_coleta (local, endereco, cidade, tipo_descarte) VALUES (?, ?, ?, ?)', 
    [local, endereco, cidade, tipo_descarte], () => res.send("Cadastrado!"));
});

app.delete('/pontos/:id', (req, res) => {
    db.query('DELETE FROM pontos_coleta WHERE id = ?', [req.params.id], () => res.send("Excluído!"));
});

app.listen(3007, () => console.log("Servidor PONTOS rodando na porta 3007"));