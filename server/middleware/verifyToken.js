import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get JWT token from cookie

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token!" });
    }

    req.userId = payload.id;
    req.userRole = payload.role;
    next();
  });
};

export default verifyToken;
