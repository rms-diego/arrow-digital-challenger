import { Exception } from "../util/exception.js";

export const isAdminMiddleware = async (req, _res, next) => {
  const { tokenDecoded } = req.headers;

  const isAdmin = tokenDecoded.permissions.some(
    (permission) => permission === "admin"
  );

  if (!isAdmin) {
    throw new Exception("this user is not admin", 400);
  }

  return next();
};
