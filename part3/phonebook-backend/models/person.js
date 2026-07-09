import mongoose from "mongoose";
import { configDotenv } from "dotenv";
mongoose.set('strictQuery', false)

configDotenv()
const url = process.env.MONGODB_URI

mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "min length is 3"],
    required: true
  },
  number: {
    type: String,
    validate:{
      validator: function (v){
        return /\d{2}-\d$/.test(v) || /\d{3}-\d$/.test(v)
      },
      message: props => `${props.value} is not a valide phone number`
    },
    minLength: [9, "min length is 8"],
    maxLength: [11, 'max length is 10'],
    required: true
  }
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