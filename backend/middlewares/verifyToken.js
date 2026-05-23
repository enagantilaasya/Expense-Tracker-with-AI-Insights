import jwt from "jsonwebtoken";
export const verifyToken =
async (req, res, next) => {
  try {
    // GET TOKEN
    const token = req.cookies?.token;
    // NO TOKEN
    if (!token) {
      return res.status(401).json({
        message:
          "Unauthorized Access",
      });
    }
    // VERIFY TOKEN
    const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY
      );
    // SAVE USER
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  }
  catch (err) {
    console.log(err);
    res.status(401).json({
      message:
        "Invalid or Expired Token",
    });
  }
};