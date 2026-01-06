import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

// Controller for userRegistration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already registered. Please login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: encryptedPassword });

    await newUser.save();

    // Setting user data in session
    req.session.isLoggedIn = true;
    req.session.userId = newUser._id;

    return res.status(200).json({
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        name,
        email,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Controllers for userLogin
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    req.session.isLoggedIn = true;
    req.session.userId = user._id;

    return res.status(200).json({
      message: "User loggedin successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  req.session.destroy((error: any) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  return res.status(200).json({
    message: "User loggedout successfully...",
  });
};

export const isLoggedIn = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
