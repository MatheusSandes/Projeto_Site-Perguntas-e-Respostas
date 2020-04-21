const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const connection= require("./database/database");
const Pergunta= require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão OK!");
    })
    .catch((msgErro) =>{
        console.log(msgErro);
    })

//Bodyparser 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Estou dizendo para o express usar o EJS como View engine
app.set('view engine', 'ejs');
//para usar o CSS no express, buscar na pasta public o arquivo estático(CSS, imagem, ...)
app.use(express.static('public'));
// o => subistitui o function()

//Rotas
app.get("/", (req, res) =>{
    //SELECT ALL FROM...
    Pergunta.findAll({raw: true, order:[['id', 'DESC'] //ASC crescente, DESC decrescente
    ]}).then(pergunta => {
        res.render("index",{
            pergunta: pergunta
        });
    });
    
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) =>{
    var titulo = req.body.titulo;
    var descricao= req.body.descricao;
    //similar ao INSERT do mysql
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/pergunta/:id", (req, res) =>{
    var id= req.params.id;
    Pergunta.findOne({ //Método para busca do modulo no banco 
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaID: pergunta.id},
                order:[ ['id', 'DESC'] ]
            }).then( respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) =>{
    var corpo= req.body.corpo;
    var perguntaID= req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaID);
    });
});

app.listen(8080, () =>{
    console.log("app rodando");
});