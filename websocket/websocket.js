import WebSocket from "ws";

class ws{
    constructor(obj){
        this.websocket=obj.websocket?obj.websocket:null;
        ws.prototype.Init=function(server){
            if(this.websocket==null){
                this.websocket=new WebSocket.Server({server:server})
            }
        }
    }
}
