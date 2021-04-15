let user = require('../model/user');

function loginUser(request, response) {
    let userRequest = request.body;
    user.findOne({Identifiant: userRequest.Identifiant, Password: userRequest.Password}, (err, userFound) => {
        if (err) {
            response.json({status: 0, data: err});
        }
        if(userFound) {
            response.json({status: 1, data: userFound});
        }
        else {
            response.json({status: 0, data: null});
        }
      });
}

module.exports = {
    loginUser
};