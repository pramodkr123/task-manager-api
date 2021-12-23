
const {MongoClient, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database!')
    }

    console.log('Connected Correctly!')
    const db  = client.db(databaseName)


    db.collection('tasks').deleteOne({
            description : 'Pot Plants'
        }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })


})
