const fs = require('fs');
const path=require('path');
const expenseModel = require("../model/expenseModel");

const addExpense = async (req, res) => {
  try {
    const { name, description, category, date } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }
    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Date is required" });
    }

    const selectedDate = new Date(date);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return res.status(400).json({
        success: false,
        message: "Future dates are not allowed",
      });
    }

    await expenseModel.create({
      userId: req.userId,
      name,
      category,
      description,
      date,
      image,
    });

    return res
      .status(201)
      .json({ success: true, message: "expense Added sucsessfully" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
/*
const viewExpense = async (req, res) => {
  try {
    // 1️⃣ Get page & limit from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // 2️⃣ Calculate skip
    const skip = (page - 1) * limit;

    // 3️⃣ Total records (for pagination info)
    const totalExpenses = await expenseModel.countDocuments({
      userId: req.userId,
    });

    // 4️⃣ Fetch paginated data
    const expense = await expenseModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 5️⃣ Send response
    return res.status(200).json({
      success: true,
      message: "Data retrieved",
      data: expense,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalExpenses / limit),
        totalRecords: totalExpenses,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const viewExpense = async (req, res) => {
  try {
    const expense = await expenseModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ success: true, message: "Data retrived", data: expense });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
*/
const viewExpense = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      // current page
    const limit = parseInt(req.query.limit) || 6;   // items per page
    const skip = (page - 1) * limit;

    const { name, category, description, date } = req.query;

    // 🔍 Base filter (user-specific data)
    let filter = {
      userId: req.userId,
    };

    // 🔎 Name search (case-insensitive)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // 🎯 Category filter
    if (category) {
      filter.category = category;
    }

    // 🔎 Description search (case-insensitive)
    if (description) {
      filter.description = { $regex: description, $options: "i" };
    }

    // 📅 Date filter (single day)
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      filter.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // 🔢 Count after applying filters
    const totalExpenses = await expenseModel.countDocuments(filter);

    // 📄 Fetch paginated data
    const expenses = await expenseModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: expenses,
      pagination: {
        totalItems: totalExpenses,
        totalPages: Math.ceil(totalExpenses / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, date } = req.body;

    // Find existing expense first
    const expense = await expenseModel.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or unauthorized",
      });
    }

    // If new image uploaded → delete old one
    if (req.file) {
      if (expense.image) {
        const oldImagePath = path.join("uploads", expense.image);

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); //  remove old image
        }
      }

      expense.image = req.file.filename; // save new image
    }

    // Update other fields
    expense.name = name;
    expense.description = description;
    expense.category = category;
    expense.date = date;

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    console.error("Edit Expense Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



module.exports = { addExpense, viewExpense, editExpense, deleteExpense };
