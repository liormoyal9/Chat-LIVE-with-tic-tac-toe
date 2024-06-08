import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const boyProfilePic =
      "data:image/jpeg;base64,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";

    const girlProfilePic =
      "data:image/png;base64,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";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save(); // מחכים לשמירה

    if (newUser) {
      //יצירה של jwt
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
