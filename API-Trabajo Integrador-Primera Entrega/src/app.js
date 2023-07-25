const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const products = require('./routes/products');

const rutaLog = path.resolve(__dirname, './data/log.txt');
//////CONFIGURACIONES//////    
app.use('/',(req, res, next)=> {
    fs.appendFile(rutaLog,req.originalUrl+'\n',(error)=>{
        if(error) {
            console.log('Ha ocurrido un error al procesar los datos!')
        } else {
            console.log('Los datos fueron procesados correctamente')
        }
    })      
    next();
   });
app.use(express.static(path.resolve(__dirname,'../public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//////// RUTAS //////////
app.use('/productos',products);


app.listen(3001, ()=>{
    console.log('Servidor Corriendo en el puerto: http://localhost:3000')
})