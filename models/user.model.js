const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name are required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase:true,
    trim:true
  },
  password: {
    type: String,
    trim: true,
    min: [6, "password length should be equal to 6 or greater"],
  },
},{
    timestamps:true
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});




const User = mongoose.model("User", userSchema);

module.exports = User;
