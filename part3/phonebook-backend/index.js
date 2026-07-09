import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import Person from './models/person.js';

configDotenv();
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny', {
   skip: (req) => req.method === 'POST'
}))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :body', {
   skip: (req) => req.method !== 'POST',
}))

app.use(cors())
app.use(express.json())

app.get('/info', (req, res) => {
   const date = new Date();
   const day = date.toLocaleDateString('en-US', {weekday: 'short'})
   const month = date.toLocaleDateString('en-US', {month: 'long'})
   const dayNumber = date.getDate();
   const year = date.getFullYear()
   const time = date.toTimeString().split(' ')[0];
   const area = date.toTimeString().split(' ')[1];

   
   const formattedString = `${day} ${month} ${dayNumber} ${year} ${time} ${area}`;
   Person.find({}).then(people=>{
      res.send(`<p>Phonebook has info for <strong>${people.length} people</strong> </p><p>${formattedString}</p>`)
   }).catch(err=>{
      res.status(500).json({error: err.message})
   })
})


app.get('/api/persons', (req, res) => {
   Person.find({}).then(people=>{
      res.json(people)
   })
})

app.get('/api/persons/:id', (req, res) => {
   const id = req.params.id
   Person.findById(id).then(person=>{
      if(person)
      res.json(person)
   else  
      res.status(404).json({error: "person not found"})
   }).catch(err=>{
      res.status(400).json({error: 'malformatted id'})
   })
})

app.post('/api/persons', (req, res, next) => {
   const body = req.body
   // if(!body.number || !body.name)
   //    return res.status(400).json({error: 'name or number missing'})
   
   Person.findOne({name: body.name, number: body.number}).then(dubPerson=>{
      if(dubPerson)
         return res.status(400).json({error: "name must be unique"})

      const newPerson = new Person({
            name: body.name,
            number: body.number
         })
      return newPerson.save()

   }).then(savedPerson=>{
      if(savedPerson)
         res.json(savedPerson)
      
   }).catch(err=>next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
   const id = req.params.id;
   Person.findByIdAndDelete(id).then(person=>{
      res.status(204).end()
   }).catch(err=>next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
   const { name, number } = req.body
   if(!name || !number){
      return res.status(400).json({error: "missing name or phone number"})
   }
   const id = req.params.id
   Person.findById(id).then(person=>{
      if(!person){
         return res.status(404).json({error: "Person not found"})
      }
      person.name = name;
      person.number = number;

      return person.save()
   }).then(savedPerson=>{
      if (savedPerson){
         res.json(savedPerson)
      }
   }).catch(err=>next(err))
})

const unknownEndpoint = (req, res) => {
   res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next)=>{
   if(error.name === "CastError"){
      res.status(400).json({error: "mallformatted id"})   
   }
   if(error.name === "ValidationError"){
      res.status(400).json({error: error.message})
   }
}
app.use(errorHandler)
app.listen(PORT)

console.log(`Server running on http://localhost:${PORT}`);
