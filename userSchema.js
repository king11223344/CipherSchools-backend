import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  userName: String,
  password: String,
  webLinks:{
    linkedin: String,
    github: String,
    twitter: String,
    facebook: String,
    instagram: String,
    website: String,
  },
  profInfo:{
    education: String,
    profession: String,
  },
  aboutYou: String,
  follower:[]
  
});

export default mongoose.model("User", userSchema);
// {email:{
//     message: String,
//     name: String,
//     timestamp: String,
//     received: Boolean,
//   }},
