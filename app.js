const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const handlebars = require("express-handlebars").engine
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.post("/cadastrar", function(req,res){
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Erro, ops"+erro)
    })
})

app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/consulta")
    })
  })

app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erros, ops" + erro)
    })
  })

  app.get("/editar/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then(function(post){
        res.render("editar", {post})
    }).catch(function(erro){
        console.log("Erro eita" + erro)
    })
  })

app.listen(8081, function(){
    console.log("O servidor está ativo uhul!!")
})

