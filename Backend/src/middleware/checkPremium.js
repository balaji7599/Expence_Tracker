const userModel = require("../model/userModel");

const checkPremium = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId).select("isPremium");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isPremium) {
      return res.status(403).json({
        message: "This feature is only for premium users",
      });
    }

    // ✅ User is premium
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error checking premium status",
    });
  }
};

module.exports = checkPremium;
