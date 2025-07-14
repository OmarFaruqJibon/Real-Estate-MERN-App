const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({ message: "Access denied: insufficient role" });
        }
        next();
    };
};

export default authorizeRole;
