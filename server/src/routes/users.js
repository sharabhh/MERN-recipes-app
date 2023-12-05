import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username:username});

    if(user){
    return res.json({message : "user already exists!"});
    }
  // res.json(user)

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new UserModel({username: username, password: hashedPassword})
  await newUser.save().then(console.log('user created'))

res.json({message : "User Registered succesfully!"})

  } catch (err) {
    console.log(err);
  }
});

router.get("/register", (req, res) => {
  // res.json('Hi')
  res.send("Hi");
});

router.post("/login", async (req,res)=>{
  const {username, password} = req.body
;
const user = await UserModel.findOne({username})
if(!user){
  return res.json({message: "User doesn't exist"})
}
const isPasswordValid = await bcrypt.compare(password, user.password)

if(!isPasswordValid){
  return res.json({message: "Incorrect credentials"})
}

const token = jwt.sign({id: user._id}, "secret");
res.json({token, userID: user._id})


});

export { router as userRouter };


export function verifyToken(req,res, next){
const token = req.headers.authorization;
if(token){
  jwt.verify(token,"secret", (err)=>{
    if(err) return res.sendStatus(403);
  next();
  })
} else{
  res.sendStatus(401);
}
}