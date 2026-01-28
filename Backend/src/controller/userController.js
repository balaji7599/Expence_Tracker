const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
// const expenseModel = require("../model/expenseModel");
const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password.length < 8 || password.length > 12) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 12 characters",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one number",
      });
    }

    if (!/[@$!%*?&]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one special character",
      });
    }
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return res
      .status(409)
      .json({ success: false, message: "email already exist" });
    }
    const salt = 10;
    const HashPassword = await bcrypt.hash(password, salt);
    // console.log("hashhhhhhhhhhhh----   ",HashPassword)
    await userModel.create({ name, email, mobile, password: HashPassword });
    return res
      .status(201)
      .json({ success: true, message: " registered sucessfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: "somethig went wrong" });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    // 🔴 CHANGE 1: invalid user
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔴 CHANGE 2: check account lock
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingMinutes = Math.ceil(
        (user.lockUntil - Date.now()) / 60000
      );

      return res.status(403).json({
        message: `Account locked. Try again after ${remainingMinutes} minutes`
      });
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    // 🔴 CHANGE 3: wrong password logic
    if (!checkpassword) {
      user.loginAttempts += 1;

      if (user.loginAttempts >= 4) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // ⏱️ 15 mins
        await user.save();

        return res.status(403).json({
          message:
            "Account locked due to multiple failed attempts. Try again after 15 minutes"
        });
      }

      await user.save();

      return res.status(401).json({
        message: `Invalid password. ${4 - user.loginAttempts} attempts left`
      });
    }

    // 🔴 CHANGE 4: reset attempts on success
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    // 🔴 TOKEN (unchanged)
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

module.exports = { userRegister, userLogin };
