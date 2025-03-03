//Get
const { Router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloTipo = require('../models/ModuloTipo');

const router = Router();



//POST
router.post('/',
    [
        check ('nombre', 'nombre.requerido').not().isEmpty(),

    ],

    async function (req, res) {

        try{
            const errors = validationResult(req);
            if(!erros.isEmpty()){
                return res.status(400).json({messaje : errors.array})
            }

            let moduloTipo	= new ModuloTipo();

            moduloTipo.nombre = req.body.nombre;
            moduloTipo.fechaCreacion = new Date();
            moduloTipo.fechaActualizacion = new Date();
            moduloTipo.descripcion = req.body.descripcion;

            moduloTipo = await moduloTipo.save();

            res.send(moduloTipo);
        }

        catch (error){
            console.log(error);
            res.status(500).send('ocurrio un error')
        }
        
    }
);

//PUT
router.put('/moduloTipoID',
    [
        check ('nombre', 'nombre.requerido').not().isEmpty(),

    ],

    async function (req, res) {

        try{
            
            let  moduloTipo = new moduloTipo.findById(req.ModuloTipo)

            if(!moduloTipo){
                return res.send('no esxiste este tipo')
            }

            const errors = validationResult(req);
            if(!errors.isEmpty){
                return res.status(400).json({message : erros.array})
            }

            moduloTipo.nombre = req.body.nombre;
            moduloTipo.fechaActualizacion = new Date();
            moduloTipo.descripcion = req.body.descripcion;

            moduloTipo = await moduloTipo.save();

            res.send(moduloTipo);
        }
        catch(error){
            console.log(error);
            res.status(500).send('ocurrio un error')
        }

        
    
});

//GET
router.get('/', async function (req, res) {
    try{
        const tipo = await ModuloTipo.find();
        res.send(tipo);
    }
    catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
});

module.exports = router;