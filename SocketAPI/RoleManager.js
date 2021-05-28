import APIBase from "../websocket/APIBase.js";
import { Role } from "../models/role.js";

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
        let ListRoles = await Role.find({}, (err, roles) => {});
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
  }
}
export default new RoleManager();
