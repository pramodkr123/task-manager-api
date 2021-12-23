const mongoose = require('mongoose')

//mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true
})



// const me = new User({
//    name :'pramod',
//    email : 'PK@gmail.com',
//     age:29,
//     passoword :'123456'
// })



// const Task = mongoose.model('Task',
// {
//     description :{
//         type:String,
//         required : true,
//         trim : true,

//     },
//     completed :{
//         type:Boolean,
//         default : false
//     }
// })

// const desc = new Task({description:'    Renew Inspection3    ',completed : true})


// desc.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

