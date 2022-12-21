const asyncHandler = require('express-async-handler')
const db = require('../utils/database')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../utils/jwt')

//register user

exports.register = asyncHandler( async (req,res) => {
    let {
        user_role,
        username,
        name,
        password 
    } = req.body

        if(!username){
            res.status(400) 
            throw new Error("Username can not be empty")
        }
        if(!name){
            res.status(400) 
            throw new Error("Name can not be empty")
        }

        if(password.length<6){
            res.status(400) 
            throw new Error("password must be up to 6 characters.") 
        }
    
        const query1 = `SELECT username FROM metadata_users WHERE username='${username}'`
        const userExist = await new Promise((resolve,reject) => {
            db.query(query1,(error,result) => {
                if(error) reject(error)
                resolve(result)
            })
        })

        if(!userExist.length<1){
            res.status(400) 
            throw new Error("username is already taken")
        }

        const token = generateToken(username)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        password = hashedPassword

        const query2 = `INSERT INTO metadata_users(user_role,username,name,password,token)
         VALUES(${user_role},'${username}','${name}','${password}','${token}')`
         await db.query(query2,(err,result)=>{
            if(err) throw err
            res.status(201).json({
               username,name,token 
            })
         })
        res.cookie("token",token,{
            path:"/",
            httpOnly:true,
            expires:new Date(Date.now() + 1000 * 86400), //1day
            sameSite:"none",
            secure:true
        })
    
})
//Login User

exports.login = asyncHandler( async (req,res) => {
    const { username, password } = req.body

    if(!username || !password){
        res.status(400)
        throw new Error("Please fill username and password")
    }
    
    const query1 = `SELECT username,password,user_role FROM metadata_users WHERE username='${username}'`
    const user = await new Promise((resolve,reject) =>{
        db.query(query1,(err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
    if(user.length<1){
        res.status(400)
        throw new Error("Invalid username or password")
    }
    const user_name = user[0].username
    const user_role = user[0].user_role
    const correctPassword = await bcrypt.compare(password,user[0].password)
    if(!correctPassword){
        res.status(400)
        throw new Error("Invalid username or password")
    }

    const token = generateToken(user_name)

    if(user_name && correctPassword){
        res.cookie("token",token,{
            path:"/",
            httpOnly:true,
            expires:new Date(Date.now() + 1000 * 86400), //1day
            sameSite:"none",
            secure:true
        })
        res.status(200).json({
            user_role,username,token
        })
    }else{
        res.status(500)
        throw new Error("Something Went Wrong") 
    }
})

//Logout User

exports.logout = asyncHandler( async (req,res) => {

    res.cookie("token","",{
        path:"/",
        httpOnly:true,
        expires:new Date(0), 
        sameSite:"none",
        secure:true
    })
    res.status(200).json({
        message:"Logout Successful"
    })

})