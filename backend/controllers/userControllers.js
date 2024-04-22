import asyncHandler from "../middlewares/asynchandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, address, city, pin, country } =
    req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    address,
    city,
    pin,
    country,
  });

  if (user) {
    const token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: "user",
      token,
      address: user.address,
      city: user.city,
      pin: user.pin,
      country: user.country,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.checkPassword(password))) {
    const token = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
      address: user.address,
      city: user.city,
      pin: user.pin,
      country: user.country,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout user" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.pin = req.body.pin || user.pin;
    user.country = req.body.country || user.country;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
      city: updatedUser.city,
      pin: updatedUser.pin,
      country: updatedUser.country,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const staff = await User.findById(req.params.id).select("-password");
  res.status(200).json(staff);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find User");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const staff = await User.findById(req.params.id);

  if (staff) {
    staff.firstName = req.body.firstName || staff.firstName;
    staff.lastName = req.body.lastName || staff.lastName;
    staff.email = req.body.email || staff.email;
    staff.phone = req.body.phone || staff.phone;
    const updateStaff = await staff.save();
    res.status(200).json({
      _id: updateStaff._id,
      firstName: updateStaff.firstName,
      lastName: updateStaff.lastName,
      email: updateStaff.email,
      phone: updateStaff.phone,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

export {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
