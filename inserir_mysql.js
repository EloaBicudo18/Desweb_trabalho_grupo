const mysql = require('mysql');

// Configuração da conexão
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_adm',
    port: 3306
});

// Conectar ao banco de dados
connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar:', error.stack);
        return;
    }
    console.log('Conectado com o ID ' + connection.threadId);
});

// Dados do usuário
const user = {
    nome_adm: 'Renato',
    senha_adm: 20,
    email_adm: 'renato@uscs.com',
    papel_adm: 'blog'
};

// Inserir o usuário
const query = 'INSERT INTO ADMINISTRADOR SET ?';
connection.query(query, user, (error, results, fields) => {
    if (error) {
        console.error('Erro ao inserir Administrador:', error);
        return;
    }
    console.log('Administrador inserido com sucesso! ID:', results.insertId);
});

// Encerrar a conexão
connection.end();