const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Conexão com o Banco
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_adm', // Garanta que o nome do seu banco está correto aqui
    port: 3306
});

connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar no banco:', error);
        return;
    }
    console.log('Conectado ao MySQL com sucesso!');
});

// [GET] Listar Administradores
app.get("/administrador", (req, res) => {
    connection.query("SELECT * FROM ADMINISTRADOR", (error, results) => {
        if (error) return res.status(500).json(error);
        res.json(results);
    });
});

// [POST] Adicionar Administrador (Modificado para garantir a resposta da Eloá na tela)
app.post("/administrador", (req, res) => {
    const dados = {
        nome_adm: req.body.nome_adm,
        senha_adm: req.body.senha_adm,
        email_adm: req.body.email_adm,
        papel_adm: req.body.papel_adm
    };

    connection.query("INSERT INTO ADMINISTRADOR SET ?", dados, (error, results) => {
        if (error) {
            console.error("Erro no MySQL:", error);
            return res.status(500).json({ error: error.message });
        }
        // Devolve o ID novo para o HTML atualizar a página na hora
        res.status(201).json({ id: results.insertId, ...dados });
    });
});

// [PUT] Atualizar Administrador
app.put("/administrador/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("UPDATE ADMINISTRADOR SET ? WHERE id = ?", [req.body, id], (error) => {
        if (error) return res.status(500).json(error);
        res.json({ id, ...req.body });
    });
});

// [DELETE] Remover Administrador
app.delete("/administrador/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("DELETE FROM ADMINISTRADOR WHERE id = ?", id, (error) => {
        if (error) return res.status(500).json(error);
        res.json({ message: "Removido com sucesso" });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando perfeitamente na porta ${port}`);
});