const express = require('express')
const Task = require('../models/task')
const auth = require('../middlewear/auth')
const router = new express.Router

router.post('/tasks',auth, async(req,res)=>{
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try{
        console.log(task)
        const result = await task.save()
        res.status(201).send(result)
    }catch(e){
        res.status(500).send(e)
    }
})

// GET /task?completed=true
// GET /task?limit=2&skip=0
// GET task?sortBy=createdAt:desc
router.get('/tasks',auth, async(req,res)=>{

    const match = {owner:req.user._id}
    const sort = {}

    //filter by completed tag
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    //sorting
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    

    try{
        const tasks = await Task.find(match,null,{
            limit: parseInt(req.query.limit),
            skip : parseInt(req.query.skip),
            sort : sort
        })
        res.send(tasks)
        
    }catch(e){
        res.status(400).send(e)
    }        
})


router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        //const task =await Task.findById({_id})
        const task = await Task.findOne({_id, owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/tasks/:id',auth, async(req,res)=>{
    try{
        const updates = Object.keys(req.body)
        const allowUpdates = ['description','completed']
        const isValidRequest = updates.every((update)=>allowUpdates.includes(update))
        console.log(req.body)

        if(!isValidRequest){
            return res.status(400).send({'error':'Invalid Update'})
        }

        const task = await Task.findOne({_id : req.params.id, owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()

        return res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',auth, async(req,res)=>{
    try{

        const task = await Task.findOneAndDelete({_id : req.params.id, owner : req.user._id})

        if(!task){
            return res.status(400).send()
        }

        res.status(200).send(task)
        
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router