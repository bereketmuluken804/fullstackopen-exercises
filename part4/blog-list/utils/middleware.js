import logger from "./logger.js"

const requestLogger = (req, res, next) => {
  const body = req.body || " " 
  logger.info(req.method , req.path, body)
  next();
}

const unknownEndpont = (req, res)=>{
  res.status(404).send({error: "Unknown endpont"})
}

const errorLogger = (error, req, res, next)=>{
  logger.error(error.message)

  if(error.name === "ValidationError"){
    res.status(400).json({error: error.message})
  }
  if(error.name === "CastError"){
    res.status(400).json({error: "malformatted id"})
  }
  next(error)
}


export {unknownEndpont, errorLogger, requestLogger};