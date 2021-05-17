

class users {
    constructor() {
        this.ListUser = [{
            username: "Tran Hieu",
            email: "hieu@gmail.com"
        }, {
            Username: "1",
            email: "root@gmail.com",
            password: "$2a$12$hsDYDP4l/Vuwk26PH5z/MuEpHQd4mNC94FFX.K/ziGL9sEy8sXbTO"
        }, {
            username: "2",
            email: "hieu@gmail.com"
        }];
        users.prototype.FindUserByName = function (name) {
            let user = null;
            this.ListUser.forEach(element => {
                if (element.email == name) {
                    user = element;
                }
            });
            return user;
        }
    }
}


export default users;