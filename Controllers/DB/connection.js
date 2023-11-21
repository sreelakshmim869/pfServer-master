const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongos atlas is successfully connected with pfserver");
}).catch((err)=>{
    console.log(`Mongo connected failde !!!! error:${err}`);
})