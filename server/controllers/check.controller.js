import jwt from "jsonwebtoken";

export const logIn = async (req, res) => {
  // console.log(req.userId);
  res.status(200).json({ message: "You are authenticated!!" });
};

export const adminLogIn = (req, res) => {
  const token = req.cookies.token; //get the token from Cookies

  if (!token)
    return res.status(401).json({ message: "You are not authenticated!!" }); //check if the token is not avaliable

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
    //check if the token is incorrect
    if (error) return res.status(403).json({ message: "Invalid token!!" });
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not Authorized" });
    }
  });

  res.status(200).json({ message: "You are authenticated!!" });
};
