import APIBase from "../websocket/APIBase.js";
import { Card } from "../models/card.js";
import mongoose from "mongoose";

class CardManager extends APIBase {
  constructor() {
    super();
    /**
     * Get all Card
     * @param {*} req
     * @param {*} messageReturn
     */
    CardManager.prototype.GetCard = async function (req, messageReturn) {
      try {
        let ListCards = await Card.find({}).exec();
        if (!ListCards) {
          throw new Error("List card is empty");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = ListCards;
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
    CardManager.prototype.Insert = async function (req, messageReturn) {
      try {
        let card = new Card({
          _id: new mongoose.Types.ObjectId(),
          header: req.header,
          icon: req.icon,
          content: req.content,
          hover: req.hover,
          badge: req.badge,
          type: req.type,
          url: req.url,
          col: req.col,
          edit_emp: this.UserName,
        });
        let result = await new Promise((resolve, reject) => {
          card.save(function (err, r) {
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
    CardManager.prototype.Delete = async function (req, messageReturn) {
      try {
        let result = await new Promise((resolve, reject) => {
            Card.deleteMany({ _id: { $in: req.id } }, function (err, pl) {
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
    CardManager.prototype.Update = async function (req, messageReturn) {
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
    CardManager.prototype.GetUserRole = async function (req, messageReturn) {
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
    CardManager.prototype.AddRoleToUser = async function (req, messageReturn) {
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
export default new CardManager();
