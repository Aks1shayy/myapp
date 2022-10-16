const jwt = require('jsonwebtoken')
const Userdb = require('../model/model')


exports.create = (req,res)=>{
    if (Object.keys(req.body).length === 0) {
        res.status(204).send({message:"Content cannot be empty"})
        return
      }
    const user= new Userdb({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
    })
    user.save(user)
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
        res.status(400).send({message:err})
    })
}

exports.findall = (req,res)=>{
    Userdb.find()
    .then(data=>{
        res.status(200).send(data)
        console.log("fetch successfull")
    })
    .catch(err=>{
        console.log(err)
        res.send("error while fetch")
    })
}

exports.update = async (req,res)=>{
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "data to update empty" })
        return;
    }
    try{
        const id = req.params.id
        var data = await Userdb.findByIdAndUpdate(id,req.body,{ new: true})
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(400).send({ message: "error while update" })
    }
}

exports.delete =async (req,res)=>{
    try{
        const id = req.params.id
        var data = await Userdb.findByIdAndDelete(id)
        if(data==null) res.send("User doesn't exist")
        else res.json(data)
    }catch(err){
        console.log(err)
        res.status(400).send({ message: "error while update" })
    }
}

exports.find = async (req,res)=>{
    try{
        key=req.params.fname
        console.log(key)
        var data = await Userdb.find({fname : {'$regex': key, $options:'i'} } )
        if(data==null) res.send("User doesn't exist")
        else res.json(data)
    }catch(err){
        console.log(err)
        res.status(400).send({ message: "error while fetching" })
    }  
}

exports.login = async(req,res)=>{
    try{
    
    const email=req.body.email
    const pswrd=req.body.password
    const data =await  Userdb.findOne({ email : email})
    if(data===null) {
        res.status(401).send("User email doesn't exist")
         return}
    if(data.password === pswrd){
        
        const payload={ id : data.id }
        const token = jwt.sign(payload, "key",{expiresIn:"1d"})
        res.status(200).send({
            data,
            message :"Valid user",
            token  :"Bearer " + token})
    }

    else return res.status(401).send("wrong password")
}
catch(err){
    console.log(err)
}
   
}

exports.register = (req,res)=>{
    if (Object.keys(req.body).length === 0) {
        res.status(204).send({message:"Content cannot be empty"})
        return
      }
    const user= new Userdb({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        admin : req.body.admin
    })
    user.save(user)
    .then(data=>{
        res.status(200).send("User registered successfully")
    }).catch(err=>{
        console.log(err)
        res.status(400).send({message:err})
    })
}