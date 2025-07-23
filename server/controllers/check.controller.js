import jwt from "jsonwebtoken";

// Route to check if a user is authenticated
export const logIn = async (req, res) => {
  res.status(200).json({ message: "You are authenticated!" });
};

// Route to check if the user is an admin
export const adminLogIn = (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token!" });
    }

    if (!payload.role || payload.role !== "ADMIN") {
      return res.status(403).json({ message: "Not Authorized" });
    }

    // If all checks pass, respond here
    res.status(200).json({ message: "You are authenticated as ADMIN!" });
  });
};
