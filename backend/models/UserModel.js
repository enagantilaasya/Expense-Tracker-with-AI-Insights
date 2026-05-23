import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "UserName is required"],
      unique: [true, "Username must be unique"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      match: [/^\S+@\S+\.\S+$/, "Please use valid email"],
      lowercase: true,
    },

    phoneno: {
      type: String,
      required: function () {
        return !this.googleAuth;
      },
      unique: true,
      sparse: true,
      match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
    },

    password: {
      type: String,
      required: function () {
        return !this.googleAuth;
      },
      minlength: [10, "Password must be at least 10 characters"],
    },

    googleAuth: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);

export const UserModel = model("user", userSchema);