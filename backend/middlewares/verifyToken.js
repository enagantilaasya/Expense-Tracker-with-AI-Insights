import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // ✅ read from Authorization header instead of cookie
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { id: decoded.id, email: decoded.email };
    next();

  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
