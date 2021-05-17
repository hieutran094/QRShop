class MessageReturn {
  constructor(MessageID, ClientID) {
    this.Status = null;
    this.Message = "";
    this.Data = null;
    this.MessageID = MessageID ? MessageID : "";
    this.ClientID = ClientID ? ClientID : "";
  }
  // get MessageID(){
  //   return this.MessageID;
  // }
  // set MessageID(msgID){
  //   this.MessageID=msgID;
  // }
  // set ClientID(ClientID){
  //   this.ClientID=ClientID;
  // }
}
class StatusValue {
  static Pass = "Pass";
  static Fail = "Fail";
}
export { MessageReturn, StatusValue };
