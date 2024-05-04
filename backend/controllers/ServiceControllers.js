import asyncHandler from "../middlewares/asynchandler.js";
import Service from "../models/ServiceModel.js";
import Category from "../models/categoryModel.js";
const getServices = asyncHandler(async (req, res) => {
  const plants = await Service.find({}).populate("name");
  res.json(plants);
});

const getSerById = asyncHandler(async (req, res) => {
  const plant = await Service.findById(req.params.id).populate("name");
  if (plant) {
    res.json(plant);
  } else {
    res.status(404);
    throw new Error("plant Not Found");
  }
});

const deleteSer = asyncHandler(async (req, res) => {
  const plant = await Service.findById(req.params.id);

  if (plant) {
    await Service.deleteOne({ _id: plant._id });
    res.json({ message: "plant removed" });
  } else {
    res.status(404);
    throw new Error("plant not found");
  }
});

const createSer = asyncHandler(async (req, res) => {
  const { userId, name, image, description, price } = req.body;
  const plant = new Service({
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

const updateSer = asyncHandler(async (req, res) => {
  const { name, image, description, price } = req.body;

  const plant = await Service.findById(req.params.id);

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

export { getSerById, getServices, createSer, updateSer, deleteSer };
