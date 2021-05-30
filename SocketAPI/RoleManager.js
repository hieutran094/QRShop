import APIBase from "../websocket/APIBase.js";
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
  }
}
export default new RoleManager();
