const express = require('express')
require('./db/mongoose.js')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.status(503).send('GEt request is disabled now')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Server is currently on maintancance.')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})