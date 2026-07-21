import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js";


const userRouter = express.Router();
const secret = process.env.SECRET;
userRouter.get('/users', async (req, res) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1});
  res.json(users)
})

userRouter.post('/login', async (req, res, next)=>{
  try {

    const { username, password } = req.body;
    const user = await User.findOne({username});
    const passCorrect = user === null ? false : await bcrypt.compare(password, user.password)
    if(!(passCorrect && user)){
         return res.status(400).json({error: "invalid username or password"})
      }

    const payload = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(payload, secret);
    res.status(200).json({token, username: user.username, name: user.name})
  
  } catch (error) {
    next(error)
  }
})

userRouter.post("/users", async (req, res, next)=>{
  try {
    const {username, name, password} = req.body
    
    if(!(password && username)){
    return res.status(400).json({error: "missing username or password"})
    }
    if(password.length < 3){
      return res.status(400).json({error: "password must be at least 3 "})
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const user = new User({
      username: username,
      name: name,
      password: hashedPass,
    })

    const savedUser = await user.save();
    res.status(201).json(savedUser);
    
  } catch (error) {
    next(error)
  }

})


export default userRouter;
