const express = require('express')
const rounter = new express.Router

const User = require('../models/user')
const router = require('./task')
const auth = require('../middlewear/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')

rounter.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findbyCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }   
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})


rounter.get('/users/me',auth, async(req,res)=>{
    res.send(req.user)

})

// rounter.get('/users/:id',async(req,res)=>{
//     const _id = req.params.id

//     try{
//         const result = await User.findById({_id})
//         if(!result){
//             return res.status(404).send()
//         }
//         res.send(result)
//     }catch(e){
//         res.status(404).send(e)
//     }
// })


rounter.patch('/users/me', auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['name','email','age','password']
    const isValidRequest = updates.every((update)=>allowUpdates.includes(update))

    if(!isValidRequest){
        return res.status(404).send({error: 'Invalid Update'})
    }

    try{
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})


rounter.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendCancelEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})


const upload  = multer({
    limits:{
        fileSize:1000000 //1mb
    },
    fileFilter(req,file,cb){

        //for doc file
        //if(!file.originalname.match(/\.(doc|docx)$/)){

        //for jpeg and png
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image file'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    const buffer =await sharp(req.file.buffer).resize({width:200,height:200}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    
    }catch(e){

    }
})

module.exports = rounter