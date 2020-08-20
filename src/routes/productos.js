const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const mysqlConexion = require('../database');

router.get('/',(req,res)=>{
    mysqlConexion.query("SELECT * FROM producto",(err,rows,fields)=>{
        if(!err)
        {
            res.json(rows);
        }
        else
        {
            console.log(err);
        }
    });
});

router.get('/:cod',(req,res)=>{
    const{cod} = req.params;
    console.log(cod);
    mysqlConexion.query("SELECT * FROM producto WHERE COD_PRODUCTO=?",[cod],(err,rows,field)=>{
        if(!err)
        {
            res.json(rows[0]);
        }
        else
        {
            console.log(err);
        }
    });
});

router.post('/',(req,res)=>{

    const{nombre,precio,fecha_caducidad,descripcion} = req.body;
    mysqlConexion.query("INSERT INTO producto (NOMBRE,PRECIO,FECHA_CADUCIDAD,DESCRIPCION) VALUES (?,?,?,?)",
                        [nombre,precio,fecha_caducidad,descripcion],(err,rows,fields)=>{
                            if(!err)
                            {
                                res.json({Status:'Producto añadido'});
                            }
                            else
                            {
                                console.log(err);
                            }
                        });
    /**const sql = 'INSERT INTO producto SET ?';
    const producto = {
        nombre:req.body.nombre,
        precio:req.body.precio,
        fecha_caducidad:req.body.fecha_caducidad,
        descripcion:req.body.descripcion
    };
    mysqlConexion.query(sql,producto,(err,rows,fields)=>
    {
        if(!err)
        {
            res.json({Status:'Producto añadido'});
        }
        else
        {
            console.log(err); 
        }
    });**/
});

router.put('/:cod',(req,res)=>{
    const {nombre,precio,fecha_caducidad,descripcion} = req.body;
    const {cod} = req.params;
    const sql = "UPDATE producto SET NOMBRE=?,PRECIO=?,FECHA_CADUCIDAD=?,DESCRIPCION=? WHERE COD_PRODUCTO=?";
    mysqlConexion.query(sql,[nombre,precio,fecha_caducidad,descripcion,cod],(err,rows,fields)=>{
        if(!err)
        {
            res.json({Status:'Producto actualizado'});
        }
        else
        {
            console.log(err);
        }
    });
});

router.delete('/:cod',(req,res)=>{
    const{cod}=req.params;
    const query = "DELETE FROM producto WHERE COD_PRODUCTO=?";
    mysqlConexion.query(query,[cod],(err,rows,fields)=>{
        if(!err)
        {
            res.json({Status:'Producto eliminado'});
        }
        else
        {
            console.log(err);
        }
    });
});

module.exports = router;