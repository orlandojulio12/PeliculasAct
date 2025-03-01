//Get
const { router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloMedia = require('../models/ModuloGenero');

const router = Router();

router.get('/', async function (req, res) {
    try{
        const media = await ModuloMedia.find();
        res.send(media);
    }
    catch(error ){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
})

module.exports = router;