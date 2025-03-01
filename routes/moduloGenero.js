//Get
const { router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloGenero = require('../models/ModuloGenero');

const router = Router();

router.get('/', async function (req, res) {
    try{
        const genero = await ModuloGenero.find();
        res.send(genero);
    }
    catch(error ){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
})

module.exports = router;