import asyncHandler from "../middlewares/asynchandler.js";
import Plant from "../models/plantModel.js";
import Category from "../models/categoryModel.js";
const getPlants = asyncHandler(async (req, res) => {
  const plants = await Plant.find({}).populate("category", "name");
  res.json(plants);
});

const getPlantById = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id).populate(
    "category",
    "name"
  );
  if (plant) {
    res.json(plant);
  } else {
    res.status(404);
    throw new Error("plant Not Found");
  }
});

const deletePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);

  if (plant) {
    await Plant.deleteOne({ _id: plant._id });
    res.json({ message: "plant removed" });
  } else {
    res.status(404);
    throw new Error("plant not found");
  }
});

const createPlant = asyncHandler(async (req, res) => {
  const {
    userId,
    name,
    category,
    type,
    image,
    description,
    price,
    stock,
    additionalCost,
  } = req.body;
  const plant = new Plant({
    name,
    price,
    createdBy: userId,
    image,
    description,
    type,
    category,
    stock,
    additionalCost,
  });
  try {
    const createdPlant = await plant.save();
    res.status(201).json(createdPlant);
  } catch (error) {
    console.log(error);
  }
});

const updatePlant = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    type,
    image,
    description,
    price,
    stock,
    additionalCost,
  } = req.body;

  const plant = await Plant.findById(req.params.id);

  if (plant) {
    plant.name = name;
    plant.price = price;
    plant.description = description;
    plant.type = type;
    plant.image = image;
    plant.stock = stock;
    plant.category = category;
    plant.additionalCost = additionalCost;
    const updatedplant = await plant.save();
    res.json(updatedplant);
  } else {
    res.status(404);
    throw new Error("plant not found");
  }
});

export { getPlantById, getPlants, createPlant, deletePlant, updatePlant };
