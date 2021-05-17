import APIBase from "../websocket/APIBase.js";
import users from "../models/userTest.js";

class TestAPI extends APIBase {
  constructor() {
    super();
    TestAPI.prototype.GetUser = async function (req, messageReturn) {
      let user = new users();
      let u = await new Promise((resolve, reject) => {
        setTimeout(function () {
          return resolve(user.FindUserByName(req.email));
        }, 60000)
      }
      )
      if (u != null) {
        messageReturn.Status = StatusValue.Pass;
        messageReturn.Data = u;
      } else {
        throw new Error(`User not found`);
      };
    };
    TestAPI.prototype.GetUserAsync = async function (req, messageReturn) {
      let user = new users();
      let u = await new Promise((resolve, reject) => {
        return resolve(user.FindUserByName(req.email));
      }
      )
      if (u != null) {
        messageReturn.Status = StatusValue.Pass;
        messageReturn.Data = u;
      } else {
        throw new Error(`User not found`);
      };
    };
  }
}
export default new TestAPI();
