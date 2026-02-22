import handleAsyncError from "./handleAsyncError.js";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import HandleError from "../utils/handleError.js";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  let { token } = req.cookies;

  // Check Authorization header if cookie is missing
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new HandleError("Authentication is missing! Please login to access resource", 401))
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  next();

})

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new HandleError(`Role - ${req.user.role} is not allowed to access the resource`, 403))
    }
    next();
  }
}
