import exp from "express";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const commonApp = exp.Router();

const { sign } = jwt;

config();

// ================= REGISTER =================
commonApp.post("/register", async (req, res) => {

  try {

    const newUser = req.body;

    // CHECK EXISTING EMAIL
    const existingEmail =
      await UserModel.findOne({

        email: newUser.email,

      });

    if (existingEmail) {

      return res.status(400).json({

        message: "Email already exists",

      });

    }

    // CHECK EXISTING USERNAME
    const existingUsername =
      await UserModel.findOne({

        username: newUser.username,

      });

    if (existingUsername) {

      return res.status(400).json({

        message: "Username already exists",

      });

    }

    // HASH PASSWORD
    newUser.password =
      await hash(
        newUser.password,
        12
      );

    // NORMAL LOGIN USER
    newUser.googleAuth = false;

    // SAVE USER
    const userDoc =
      new UserModel(newUser);

    await userDoc.save();

    res.status(201).json({

      message:
        "Registered Successfully",

    });

  }

  catch (err) {

    console.log(
      "Registration error",
      err
    );

    res.status(500).json({

      message: err.message,

    });

  }

});


// ================= LOGIN =================
commonApp.post("/login", async (req, res) => {

  try {

    const {
      identifier,
      password,
    } = req.body;

    // FIND BY USERNAME OR EMAIL
    const user =
      await UserModel.findOne({

        $or: [

          {
            username: identifier,
          },

          {
            email: identifier,
          },

        ],

      });

    // USER NOT FOUND
    if (!user) {

      return res.status(400).json({

        message:
          "Invalid Username or Email",

      });

    }

    // PASSWORD CHECK
    const isMatched =
      await compare(
        password,
        user.password
      );

    if (!isMatched) {

      return res.status(400).json({

        message:
          "Invalid Password",

      });

    }

    // JWT TOKEN
    const token = sign(

      {

        id: user._id,

        username:
          user.username,

        email:
          user.email,

        phoneno:
          user.phoneno,

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
    let userObj =
      user.toObject();

    delete userObj.password;

    res.status(200).json({

      message:
        "Login Success",

      payload: userObj,

    });

  }

  catch (err) {

    console.log(
      "Login Error",
      err
    );

    res.status(500).json({

      message: err.message,

    });

  }

});


// ================= LOGOUT =================
commonApp.get("/logout", async (req, res) => {

  res.clearCookie("token", {

    httpOnly: true,

    secure: false,

    sameSite: "lax",

  });

  res.status(200).json({

    message:
      "Logout Success",

  });

});