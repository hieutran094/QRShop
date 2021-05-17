class APIBase {
  constructor(o) {
    this.LoginUser = null;
    this.IP = "";
    this.ClientID = null;
    this.ClientMsgID = null;
    this.Token = null;
    this._MustLogin = true;
    APIBase.prototype.GetDBDateTime = function () {
      let ms = { OK: "OK" };
      return ms;
    };
  }
  get MustLogin() {
    return this._MustLogin;
  }
}
export default APIBase;
