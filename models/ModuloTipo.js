const { Schema, model} = require('mongoose')

const ModuloTipoSchema = Schema ({
    
    nombre: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion:{
        type: Date,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    }

});

module.exports = model(`ModuloTipo`, ModuloTipoSchema);