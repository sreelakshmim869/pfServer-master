// loads .env file content
require('dotenv').config()
const express= require('express')
const cors = require('cors') 
const router = require(`./Routes/router`)
// const appMiddleware = require('./Controllers/Middleware/appMiddleware')
// Creates an Express application
require('./Controllers/DB/connection')
const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
const PORT = 4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server started at port: ${PORT} and waiting for client requests!!!!`);
})
// http get request resolving to http://localhost:400/
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Fair Server Started and waiting for client requests!!</h1>`)
})
