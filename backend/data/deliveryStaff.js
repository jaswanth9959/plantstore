import bcrypt from "bcryptjs";

const deliveryStaff = [
  {
    firstName: "delivery",
    lastName: "staff",
    email: "delivery@gmail.com",
    ssn: "12345678",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default deliveryStaff;
