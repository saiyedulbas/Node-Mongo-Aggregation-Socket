const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const https = require('https');
const ProductRouter = require('./routes/product')
const socketIO = require('socket.io');
var cors = require('cors');
const fs = require('fs');
const options = {
    key:fs.readFileSync('certificates/key.pem'),
    cert:fs.readFileSync('certificates/cert.pem',{encoding: 'utf-8'}),
}



mongoose.connect('mongodb://0.0.0.0:27017/aggregation',{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',(err) =>{
    console.log(err)
})

db.once('open',() => {
    console.log('Database Connection Established!')
})

const app = express()
app.use(cors())
let server = https.createServer(options,app);
let io = socketIO(server);


io.on('connection',(socket) =>{
    socket.emit('init','Bismillah')

    socket.on('refresh',data =>{
        console.log(data);
        socket.emit('refresh2','i am in refresh2')
    })

    socket.on('update',data =>{
        console.log(data);
        socket.emit('update2',data)
    })

})


app.use(express.static(path.join(__dirname, 'routes')));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 80





server.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})




app.use('/api/products',ProductRouter)