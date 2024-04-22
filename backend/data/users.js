import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "john",
    lastName: "doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    address: "main street",
    city: "lee's summit",
    pin: "64095",
    country: "USA",
  },
  {
    firstName: "jane",
    lastName: "doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    address: "main street",
    city: "lee's summit",
    pin: "64095",
    country: "USA",
  },
];

export default users;
