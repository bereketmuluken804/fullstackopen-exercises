import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  name:String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
})

userSchema.set("toJSON", {
  transform: (document, returnedObj) =>{
    returnedObj.id = returnedObj._id;
    delete returnedObj.password;
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

const User = mongoose.model("User", userSchema);

export default User;
