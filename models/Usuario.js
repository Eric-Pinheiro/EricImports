import { ConnectionRefusedError, Sequelize } from "sequelize";
import connection from "../config/sequelize-config.js";

const Usuario = connection.define('usuario',{
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
})
Usuario.sync({force: false})
export default Usuario;