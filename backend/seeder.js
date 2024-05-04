import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/dbconnect.js";
import users from "./data/users.js";
import plants from "./data/plants.js";
import staff from "./data/staff.js";
import User from "./models/userModel.js";
import Category from "./models/categoryModel.js";
import Plant from "./models/plantModel.js";
import Staff from "./models/staffModel.js";
import categorires from "./data/category.js";
import Fertilizer from "./models/fertilizer.js";
import fertilizers from "./data/fertilizer.js";
import Service from "./models/ServiceModel.js";
import Tool from "./models/ToolModel.js";
import tools from "./data/tool.js";
import services from "./data/services.js";
dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Plant.deleteMany();
    await Staff.deleteMany();
    await Category.deleteMany();
    await Fertilizer.deleteMany();
    await Tool.deleteMany();
    await Service.deleteMany();
    await User.insertMany(users);
    const createdCategory = await Category.insertMany(categorires);
    const createdStaff = await Staff.insertMany(staff);

    const adminStaff = createdStaff[0]._id;
    const sampleFer = fertilizers.map((fer) => {
      return {
        ...fer,
        createdBy: adminStaff,
      };
    });
    const sampletool = tools.map((fer) => {
      return {
        ...fer,
        createdBy: adminStaff,
      };
    });
    const sampleSer = services.map((fer) => {
      return {
        ...fer,
        createdBy: adminStaff,
      };
    });

    const samplePlants = plants.map((plant) => {
      return {
        ...plant,
        createdBy: adminStaff,
        category: createdCategory[0]._id,
      };
    });

    await Plant.insertMany(samplePlants);
    await Fertilizer.insertMany(sampleFer);
    await Tool.insertMany(sampletool);
    await Service.insertMany(sampleSer);
    console.log("---DATA HAS BEEN IMPORTED---");
    process.exit();
  } catch (error) {
    console.log("---IMPORT FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Plant.deleteMany();
    await Staff.deleteMany();
    await Category.deleteMany();
    await Fertilizer.deleteMany();
    await Tool.deleteMany();
    await Service.deleteMany();

    console.log("---DATA HAS BEEN DESTROYED---");
    process.exit();
  } catch (error) {
    console.log("---DESTROY FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
