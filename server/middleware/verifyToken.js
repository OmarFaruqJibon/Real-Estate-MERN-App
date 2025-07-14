import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; //get the token from Cookies

    if (!token) return res.status(401).json({ message: "You are not authenticated!!" }); //check if the token is not avaliable

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, playload) => { //check if the token is incorrect
        if (error) return res.status(403).json({ message: "Invalid token!!" });
        req.userId = playload.id;
        req.userRole = playload.role;
        next();
    })
};

export default verifyToken;