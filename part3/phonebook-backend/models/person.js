import mongoose from "mongoose";
import { configDotenv } from "dotenv";
mongoose.set('strictQuery', false)

configDotenv()
const url = process.env.MONGODB_URI

mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObj)=>{
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Person = mongoose.model('Person', personSchema)
export default Person;