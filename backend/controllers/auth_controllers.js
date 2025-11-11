import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //    check if user exist or not
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: `user alredy exists in database`,
      });
    }
    const saltRounds = 10;
    // hashing password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newlyCreatedUser = await User.create({
      username,
      email,
      password: hash,
      role,
    });
    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: `user with email id ${email} is added in database`,
      });
    }
  } catch (e) {
    console.error("Error during registration:", e);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //    check if user exist or not
    const loginInfoUser = await User.findOne({ $or: [{ username }] });
    if (!loginInfoUser) {
      res.status(409).json({
        success: false,
        message: `user does not exists in database`,
      });
    }

    const correctPassword = bcrypt.compareSync(
      password,
      loginInfoUser.password
    );

    // CREATING TOKEN
    const bearer_token = jwt.sign(
      { username: loginInfoUser.username, _id: loginInfoUser._id },
      process.env.JWT_SECRET,{expiresIn:"30m"}
    );

    if (correctPassword) {
      res.status(200).json({
        success: true,
        message: "login successful",
        loginInfoUser,
        bearer_token,
      });
    }
  } catch (e) {
    console.error("Error during registration:", e);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { loginUser, registerUser };
