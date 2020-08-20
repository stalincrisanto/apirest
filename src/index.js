const express = require ('express');
const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000);

//middleware
app.use(express.json());

//rutas
app.use(require('./routes/productos'));

//servidor
app.listen(app.get('port'),()=>{
    console.log("SERVER ON PORT",app.get('port'))
});