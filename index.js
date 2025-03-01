const express = require('express')
const { getConection } = require ('./db/db-connection-mongo')
const app = express()
const port = 4000


getConection();

app.use('./moduloDirector', require('./routes/moduloDirector'))

app.listen(port, () =>{
    console.log(`example app listening on port ${port}`)
})

