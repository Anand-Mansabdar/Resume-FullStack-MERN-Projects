import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import userModel from "../models/user.model.js";
import resumeModel from "../models/resume.model.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// Controller for "user Registration"
// API(POST): /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: `Missing Required fields`,
      });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists! Please login...",
      });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res.status(200).json({
      message: `User registered successfully.`,
      name: newUser.name,
      email: newUser.email,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Controller for "user login"
// API(POST): /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `Invalid email or password`,
      });
    }

    // Password Check
    if (!user.comparePassword(password)) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Return success message
    const token = generateToken(user._id);

    return res.status(200).json({
      message: `User logged in successfully.`,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Controller for "fetching User"
// API(get): /api/users/data
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // User exists
    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Controller for "Getting user resumes"
// API(get): /api/users/resumes
export const getUserResume = async (req, res) => {
  try {
    const userId = req.userId;
    // return user resumes
    const resumes = await resumeModel.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
