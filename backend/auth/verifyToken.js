import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;
  // Check if token exists and starts with "Bearer"
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // Must call the next function
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Toke is exnpired" });
    }
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }

  if (doctor) {
    user = doctor;
  }

  // Check if user exists and has a truthy role property before accessing it
  if (user && user.role && !roles.includes(user.role)) {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }

  next();
};
