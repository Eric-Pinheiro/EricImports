import express from 'express'
const router = express.Router()
import Produto from '../models/Produto.js'
import Auth from '../middleware/Auth.js'

// ROTA PRODUTOS
router.get("/produtos", Auth,function(req,res){
    Produto.findAll().then(produtos=>{
        res.render("produtos", {
            produtos: produtos
        })
    })
})
router.post("/produtos/new", Auth,(req,res)=>{
const nome = req.body.nome
    const preco = req.body.preco
const categoria = req.body.categoria
Produto.create({
    nome:nome, preco:preco, categoria:categoria
}).then(()=>{
    res.redirect("/produtos")
})
})
router.get("/produtos/delete/:id", Auth,(req,res)=>{
    //coletar o id da url
    const id = req.params.id
    //metodo para excluir
    Produto.destroy({
        where: {
            id:id
        }
    }).then(()=>{
        res.redirect("/produtos")
    }).catch(error =>{
        console.log(error)
    })
    })
    router.get("/produtos/edit/:id",Auth, (req, res)=>{
        const id = req.params.id
       Produto.findByPk(id).then((produto)=>{
           res.render("produtosEdit", {
            produto:produto
           })
       }).catch(error =>{
        console.log(error)
    })
    })
    //rota de alteração
    router.post("/produtos/update",Auth, (req,res)=>{
       const id = req.body.id;
       const nome = req.body.nome;
       const preco = req.body.preco;
       const categoria = req.body.categoria;
       Produto.update({
        nome:nome, 
        preco:preco, 
        categoria: categoria 
       },
       {where:{id:id}}
    ).then(()=>{{
        res.redirect("/produtos")
       }}).catch((error)=>{
        console.log(error)
       })
    })
    export default router