//Get
const { Router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloGenero = require('../models/ModuloGenero');

const router = Router();

//POST
router.post('/',
    [
        check('nombre', 'nombre es requerido').not().isEmpty(),
        check('estado', 'estado es requerido').isIn(['activo', 'inactivo']),
        
    ],

    async function(req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpy()){
                return res.estatus(400).json({message : errors.array()});
            }

            let moduloGenero = new ModuloGenero();

            moduloGenero.nombre = req.body.nombre;
            moduloGenero.estado = req.body.estado;
            moduloGenero.fechaActualizacion = new Date();
            moduloGenero.descripcion = req.body.descripcion;
            moduloGenero = await  moduloGenero.save();
            res.send(moduloGenero);
        }
        catch(error){
            console.log(error);
            res.status(500).send('ocurrio un error')
        }
    
});

//PUT
router.put('/moduloGeneroId',

    [
        check('nombre', 'nombre es requerido').not().isEmpty(),
        check('estado', 'estado es requerido').isIn(['activo', 'inactivo']),

    ],

    async function(req, res){
        try{
            let moduloGenero = await moduloGenero.fyndById(req.moduloGeneroId);
            if(!moduloGenero){
                return res.send('no existe este genero');
            }
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ message: errors.array() })
            }

            moduloGenero.nombre = req.body.nombre;
            moduloGenero.estado = req.body.estado;
            moduloGenero.fechaCreacion = new Date();
            moduloGenero.fechaActualizacion = new Date();
            moduloGenero.descripcion = req.body.descripcion;
            moduloGenero = await  moduloGenero.save();
            res.send(moduloGenero);
        
        }
        catch(error){
            console.log(error);
            res.status(500).send('ocurrio un error')
        }
});

//GET
router.get('/', async function (req, res) {
    try{
        const genero = await ModuloGenero.find();
        res.send(genero);
    }
    catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
});


module.exports = router;