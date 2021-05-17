import * as jwtHelper from "../helpers/jwt.helper.js";
const debug = console.log.bind(console);

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "trovedongsongquehuong";

let isAuth = async (req, res, next) => {
  try {
    const Token = req.headers["x-access-token"];
    if (Token) {
      try {
        const decoded = await jwtHelper.verifyToken(Token, accessTokenSecret);
        req.jwtDecoded = decoded;
        next();
      } catch (err) {
        debug(`Error while verify token: ${err}`);
        return res.status(401).json({ message: `Unauthorized` });
      }
    } else {
      return res.status(403).send({ message: `No token provided.` });
    }
  } catch (err) {
    return res.status(401).json({ message: `Unauthorized` });
  }
};
let isAuthSocket = async (Token) => {
  try {
    if (Token) {
      try {
        const decoded = await jwtHelper.verifyToken(Token, accessTokenSecret);
        return decoded.data;
      } catch (err) {
        debug(`Error while verify token: ${err}`);
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
export { isAuth, isAuthSocket };
