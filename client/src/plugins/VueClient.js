// import 
class Client {
  constructor(vue) {
    this.subscribers = {};
    this.ClientID = "";
    this.Vue = vue;
    this.websocket = null;
    this.UserInfo = {
      ID: "",
      UserName: "",
      Email: "",
    };
    this.Token = null;
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
        };
      } else {
        this.websocket.onopen = function() {
          console.log(`onOpen:connetion open`);
        };
      }
      if (obj.OnClose) {
        this.websocket.onclose = function() {
          console.log(`onClose:connetion close`);
          obj.OnClose();
        };
      } else {
        let seft = this.Vue;
        this.websocket.onclose = function(e) {
          console.log(seft.swal());
          console.log("onClose:connetion close");
          seft.swal.fire(
            {
              icon: "error",
              title: "Connetion close...",
              text: "The server connection close;" + e.reason,
            },
            function() {
              //parent.window.location.reload();
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
      //localStorage.setItem("Token", Token);
    };
    Client.prototype.SetUserInfo = function(UserInfo) {
      if (UserInfo) {
        this.UserInfo.ID = UserInfo.ID;
        this.UserInfo.UserName = UserInfo.UserName;
        this.UserInfo.Email = UserInfo.Email;
      } else {
        this.UserInfo.ID = null;
        this.UserInfo.UserName = null;
        this.UserInfo.Email = null;
      }
    };
    Client.prototype.CheckToken = function(CallBack) {
      // var CKTK = localStorage.Token;
      var CKTK =this.Vue.$cookies.get("Token");
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
          CallBack(e);
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

    this.Init({ ServerIP: "localhost", Port: "3000" });
  }
}
export default Client;
