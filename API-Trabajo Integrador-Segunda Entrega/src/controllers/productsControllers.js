const Product = require('../database/models/Product')

const controller = {
    listar: async(req,res)=>{
        let products = await Product.find({});
        
        res.status(200).json(products);
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

    crear: async(req,res)=>{
        try {
            let product = {
                name : req.body.name,
                price : req.body.price,
                discount : req.body.discount,
                category : req.body.category,
                description : req.body.description,
                image : req.file.filename
                };

            let productData = await Product.create(product);
            res.status(201).json(productData);
        }
        catch(error) {
            console.log(error);
            if(error.errors.name) {
                res.status(400).json({message: 'Falta el campo name'})
            } else {
                res.status(500).json({message: 'Internal Server Error!'})
            }
        }
    },
    update: async(req,res) => {
        let product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(product);
    }

};

module.exports = controller; 