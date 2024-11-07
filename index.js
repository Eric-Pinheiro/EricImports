import express from "express"
const app = express();
import connection from "./config/sequelize-config.js";
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js"
import PedidosController from "./controllers/PedidosController.js";
import UsersController from "./controllers/UsersController.js";
import session from "express-session";
import flash from "express-flash";
import Auth from "./middleware/Auth.js";

app.use(flash())
app.use(session({
  secret:"lojasecret",
  cookie:{maxAge:3600000},
  saveUninitialized: false,
  resave:false
}))

app.use(express.urlencoded())

connection.authenticate().then(()=>{
  console.log("Conexao Realziada com sucesso");
}).catch((error)=>{
  console.log(error)
})

connection.query(`create database if not exists LojaExNode;`).then(()=>{
  console.log("O banco foi criado com sucesso")
}).catch((error)=>{
  console.log(error)
})

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", ClientesController);
app.use("/", ProdutosController);
app.use("/", PedidosController);
app.use("/", UsersController);

app.get("/",Auth, (req, res) => {
  res.render("index", {messages: req.flash()});
});


//config da porta do sistema de loja
const port = 8080;
app.listen(8080, function (error) {
  if (error) {
    console.log(`O erro é: ${error}`);
  } else {
    console.log(`Loja conectada com sucesso. http://localhost:${port}`);
  }
});

