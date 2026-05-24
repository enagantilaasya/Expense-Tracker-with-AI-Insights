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

    const emailExists = await UserModel.findOne({ email: newUser.email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const usernameExists = await UserModel.findOne({ username: newUser.username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    newUser.password = await hash(newUser.password, 12);
    await new UserModel(newUser).save();
    res.status(201).json({ message: "Registered Successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
commonApp.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    let user = await UserModel.findOne({ email: identifier });
    if (!user) {
      user = await UserModel.findOne({ username: identifier });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Email" });
    }

    const matched = await compare(password, user.password);
    if (!matched) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    let userObj = user.toObject();
    delete userObj.password;

    // ✅ send token in response body instead of cookie
    res.status(200).json({
      message: "Login Success",
      token,
      payload: userObj,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGOUT
commonApp.get("/logout", async (req, res) => {
  res.status(200).json({ message: "Logout Success" });
});
