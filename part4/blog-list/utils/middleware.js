import jwt from "jsonwebtoken"
import logger from "./logger.js"
import User from "../models/user.js"

const requestLogger = (req, res, next) => {
  const body = req.body || " " 
  logger.info(req.method , req.path, body)
  next();
}

const unknownEndpont = (req, res)=>{
  res.status(404).send({error: "Unknown endpont"})
}

const userExtractor = async (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if(authorization && authorization.toLowerCase().startsWith("bearer")){
      const token = authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.SECRET);
      if(!payload.id){
        return res.status(401).json({error: "invalid token"});
      }
      const user = await User.findById(payload.id);
      if(!user){
        return res.status(401).json({error : "user not found"})
      }
      req.user = user;
    }else{
      if(!["GET", "PUT"].includes(req.method)){
        return res.status(401).json({error: "token missing"})
      }
    }
    
  next()
  } catch (error) {
    next(error)
  }
}

 
const errorLogger = (error, req, res, next)=>{
  logger.error(error.message)
  if(error.name === "ValidationError"){
    res.status(400).json({error: error.message})
  }
  if(error.name === "CastError"){
    res.status(400).json({error: "malformatted id"})
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if(error.name === "JsonWebTokenError"){
    return res.status(401).json({error: "authorization required"})
  }
  next(error)
}


export {unknownEndpont, errorLogger, requestLogger, userExtractor};