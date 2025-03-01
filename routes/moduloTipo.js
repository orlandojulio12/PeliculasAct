//Get
const { router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloTipo = require('../models/ModuloGenero');

const router = Router();

router.get('/', async function (req, res) {
    try{
        const tipo = await ModuloTipo.find();
        res.send(tipo);
    }
    catch(error ){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
})

module.exports = router;