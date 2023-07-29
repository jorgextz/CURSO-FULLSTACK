const express = require ('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const controller = require('../controllers/productsControllers');

const storageProducts = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.resolve(__dirname, '../../public/images/') );
    },
        
    filename: (req,file,cb)=>{
        const tiempoTranscurrido = Date.now();
        const fecha = new Date (tiempoTranscurrido);
        cb(null, file.fieldname+'-' + fecha.toDateString()+path.extname(file.originalname));
    }
})
const upload = multer({storage:storageProducts});

//// RUTAS A CONTROLLERS////
router.get('/listar', controller.listar);
router.get('/detalle', controller.detalle);
router.post('/crear',upload.single('image'), controller.crear);



module.exports = router;