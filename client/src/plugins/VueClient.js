class Client {
  constructor(vue, onOpen) {
    this.subscribers = {};
    this.ClientID = "";
    this.Vue = vue;
    this.websocket = null;
    this.UserInfo = {
      ID: "",
      Level: null,
      UserName: "",
      Email: "",
    };
    this.Token = null;
    this.OnOpen = onOpen;
    this.IsOpen = false;
    Client.prototype.Init = function(obj) {
      if (this.ClientID == "") {
        this.ClientID =
          "CID" +
          parseInt(Math.random() * 99).toString() +
          Date.now().toString();
      }
      if (obj.ServerIP && obj.Port) {
        this.websocket = new WebSocket(`ws://${obj.ServerIP}:${obj.Port}`);
        this.websocket.ClientID = this.ClientID;
      }
      if (obj.OnMessage) {
        this.websocket.onmessage = obj.OnMessage;
      } else {
        this.websocket.onmessage = (e) => {
          console.log(`Get>_${e.data}`);
          var d = JSON.parse(e.data);
          this.publish(d.MessageID, d);
        };
      }
      if (obj.OnOpen) {
        this.websocket.onopen = function(e) {
          console.log(`onOpen:connetion open`);
          obj.OnOpen(e);
          this.IsOpen = true;
        }.bind(this);
      } else {
        this.websocket.onopen = function() {
          console.log(`onOpen:connetion open`);
          this.IsOpen = true;
        }.bind(this);
      }
      if (obj.OnClose) {
        this.websocket.onclose = function() {
          console.log(`onClose:connetion close`);
          obj.OnClose();
        };
      } else {
        let seft = this.Vue;
        this.websocket.onclose = function(e) {
          console.log("onClose:connetion close");
          seft.prototype.$layer.alert("The server connection close;" + e.reason,{
            title: 'Connetion close...',
            icon:1 , //0,1,2,3
            btn: ['OK'],
          },layerid => {
            seft.prototype.$layer.close(layerid);
          }
        );
        };
      }
    };
    Client.prototype.CallFunction = function(
      ClassName,
      FunctionName,
      Data,
      CallBack,
      MessageID
    ) {
      MessageID = MessageID
        ? MessageID
        : "MSGID" +
          parseInt(Math.random() * 99).toString() +
          Date.now().toString();
      if (CallBack != null && CallBack != undefined) {
        this.subscribe(MessageID, function(d) {
          CallBack(d);
        });
      }
      var data = {
        Token: this.Token,
        ClientID: this.ClientID,
        MessageID: MessageID,
        Class: ClassName,
        Function: FunctionName,
        Data: Data,
      };
      if (this.websocket.readyState == 1) {
        var jsonStr = JSON.stringify(data);
        console.log("Send>_" + jsonStr);
        this.websocket.send(jsonStr);
      } else {
        console.log(
          "Error>_ WebSocket not ready,State:" + this.websocket.readyState
        );
      }
    };
    Client.prototype.Login = function(Email, Password, CallBack) {
      this.CallFunction(
        "UserManager",
        "Login",
        { email: Email, password: Password },
        function(e) {
          if (e.Status == "Pass") {
            this.SetToken(e.Data.accessToken);
            this.SetUserInfo(e.Data.UserInfo);
          }
          CallBack(e);
        }.bind(this)
      );
    };
    Client.prototype.Logout = function(CallBack) {
      this.CallFunction(
        "UserManager",
        "Logout",
        { TOKEN: this.Token },
        function(e) {
          if (e.Status == "Pass") {
            this.SetToken(null);
            this.SetUserInfo(null);
          }
          CallBack(e);
        }.bind(this)
      );
    };
    Client.prototype.SetToken = function(Token) {
      this.Token = Token;
      this.Vue.$cookies.set("Token", Token, "1h");
    };
    Client.prototype.SetUserInfo = function(UserInfo) {
      if (UserInfo) {
        this.UserInfo.ID = UserInfo.ID;
        this.UserInfo.UserName = UserInfo.UserName;
        this.UserInfo.Email = UserInfo.Email;
        this.UserInfo.Level = UserInfo.Level;
      } else {
        this.UserInfo.ID = null;
        this.UserInfo.UserName = null;
        this.UserInfo.Email = null;
        this.UserInfo.Level = null;
      }
    };
    Client.prototype.CheckToken = function(callback) {
      var CKTK = this.Vue.$cookies.get("Token");
      this.CallFunction(
        "UserManager",
        "CheckToken",
        { Token: CKTK },
        function(e) {
          if (e.Status == "Pass") {
            this.SetToken(CKTK);
            this.SetUserInfo(e.Data);
          } else {
            this.SetToken(null);
            this.SetUserInfo(null);
          }
          callback(e);
        }.bind(this)
      );
    };
    Client.prototype.CheckPermission = function(Url, Callback) {
      this.CallFunction(
        "UserManager",
        "CheckPermission",
        { UserName: this.UserInfo.UserName, Url: Url },
        function(e) {
          Callback(e);
          if (e.Status == "Fail") {
            this.Vue.swal.fire({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              icon: "warning",
              title: "Sorry, you don't have  permission",
            });
          }
        }.bind(this)
      );
    };
    Client.prototype.subscribe = function(event, callback) {
      if (!this.subscribers[event]) {
        this.subscribers[event] = [];
      }
      this.subscribers[event].push(callback) - 1;
    };
    Client.prototype.unsubscribe = function(event) {
      delete this.subscribers[event];
    };
    Client.prototype.publish = function(event, data) {
      if (!this.subscribers[event]) return;
      this.subscribers[event].forEach((subscriberCallback) =>
        subscriberCallback(data)
      );
      delete this.subscribers[event];
    };
    Client.prototype.publishMoreTime = function(event, data) {
      if (!this.subscribers[event]) return;
      this.subscribers[event].forEach((subscriberCallback) =>
        subscriberCallback(data)
      );
    };
    Client.prototype.sleep = function(Millis) {
      return new Promise((resolve) => setTimeout(resolve, Millis));
    };

    this.Init({ ServerIP: "localhost", Port: "3000", OnOpen: this.OnOpen });
  }
}
export default Client;
