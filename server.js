const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

//Configuração do Servidor
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());//Necessário para o carrinho de compras (JSON)
app.use(express.static('.'));//Serve seus arquivos HTML, CSS e imagens

//Conexão com o banco de Dados
const db = new sqlite3.Database('.sissenai.db');

//inicialização das tabelas (cria apenas se não existire)
db.serialize(() =>{
  //Tabela de clientes
db.run(`CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  cpf TEXT,
  telefone TEXT
  )`);

//---ROTAS DE CLIENTES---
app.post('/salvar-cliente',(req,res)=>{
  const{ nome, cpf, telefone }=req.body;
  db.run(`INSERT INTO clientes (nome, cpf, telefone) VALUES (?,?,?)`, [nome, cpf, telefone],(err) =>{
    if (err) return res.status(500).send(err,message);
    res.redirect('/clientes.html');
  });
});

//iniciar Servidor
const PORT = 300;
app.listen(PORT,() =>{
  console.log(`=========================================`);
  console.log(`SISSENAI RODANDO EM: http://localhorost:${PORT}`);
  console.log(`=========================================`);
});
