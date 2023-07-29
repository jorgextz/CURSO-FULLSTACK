const path = require('path');
const fs = require('fs');

let rutaJson = path.join(__dirname,'../data/products.json');

let dataJson = fs.readFileSync(rutaJson, 'utf8');

let jsonObject = JSON.parse(dataJson);


const controller = {
    listar: (req,res)=>{
        res.json(jsonObject);
    },

    detalle: (req,res)=>{
        let textoRecibido = req.body.texto.toLowerCase();
    
        let detalle = jsonObject.filter((elemento)=>{
            let frase = elemento.name.toLowerCase();
            return frase.indexOf(textoRecibido)!= -1;
        })

        res.json(detalle);
        
        console.log(detalle);
    },

    crear: (req,res)=>{
        console.log(req.body);
        let product = {};
        
        product.id = jsonObject.length+1;
        product.name = req.body.name;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.category = req.body.category;
        product.description = req.body.description;
        product.image = req.body.image;

        console.log(product);
        jsonObject.push(product);
        let newDataJson = JSON.stringify(jsonObject,null,4);
        fs.writeFileSync(rutaJson,newDataJson);
        
        res.status(201).json(product);
    }

};

module.exports = controller; 