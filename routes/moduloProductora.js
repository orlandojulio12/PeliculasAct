//Get
const { router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloProductora = require('../models/ModuloGenero');

const router = Router();

router.get('/', async function (req, res) {
    try{
        const productora = await ModuloProductora.find();
        res.send(productora);
    }
    catch(error ){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
})

module.exports = router;