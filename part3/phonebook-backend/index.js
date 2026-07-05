import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
const app = express()
const PORT = 3001

app.use(express.json())
app.use(morgan('tiny', {
   skip: (req) => req.method === 'POST'
}))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :body', {
   skip: (req) => req.method !== 'POST',
}))

const persons = [
   { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(cors())
app.use(express.json())

app.get('/info', (req, res) => {
   const date = new Date();
   const day = date.toLocaleDateString('en-US', {weeday: 'short'})
   const month = date.toLocaleDateString('en-US', {month: 'long'})
   const dayNumber = date.getDate();
   const year = date.getFullYear()
   const time = date.toTimeString().split(' ')[0];
   const area = date.toTimeString().split(' ')[1];

   const formattedString = `${day} ${month} ${dayNumber} ${year} ${time} ${area}`;
   res.send(`<h3>Phonebook has info for ${persons.length} people</h3><h3>${formattedString}</h3>`)
})

app.get('/', (req, res) => {
   res.send("<h1>Base API URL</h1>")
})

app.get('/api/persons', (req, res) => {
   res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
   const id = req.params.id
   const person = persons.find(pers => pers.id === id)
   if(person)
      res.json(person)
   else  
      res.status(404).json({error: "person not found"})
})

app.post('/api/persons', (req, res) => {
   const body = req.body
   if(!body.number || !body.name)
      return res.status(400).json({error: 'name or number missing'})
   const dubPerson = persons.some(per=> per.name === body.name)
   if(dubPerson)
      return res.status(400).json({error: "name must be unique"})

   const newPerson = {
      id: generateId(),
      name: body.name,
      number: body.number
   }
   persons.push(newPerson)
   res.json(newPerson);

})

function generateId() {
   const maxId = persons.length > 0
   ? Math.max(...persons.map(p=>Number(p.id)))
   : 0 
   return String(maxId + 1)
}

const unknownEndpoint = (req, res) => {
   res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)
app.listen(PORT)

console.log(`Server running on http://localhost:${PORT}`);
