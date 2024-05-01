import bcrypt from "bcryptjs";

const staff = [
  {
    firstName: "admin",
    lastName: "user",
    email: "admin@gmail.com",
    ssn: "12345678",
    password: bcrypt.hashSync("123456", 10),
    first: false,
    dob: "04/24/1998",
    phone: "123456",
    address: "lees summit",
  },
  {
    firstName: "staff",
    lastName: "user",
    email: "staff@gmail.com",
    ssn: "12345679",
    password: bcrypt.hashSync("123456", 10),
    first: false,
    dob: "04/24/1998",
    phone: "123456",
    address: "lees summit",
  },
];

export default staff;
