import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js"

const Pedido = connection.define('Pedidos', {
    nome:{
    type: Sequelize.STRING,
    allowNull:false,

}, preco:{
type: Sequelize.STRING, 
allowNull:false

}, categoria:{
    type: Sequelize.STRING, 
    allowNull:false
}
});
//não força a criação da tabela caso já exista
Pedido.sync({force:false})
export default Pedido

// nome , preço, categoria