import * as jwtHelper from "../helpers/jwt.helper.js";
import * as bcryptHelper from "../helpers/bcrypt.helper.js";
import { User } from "../models/user.js";

const debug = console.log.bind(console);

let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "trovedongsongquehuong";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "24h";
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "refreshtovedongsongtuoitho";


let login = async (req, res) => {
  try {
    let user = await new Promise((resolve, reject) => {
      User.findOne({ email: req.body.email }, (err, u) => {
        if (err) reject(err);
        resolve(u);
      });
    });
    if (!user)
      return res.status(401).json({ message: `Wrong username or password` });
    else {
      let a = await bcryptHelper.comparePassword(
        req.body.password,
        user.password
      );
      if (a) {
        debug(`Compare login data with db susscess!`);
        const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
        const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
        tokenList[refreshToken] = { accessToken, refreshToken };
        debug(`Token for client: ${(accessToken, refreshToken)}`);
        return res.status(200).json({ accessToken, refreshToken });
      } else
        return res.status(401).json({ message: `Wrong username or password` });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export { login };
