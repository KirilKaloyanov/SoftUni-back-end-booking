const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "a45oncuv9pje";

//TODO: check what fields are used for identification by assignment
async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (!user) throw new Error("Invalid email or password.");

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!hasMatch) throw new Error("Invalid email or password.");

  return createSession(user);
}

//TODO: check what fields are used for identification by assignment
async function register(email, username, password) {

  const existingUsername = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingUsername) throw new Error("Username is taken.");

  const existingEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingEmail) throw new Error("Email is taken.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    hashedPassword,
  });

  //TODO: check if after registration user needs to login or login is automatic
  return createSession(user);
}

function logout() {}

function createSession({ _id, email, username }) {
  const payload = {
    _id,
    email,
    username,
  };

  return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  login,
  register,
  logout,
  createSession,
  verifyToken,
};
