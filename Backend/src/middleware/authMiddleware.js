const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "token missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "token format invalid" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded.id;

    const user = await userModel.findOne({ _id: decoded.id });

    if (!user) {
      return res
        .status(500)
        .json({ message: "user not found" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware };
