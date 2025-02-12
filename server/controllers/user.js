import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body);
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    // find if already registered email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "This email ID is already registered",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    //console.log(hashedPassword);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log("Registeration Failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const secret_key = process.env.SECRET_KEY;

    const token = await jwt.sign({ userId: user._id }, secret_key, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
      });
    console.log("login");
  } catch (error) {
    console.log("Login Failed", error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
