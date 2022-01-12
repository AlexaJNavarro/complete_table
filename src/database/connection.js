const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb://localhost:27017/table').then((db)=>{
    console.log("La conexión ha sido exitosa")
}).catch((err)=>{
    console.log(err)
})

module.exports = connection
