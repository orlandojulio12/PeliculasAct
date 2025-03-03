const { Router } = require ('express');
const { validationResult, check } = require('express-validator');
const ModuloDirector = require('../models/ModuloDirector');

const router = Router();


//POST
router.post('/',
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('estado', 'El estado debe ser "activo" o "inactivo"').isIn(['activo', 'inactivo'])

    ],

    async function (req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ message: errors.array()})
            }
            let moduloDirector = new ModuloDirector();

            moduloDirector.nombre = req.body.nombre;
            moduloDirector.estado =  req.body.estado;
            moduloDirector.fechaCreacion = new Date();  
            moduloDirector.fechaActualizacion = new Date();

            moduloDirector = await moduloDirector.save();
            
            res.send(moduloDirector);
        }
        catch(error){
            console.log(error),
            res.status('ha ocurrido un error')

        }

    
});



//PUT
router.put('/:moduloDirectorId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['activo', 'inactivo'])
    ],

    async function(req, res){
        try{
            let moduloDirector = await moduloDirector.findById(req.moduloDirectorId);
            if(!moduloDirector){
                return res.send('director no existe');
            }
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ message: errors.array() })
            }

            moduloDirector.nombre = req.body.nombre;
            moduloDirector.estado =  req.body.estado;
            moduloDirector.fechaActualizacion = new Date();
            moduloDirector = await moduloDirector.save();
            
            res.send(moduloDirector);

        }catch(error){
            console.log(error),
            res.status('ha ocurrido un error')

        }
    
});

//GET
router.get('/', async function (req, res) {
    try{
        const director = await ModuloDirector.find();
        res.send(director);
    }
    catch(error){
        console.log(error);
        res.status(500).send('ocurrio un error')
    }
});

module.exports = router;