import express from "express";
const router = express.Router()
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

router.get("/login", (req,res)=>{
    res.render("login",{loggedOut: true, messages: req.flash()})
})
router.get("/logout",(req,res)=>{
    req.session.usuario = undefined;
    res.redirect("/");
})
router.get("/cadastro", (req,res)=>{
    res.render("cadastro", {loggedOut: true})
})
router.post("/createUsuario", (req,res)=>{
const email = req.body.email;
const senha = req.body.senha;
Usuario.findOne({where:{email:email}}).then((usuario)=>{
    if(usuario == undefined){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(senha, salt)
        Usuario.create({
            email:email,
            senha:hash,
        }).then(()=>{
            res.redirect("/login")
        })
    } else {
        req.flash('danger', "Usuario já cadastrado. Faça login")
  res.redirect("/cadastro")  
}
})    
})
router.post("/authenticate", (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    Usuario.findOne({
        where:{
            email:email,
        }
    }).then((usuario)=>{
        if(usuario != undefined){
            const correct = bcrypt.compareSync(senha, usuario.senha)
            if(correct){
                //autoriza o login se a senha for true
                req.session.usuario = {
                    id:usuario.id,
                    email:usuario.email
                }
                req.flash('success',"Login efetuado com sucesso!")
            res.redirect("/");
            } else{
                req.flash('danger',"Senha invalida, tente novamente")
                res.redirect("login")
            }
            
        } else {
            req.flash('danger',"O usuário informado não existe, tente novamente")
            res.redirect("login")
                
        }
    })
    
    
    })
    export default router;