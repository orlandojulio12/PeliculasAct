//Get
const { Router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloDirector = require('../models/ModuloDirector');

const router = Router();

router.get('/', async function (req, res) {
    try{
        const director = await ModuloDirector.find();
        res.send(director);
    }
    catch(error ){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
})

module.exports = router;