import express from 'express'
const router = express.Router()
import Pedido from "../models/Pedido.js"
import { where } from 'sequelize'
import Auth from '../middleware/Auth.js'

// ROTA PEDIDOS
router.get("/pedidos",Auth,function(req,res){
   Pedido.findAll().then(pedidos=>{
    res.render("pedidos", {pedidos:pedidos})
   })
})

router.post("/pedidos/new",Auth, (req,res)=>{
   const nome = req.body.nome
   const preco = req.body.preco
   const categoria = req.body.categoria
   Pedido.create({
      nome:nome,
      preco:preco,
      categoria:categoria
   }).then(()=>{
      res.redirect("/pedidos")
   })
})
router.get("/pedidos/delete/:id",Auth, (req,res)=> {
   const id = req.params.id
   Pedido.destroy({
      where: {
         id:id
      }
   }).then(()=>{
res.redirect("/pedidos")
   })
})

router.get("/pedidos/edit/:id",Auth, (req, res)=>{
    const id = req.params.id
   Pedido.findByPk(id).then((pedido)=>{
       res.render("pedidosEdit", {
        pedido:pedido
       })
   }).catch(error =>{
    console.log(error)
})
})
//rota de alteração
router.post("/pedidos/update",Auth, (req,res)=>{
   const id = req.body.id;
   const nome = req.body.nome;
   const preco = req.body.preco;
   const categoria = req.body.categoria;
   Pedido.update({
    nome:nome, 
    preco:preco, 
    categoria: categoria 
   },
   {where:{id:id}}
).then(()=>{{
    res.redirect("/pedidos")
   }}).catch((error)=>{
    console.log(error)
   })
})

export default router

