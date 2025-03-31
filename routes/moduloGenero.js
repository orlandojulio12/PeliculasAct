const mongoose = require('mongoose');
const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const ModuloGenero = require('../models/ModuloGenero');

const router = Router();

// Middleware para validar ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: 'ID inválido'
        });
    }
    next();
};

// POST - Crear género (Versión mejorada)
router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty().trim(),
    check('estado', 'El estado es requerido').isIn(['activo', 'inactivo'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Validar si el género ya existe
        const existeGenero = await ModuloGenero.findOne({ nombre: req.body.nombre });
        if (existeGenero) {
            return res.status(400).json({
                success: false,
                message: 'El género ya existe'
            });
        }

        const nuevoGenero = new ModuloGenero({
            nombre: req.body.nombre,
            estado: req.body.estado,
            descripcion: req.body.descripcion || '',
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        const generoGuardado = await nuevoGenero.save();
        
        res.status(201).json({
            success: true,
            data: generoGuardado
        });
    } catch (error) {
        console.error('Error al crear género:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear el género',
            error: error.message // Asegúrate de enviar el mensaje de error
        });
    }
});

// PUT - Actualizar género (Versión mejorada)
router.put('/:id', [
    check('nombre', 'El nombre es requerido').not().isEmpty().trim(),
    check('estado', 'El estado es requerido').isIn(['activo', 'inactivo'])
], validateObjectId, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const generoActualizado = await ModuloGenero.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    nombre: req.body.nombre,
                    estado: req.body.estado,
                    descripcion: req.body.descripcion,
                    fechaActualizacion: new Date()
                }
            },
            { new: true, session }
        );

        if (!generoActualizado) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        await session.commitTransaction();
        res.json({
            success: true,
            data: generoActualizado
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error en transacción:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el género',
            error: error.message
        });
    } finally {
        session.endSession();
    }
});

// DELETE - Eliminar género (Versión mejorada)
router.delete('/:id', validateObjectId, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const generoEliminado = await ModuloGenero.findByIdAndDelete(
            req.params.id,
            { session }
        );
        
        if (!generoEliminado) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Género no encontrado'
            });
        }

        await session.commitTransaction();
        res.json({
            success: true,
            message: 'Género eliminado correctamente'
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Error en transacción:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el género',
            error: error.message
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;