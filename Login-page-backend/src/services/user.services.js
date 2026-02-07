const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const registerUserDB = async ({ name, email, password, phone, role }) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone,
    role: role || "user",
  });

  await newUser.save();

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
  };
};

const findUserDB = async (email) => {
  return await User.findOne({ email: email.toLowerCase() });
};

const getAllUsersDB = async () => {
  const users = await User.find({}, "name email phone role");
  return users;
};

module.exports = {
  registerUserDB,
  findUserDB,
  getAllUsersDB,
};
