import asyncHandler from "../middlewares/asynchandler.js";
import Fertilizer from "../models/fertilizer.js";
import Category from "../models/categoryModel.js";
const getfers = asyncHandler(async (req, res) => {
  const plants = await Fertilizer.find({}).populate("name");
  res.json(plants);
});

const getFerById = asyncHandler(async (req, res) => {
  const plant = await Fertilizer.findById(req.params.id).populate("name");
  if (plant) {
    res.json(plant);
  } else {
    res.status(404);
    throw new Error("plant Not Found");
  }
});

const deletefer = asyncHandler(async (req, res) => {
  const plant = await Fertilizer.findById(req.params.id);

  if (plant) {
    await Fertilizer.deleteOne({ _id: plant._id });
    res.json({ message: "plant removed" });
  } else {
    res.status(404);
    throw new Error("plant not found");
  }
});

const createFer = asyncHandler(async (req, res) => {
  const { userId, name, image, description, price } = req.body;
  const plant = new Fertilizer({
    name,
    price,
    createdBy: userId,
    image,
    description,
  });
  try {
    const createdPlant = await plant.save();
    res.status(201).json(createdPlant);
  } catch (error) {
    console.log(error);
  }
});

const updateFer = asyncHandler(async (req, res) => {
  const { name, image, description, price } = req.body;

  const plant = await Fertilizer.findById(req.params.id);

  if (plant) {
    plant.name = name;
    plant.price = price;
    plant.description = description;
    plant.image = image;
    const updatedplant = await plant.save();
    res.json(updatedplant);
  } else {
    res.status(404);
    throw new Error("plant not found");
  }
});

export { getFerById, getfers, deletefer, createFer, updateFer };
