const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('61bc1cfb2b947940640b8425',({})).then((task)=>{
//     console.log(task)
//     const _id = task._id
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })



const deleteTaskAndCount = async (_id)=>{
    const deleted = await Task.findByIdAndDelete({_id})
    const count = await Task.countDocuments({completed:false})
    return count
}


deleteTaskAndCount('61bc611917e6f00985477340').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
