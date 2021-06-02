import APIBase from "../websocket/APIBase.js";
import { User } from "../models/user.js";
import { Role } from "../models/role.js";
import { Privilege } from "../models/privilege.js";
import mongoose from "mongoose";

class RoleManager extends APIBase {
  constructor() {
    super();
    /**
     * Get all role
     * @param {*} req
     * @param {*} messageReturn
     */
    RoleManager.prototype.GetAllRole = async function (req, messageReturn) {
      try {
        let ListRoles = await Role.find({})
          .populate({
            path: "privilege",
            select: "privilege_name",
          })
          .exec();
        if (!ListRoles) {
          throw new Error("List role is empty");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = ListRoles;
        }
      } catch (err) {
        throw err;
      }
    };
    /**
     * Save new role
     * @param {*} req
     * @param {*} messageReturn
     */
    RoleManager.prototype.Insert = async function (req, messageReturn) {
      try {
        let role = new Role({
          _id: new mongoose.Types.ObjectId(),
          role_name: req.role_name,
          privilege: [],
          role_describe: req.role_describe,
          edit_time: Date.now(),
        });
        let pl = await new Promise((resolve, reject) => {
          Privilege.find({ _id: { $in: req.privilege } }, function (err, pl) {
            if (err) reject(err);
            resolve(pl);
          });
        });
        if (pl.length > 0) {
          role.privilege = pl.map((p) => p._id);
        } else {
          throw new Error("Privilege not found");
        }
        let result = await new Promise((resolve, reject) => {
          role.save(function (err, r) {
            if (err) reject(err);
            resolve(r);
          });
        });
        if (!result) {
          throw new Error("Save err");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = {};
        }
      } catch (err) {
        throw err;
      }
    };
    RoleManager.prototype.Delete = async function (req, messageReturn) {
      try {
        let result = await new Promise((resolve, reject) => {
          Role.deleteMany({ _id: { $in: req.id } }, function (err, pl) {
            if (err) reject(err);
            resolve(pl);
          });
        });
        if (!result) {
          throw new Error("Save err");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = {};
        }
      } catch (err) {
        throw err;
      }
    };
    RoleManager.prototype.Update = async function (req, messageReturn) {
      try {
        req.new.edit_time = Date.now();
        let result = await Role.updateOne({ _id: req.id }, req.new);
        if (!result) {
          throw new Error("Save err");
        } else {
          messageReturn.Message = `Updated ${result.nModified} records`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = {};
        }
      } catch (err) {
        throw err;
      }
    };
    /**
     * Get user
     * @param {*} req
     * @param {*} messageReturn
     */
    RoleManager.prototype.GetUserRole = async function (req, messageReturn) {
      try {
        let ListUser = await User.find(
          req.username
            ? { username: { $regex: req.username, $options: "i" } }
            : {}
        )
          .populate({
            path: "role",
            select: "role_name",
          })
          .sort({ username: -1 })
          .limit(5)
          .exec();
        if (!ListUser) {
          throw new Error("List user is empty");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = ListUser;
        }
      } catch (err) {
        throw err;
      }
    };
    RoleManager.prototype.AddRoleToUser = async function (req, messageReturn) {
      try {
        req.edit_time = Date.now();
        let result = await User.updateOne({ _id: req.id }, req);
        if (!result) {
          throw new Error("Save err");
        } else {
          messageReturn.Message = `Updated ${result.nModified} records`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = {};
        }
      } catch (err) {
        throw err;
      }
    };
  }
}
export default new RoleManager();
