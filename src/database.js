const mysql = require ('mysql');
const mysqlConexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tienda'
});

mysqlConexion.connect(function (err){
    if(err)
    {
        console.log(err);
        return;
    }
    else
    {
        console.log("CONECTADO");
    }
});

module.exports = mysqlConexion;