import exp from "express";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
config();
const { sign } = jwt;
export const commonApp = exp.Router();

// REGISTER
commonApp.post("/register", async (req, res) => {

  try {

    const newUser = req.body;

    // CHECK EMAIL
    const emailExists =
      await UserModel.findOne({
        email: newUser.email,
      });

    if (emailExists) {

      return res.status(400).json({
        message: "Email already exists",
      });

    }

    // CHECK USERNAME
    const usernameExists =
      await UserModel.findOne({
        username: newUser.username,
      });

    if (usernameExists) {

      return res.status(400).json({
        message: "Username already exists",
      });

    }

    // HASH PASSWORD
    newUser.password =
      await hash(newUser.password, 12);

    // SAVE USER
    await new UserModel(newUser).save();

    res.status(201).json({
      message: "Registered Successfully",
    });

  }

  catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});
// LOGIN
commonApp.post("/login", async (req, res) => {

  try {
    const {identifier,password, } = req.body;

    // FIND BY EMAIL
    let user =await UserModel.findOne({email: identifier,});
    // FIND BY USERNAME
    if (!user) {
      user =await UserModel.findOne({ username: identifier,});
    }
    // USER NOT FOUND
    if (!user) {
      return res.status(400).json({message: "Invalid Username or Email", });

    }

    // PASSWORD CHECK
    const matched =await compare(password, user.password);
    if (!matched) {
      return res.status(400).json({
        message: "Invalid Password",
      });

    }
    // TOKEN
    const token = sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET_KEY,

      {
        expiresIn: "1h",
      }

    );
    // COOKIE
    res.cookie("token", token, {

      httpOnly: true,
      secure: false,
      sameSite: "lax",

    });
    // REMOVE PASSWORD
    let userObj =user.toObject();
    delete userObj.password;
    res.status(200).json({
      message: "Login Success",
      payload: userObj,
    });
  }
  catch (err) {res.status(500).json({message: err.message,});
  }

});
// LOGOUT
commonApp.get("/logout",async(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
    });
    res.status(200).json({message:"Logout Success"});
})