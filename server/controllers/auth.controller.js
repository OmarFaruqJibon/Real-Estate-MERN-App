import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

// REGISTER CONTROLLER
export const register = async (req, res) => {
  const { username, email, password, role, phone } = req.body;

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
        role: role || "NORMAL",
      },
    });

    console.log("New user created:", newUser.id);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Registration error:", err);

    // Handle duplicate phone number error
    if (err.code === "P2002" && err.meta?.target?.includes("phone")) {
      return res.status(400).json({ message: "Phone number already in use!" });
    }

    res.status(500).json({ message: "Failed to create user!" });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Find user by phone number
    const user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      return res.status(400).json({ message: "Invalid User!" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password!" });
    }

    // Set token expiration time
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // Exclude password from response
    const { password: _, ...userInfo } = user;

    // Set token as HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// LOGOUT CONTROLLER
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .status(200)
    .json({ message: "Logout Success." });
};
