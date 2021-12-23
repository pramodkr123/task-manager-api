// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const {MongoClient, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect database!')
    }

    console.log('Connected Correctly!')
    const db  = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Pramod',
    //     age:30
    // },(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert data')
    //     }

    //     console.log(result)
    // })



    db.collection('users').insertMany([
        {
            name : 'Gautam',
            age:32,
        },
        {
            name : 'Saurabh',
            age:31,
        }
    ],(error,result)=>{
        if(error){
            return console.log('unable to inset the documents!')
        }

        console.log(result)
    })


    // db.collection('tasks').insertMany([
    //     {
    //         description : 'Clean the house',
    //         completed:false,
    //     },
    //     {
    //         description : 'Renew Inspection',
    //         completed:true,
    //     },
    //     {
    //         description : 'Pot Plants',
    //         completed:false,
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('unable to inset the documents!')
    //     }

    //      console.log(result)
    //  })


    // db.collection('tasks').findOne(_id = new ObjectId("61b995ef98fdeb990fb3dd4b"),(error,task)=>{
    //     if(error){
    //         return console.log('Unbale to find task')
    //     }

    //     console.log(task)
    // })


    // db.collection('tasks').find({completed : true}).toArray((error,tasks)=>{
    //     if(error){
    //         return console.log('Unbale to find task')
    //     }

    //     console.log(tasks)
    // })


})