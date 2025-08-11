const { hashPassword, comparePassword } = require("../utils/passwordHandler");
const jwt = require("jsonwebtoken");
const { users } = require("../user.json");

const registerUser = async (req, res) => {
  const { name, email, password, preferences } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email, password and name are required" });
  }

  if(typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: "Name must be a non-empty string" });
  }

  if (typeof preferences !== 'undefined' && !Array.isArray(preferences)) {
    return res.status(400).json({ message: "Preferences must be an list" });
  }
  
  if (name.length < 3) {
    return res.status(400).json({ message: "Name must be at least 3 characters long" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const user = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    preferences: preferences || [],
  };

  users.push(user);
  return res
    .status(201)
    .json({ message: "User registered successfully", user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await comparePassword(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, email: email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const result = {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
    },
  };

  return res.status(200).json({ message: "Login successful", result });
};

const getUserPreferences = (req, res) => {
  const userId = req.user.id;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    message: "User preference fetch succesfully",
    preferences: user.preferences,
  });
};

const updateUserPreferences = (req, res) => {
  const userId = req.user.id;
  const { preferences } = req.body;

  if (!preferences || !Array.isArray(preferences)) {
    return res.status(400).json({ message: "Preferences must be an array" });
  }
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.preferences = new Set([...user.preferences, ...preferences]);

  return res.status(200).json({
    message: "Preferences updated successfully",
    preferences: Array.from(user.preferences),
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserPreferences,
  updateUserPreferences,
};
