const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json("Access denied: No token");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Invalid or expired token");

    req.note = {
      userId: decoded.userId,
      userName: decoded.userName,
    };
    next();
  });
};

module.exports = authMiddleware;
