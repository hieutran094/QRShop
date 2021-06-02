import APIBase from "../websocket/APIBase.js";
import { User } from "../models/user.js";
import { Role } from "../models/role.js";
import { UserRole } from "../models/user_role.js";
import { Privilege } from "../models/privilege.js";
import * as jwtHelper from "../helpers/jwt.helper.js";
import * as bcryptHelper from "../helpers/bcrypt.helper.js";
import { isAuthSocket } from "../middleware/authMiddleware.js";

class UserManager extends APIBase {
  constructor() {
    super();
    this._MustLogin = false;
    // let tokenList = {};
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "trovedongsongquehuong";
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "24h";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "refreshtovedongsongtuoitho";
    UserManager.prototype.GetAllUser = async function (req, messageReturn) {
      try {
        let ListUsers = await new Promise((resolve, reject) => {
          User.find({}, (err, users) => {
            if (err) reject(err);
            resolve(users);
          }).select("-password");
        });
        if (!ListUsers) {
          throw new Error("List user is empty");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = ListUsers;
        }
      } catch (err) {}
    };
    /**
     * Create new user
     * @param {*} req
     * @param {*} messageReturn
     */
    UserManager.prototype.Create = async function (req, messageReturn) {
      try {
        let ListUsers = await new Promise((resolve, reject) => {
          User.find({}, (err, users) => {
            if (err) reject(err);
            resolve(users);
          }).select("-password");
        });
        if (!ListUsers) {
          throw new Error("List user is empty");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = ListUsers;
        }
      } catch (err) {
        throw err;
      }
    };
    UserManager.prototype.GetUser = function (name) {
      let user = new users();
      let u = user.FindUserByName(name);
      if (u != null) return u;
      else return null;
    };
    /**
     * Start login
     * @param {*} req
     * @param {*} messageReturn
     */
    UserManager.prototype.Login = async (req, messageReturn) => {
      try {
        let user = await new Promise((resolve, reject) => {
          User.findOne({ email: req.email }, (err, u) => {
            if (err) reject(err);
            resolve(u);
          });
        });
        if (!user) {
          throw new Error(`Wrong username or password`);
        } else {
          let a = await bcryptHelper.comparePassword(
            req.password,
            user.password
          );
          if (a) {
            let UserInfo = {
              ID: user.id,
              Level: user.level,
              UserName: user.username,
              Email: user.email,
            };
            const accessToken = await jwtHelper.generateToken(
              UserInfo,
              accessTokenSecret,
              accessTokenLife
            );
            const refreshToken = await jwtHelper.generateToken(
              UserInfo,
              refreshTokenSecret,
              refreshTokenLife
            );
            messageReturn.Message = `Success`;
            messageReturn.Status = StatusValue.Pass;
            messageReturn.Data = { accessToken, refreshToken, UserInfo };
          } else {
            throw new Error(`Wrong username or password`);
          }
        }
      } catch (err) {
        throw err;
      }
    };
    UserManager.prototype.CheckToken = async (req, messageReturn) => {
      try {
        let result = await isAuthSocket(req.Token);
        if (!result) throw new Error("Error while verify token");
        else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = result;
        }
      } catch (err) {
        throw err;
      }
    };
    UserManager.prototype.CheckPermission = async (req, messageReturn) => {
      try {
        let result = await User.findOne({ username: req.UserName })
          .populate({
            path: "role",
            select: "role_name",
            populate: {
              path: "privilege",
              select: "url",
              match: { url: req.Url },
            },
          })
          .exec();
        if (!result) throw new Error("Not found permission");
        else if (result.role.length <= 0)
          throw new Error("Not found permission");
        else {
          for (let i = 0; i < result.role.length; i++) {
            if (result.role[i].privilege.length > 0) {
              messageReturn.Message = `Success`;
              messageReturn.Status = StatusValue.Pass;
              messageReturn.Data = {};
              break;
            } else throw new Error("Not found permission");
          }
        }
      } catch (err) {
        throw err;
      }
    };
  }
}
export default new UserManager();
