import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asynchandler.js";
import Fertilizer from "../models/fertilizer.js";

const getAllFertilizers = asyncHandler(async (req, res) => {
  const categories = await Fertilizer.find({});
  res.status(200).json(categories);
});

const getFerById = asyncHandler(async (req, res) => {
  const categories = await Fertilizer.findById(req.params.id);
  res.status(200).json(categories);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

const getCategoryById = asyncHandler(async (req, res) => {
  const categories = await Category.findById(req.params.id);
  res.status(200).json(categories);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = req.body.name || category.name;
  }
  const updatedCategory = await category.save();
  res.json({
    updateCategory,
  });
});

export {
  getAllCategories,
  updateCategory,
  getCategoryById,
  getAllFertilizers,
  getFerById,
};
