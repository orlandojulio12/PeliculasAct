const mongoose = require('mongoose');

const getConection = async () => {
    try{
        const url = 'mongodb+srv://eduin_padilla:edwinpa1015m@apppeliculas.3vdbm.mongodb.net/appweb?retryWrites=true&w=majority&appName=AppPeliculas'

        await mongoose.connect(url)

        console.log('coneccion exitosa');
    }
    catch(error){
        console.log(error)
    }
    
}

module.exports = {
    getConection,
}