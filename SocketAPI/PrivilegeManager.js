import APIBase from "../websocket/APIBase.js";
import { Privilege } from "../models/privilege.js";

class PrivilegeManager extends APIBase {
  constructor() {
    super();
    /**
     * Get all privilege
     * @param {*} req
     * @param {*} messageReturn
     */
     PrivilegeManager.prototype.GetAll = async function (req, messageReturn) {
      try {
        let ListPrivileges = await Privilege.find({},'_id privilege_name privilege_desc url edit_time').exec();
        if (!ListPrivileges) {
          throw new Error("Privilege is empty");
        } else {
          messageReturn.Message = `Success`;
          messageReturn.Status = StatusValue.Pass;
          messageReturn.Data = ListPrivileges;
        }
      } catch (err) {
        throw err;
      }
    };
  }
}
export default new PrivilegeManager();
