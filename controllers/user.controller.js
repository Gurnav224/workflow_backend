const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, password are required" });
    }

    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(400).json({ error: "email already exist" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "user register successfully", user });
  } catch (error) {
    console.error("failed to register new user", error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "name and passpword is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json(token);
  } catch (error) {
    console.error("failed to login user", error);
    res.status(500).json({ error: error.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
   res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"failed get user"})
  }
};



exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'no user found'})
  }
}