const express = require ('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../controllers/productsControllers');


router.get('/listar', controller.listar);
router.get('/detalle', controller.detalle);
router.post('/crear', controller.crear);



module.exports = router;