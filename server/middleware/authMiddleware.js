import jwt from "jsonwebtoken";

export const protectAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("AUTH HEADER:", authHeader);
    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.name, error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};