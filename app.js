const debug = console.log.bind(console);

import dotenv from "dotenv"; //load config from .env file to process.env
import express from "express";
import path, { join } from "path";
import mongoose from "mongoose";
import { router } from "./routes/shop.js";
import bodyParser from "body-parser";
import WebSocket from "ws";
import { isAuthSocket } from "./middleware/authMiddleware.js";
import { MessageReturn, StatusValue } from "./websocket/MessageReturn.js";
dotenv.config();
global.StatusValue = StatusValue;
const app = express();
const __dirname = path.resolve();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(router);
mongoose.set("useCreateIndex", true);
// mongoose.connect("mongodb://localhost:27017/woodshop", {
//   useNewUrlParser: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// var db = mongoose.connection;
// //Bắt sự kiện error
// db.on("error", function (err) {
//   if (err) console.log(err);
// });
// //Bắt sự kiện open
// db.once("open", function () {
//   console.log("Connect to db success!");
// });
const port = process.env.PORT || 8080;
let server = app.listen(port, "localhost", () => {
  console.log(`Server stated on port:${port}`);
});
const ws = new WebSocket.Server({
  server: server,
});
ws.on("connection", function connection(ws, req) {
  ws.on("message", (message) => {
    (async function run() {
      let messageReturn = null;
      try {
        messageReturn = new MessageReturn();
        let Request = JSON.parse(message);
        let Token = Request.Token;
        let Class = Request.Class;
        let Function = Request.Function;
        let ClientID = Request.ClientID;
        let MessageID = Request.MessageID;
        messageReturn.MessageID = MessageID;
        messageReturn.ClientID = ClientID;
        console.log(`Start:${new Date().getMilliseconds()}`);
        let Classes = (await import(`./SocketAPI/${Class}.js`)).default;
        if (Classes.constructor.prototype.hasOwnProperty(Function)) {
          Classes.Token = Token;
          Classes.ClientID = ClientID;
          if (Classes.MustLogin) {
            let user = await isAuthSocket(Token);
            if (user) {
              Classes.LoginUser = user;
              await Classes[Function](Request.Data, messageReturn);
            } else {
              throw new Error("No Login");
            }
          } else await Classes[Function](Request.Data, messageReturn);
        } else {
          throw new Error("Function not found");
        }
      } catch (err) {
        messageReturn.Status = StatusValue.Fail;
        messageReturn.Message = err.message;
      } finally {
        ws.send(JSON.stringify(messageReturn));
        console.log(`End:${new Date().getMilliseconds()}`);
      }
    })();
  });
});
