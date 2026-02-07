
const { registerUserDB } = require('../services/user.services');

const register = async (req, res) => {
  let { name, email, password, phone, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Name, email and password are required",
    });
  }

  email = email.toLowerCase();

  try {
    const user = await registerUserDB({
      name,
      email,
      password,
      phone,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (error) {
    if (error.message === "Email already registered") {
      return res.status(409).json({
        success: false,
        error: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
};

module.exports = {
  register
};



