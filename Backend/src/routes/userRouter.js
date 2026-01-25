const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controller/userController");
const {
  addExpense,
  viewExpense,
  deleteExpense,
  editExpense,
} = require("../controller/expenseController");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../middleware/imgUpload");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/createexpense", authMiddleware, (req, res) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      // Multer error OR fileFilter error
      return res.status(400).json({ success: false, message: err.message });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image file" });
    }
    const fileSizeInMB = req.file.size / (1024 * 1024);

    if (fileSizeInMB > 20) {
      return res.status(400).json({
        message: "Image must be at most 20 MB",
      });
    }

    addExpense(req, res);
  });
});

router.get("/viewexpense", authMiddleware, viewExpense);
router.put("/edit/:id", authMiddleware, editExpense);
router.delete("/deleteexpense/:id", authMiddleware, deleteExpense);

module.exports = router;
