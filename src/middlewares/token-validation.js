import jwt from "../util/jwt.js";

export const validateToken = async (req, res, next) => {
  const { token } = req.cookies;

  jwt.verify(token);

  const tokenDecoded = jwt.decode(token);

  req.headers.tokenDecoded = tokenDecoded;

  next();
};
