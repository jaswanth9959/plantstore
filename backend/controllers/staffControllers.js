import asyncHandler from "../middlewares/asynchandler.js";
import Staff from "../models/staffModel.js";
import jwt from "jsonwebtoken";
const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ email });

  if (staff && (await staff.checkPassword(password))) {
    const token = jwt.sign(
      { userID: staff._id, role: staff.role },
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
      _id: staff._id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      ssn: staff.ssn,
      role: staff.role,
      phone: staff.phone,
      address: staff.address,
      first: staff.first,
      dob: staff.dob,

      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password!");
  }
});

const logoutStaff = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logout staff" });
});

const getStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.find({});
  res.status(200).json(staff);
});

const getStaffById = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id).select("-password");
  res.status(200).json(staff);
});

const deleteStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (staff) {
    if (staff.role === "admin") {
      res.status(400);
      throw new Error("Cannot deleteStaff");
    }
    await Staff.deleteOne({ _id: staff._id });
    res.status(200).json({ message: "Staff deleted " });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id);

  if (staff) {
    staff.firstName = req.body.firstName || staff.firstName;
    staff.lastName = req.body.lastName || staff.lastName;
    staff.email = req.body.email || staff.email;
    staff.ssn = req.body.ssn || staff.ssn;
    staff.dob = req.body.dob || staff.dob;
    staff.phone = req.body.phone || staff.phone;
    staff.address = req.body.address || staff.address;
    const updateStaff = await staff.save();
    res.status(200).json({
      _id: updateStaff._id,
      firstName: updateStaff.firstName,
      lastName: updateStaff.lastName,
      email: updateStaff.email,
      ssn: updateStaff.ssn,
      address: updateStaff.address,
      phone: updateStaff.phone,
      dob: updateStaff.dob,
    });
  } else {
    res.status(404);
    throw new Error("Cannot find Staff");
  }
});

const updateStaffProfile = asyncHandler(async (req, res) => {
  const user = await Staff.findById(req.params.id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.ssn = req.body.ssn || user.ssn;
    user.phone = req.body.phone || user.phone;
    user.dob = req.body.dob || user.dob;
    user.address = req.body.address || user.address;
    user.first = false;
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
      ssn: updatedUser.ssn,
      dob: updatedUser.dob,
      address: updatedUser.address,
      phone: updatedUser.phone,
      token: req.body.token,
    });
  } else {
    res.status(404);
    throw new Error("staff not found");
  }
});

const registerStaff = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, ssn, address, phone, dob } =
    req.body;

  const staff = await Staff.create({
    firstName,
    lastName,
    email,
    password,
    role: "staff",
    ssn,
    address,
    phone,
    dob,
  });
  res.status(201).json({
    _id: staff._id,
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    role: staff.role,
    ssn: staff.ssn,
    dob: staff.dob,
    address: staff.address,
    phone: staff.phone,
  });
});
export {
  loginStaff,
  logoutStaff,
  deleteStaff,
  getStaff,
  getStaffById,
  registerStaff,
  updateStaff,
  updateStaffProfile,
};
