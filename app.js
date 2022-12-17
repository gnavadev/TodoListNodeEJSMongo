import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true})); //middleware para comunicar ciclo request-response
app.set('view engine', 'ejs') //setando view engine
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/requestDB', {useNewUrlParser: true, useUnifiedTopology: true}) //Conexão com o banco
const requestSchema = mongoose.Schema({
    item: String //O que vai estar dentro do model
})

const Request = mongoose.model('Request', requestSchema) //Model


app.get('/', function(req, res){

    Request.find(function(err, found){ //pega tudo o que tem no banco
        if (err){
            console.log(err); //Se tem erro mostra um erro no console
        } else {
            res.render('home', {items: found}) //Se nao, renderiza a home page com a variavel que tem que ser encontrada, tudo o que foi encontrado no banco agora está na variável
        }
    })
})

app.post("/", function(req, res){

    const input = req.body.input //Pega o que foi escrito no input

    const newList = new Request({
        item: input  //Faz o request pro banco
    })
    newList.save(function(err){ //Salva a lista no banco
        if(err) {
            console.log(err);   //se der erro mostra no console
        } else {

        }
    })
})


app.post('/delete', function(req, res){

    const item = req.body.checkbox //pega o id lá do home.ejs

    Request.findByIdAndRemove(item, function(err){ //acho o id do item no banco, ele é setado la no input em home.ejs, e remove o mesmo
        if(err) {
            console.log(err);    //se tem um erro retorna um erro no console
        } else {
            res.redirect('/')  //se nao, redireciona para a home
        }
    })
})


app.listen(PORT, function(){
    console.log("listening on http:/localhost" + PORT);
})
