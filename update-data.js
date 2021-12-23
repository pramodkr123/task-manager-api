
const {MongoClient, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database!')
    }

    console.log('Connected Correctly!')
    const db  = client.db(databaseName)

    // db.collection('users').updateOne({ 
    //     _id : new ObjectId("61bae58ed0bc0f9a17865dc2")
    // }, {
    //     $set:{
    //         name : 'Ajay'
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


    db.collection('tasks').updateMany({completed : false},{
        $set :{
            completed : true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })







   
})
