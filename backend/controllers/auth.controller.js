import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

    //adding the user
    await newUser.save();

    res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = (req, res) => {
  console.log("login user controller");
};

export const logout = (req, res) => {
  console.log("logout user");
};
