import jwt from "jsonwebtoken";

const jwtConfig = {
  expiresIn: "1d",
};

const { SECRET } = process.env;

function encode(payload) {
  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}

function decode(payload) {
  const tokenDecoded = jwt.decode(payload);

  return tokenDecoded;
}

export default { encode, decode };
