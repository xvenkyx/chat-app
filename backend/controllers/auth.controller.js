import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    //password match validation
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    //password length validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be of minimum 6 characters." });
    }

    //existing user validation
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    //password hash
    const salt = await bcrypt.genSalt(11);
    const hPass = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hPass,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res)
      //adding the user
      await newUser.save();

      res.status(201).json({
        message: "User added successfully",
      });
    }
    else{
      res.status(400).json({error: "Invalid user data"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  console.log("login user controller");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //implement json-web-token here
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt","", {maxAge:0})
    res.status(200).json({message : "Logged out successfully"})
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: error.message });
  }
};
