const mongoose = require('mongoose')
const validator = require('validator')

var taskSchema = new mongoose.Schema({
    description : {
        type:String,
        trim : true,
        required : true
    },
    completed : {
        type:Boolean,
        default : false
    
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        required : true

    }
},{
    timestamps:true
})

var Task = mongoose.model('Task',taskSchema)

module.exports = Task