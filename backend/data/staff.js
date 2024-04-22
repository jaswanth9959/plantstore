import bcrypt from "bcryptjs";

const staff = [
  {
    firstName: "admin",
    lastName: "user",
    email: "admin@gmail.com",
    ssn: "12345678",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    firstName: "staff2",
    lastName: "user",
    email: "staff2@gmail.com",
    ssn: "12345679",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default staff;
