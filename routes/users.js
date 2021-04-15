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

function generateData() {
    for(let i = 3; i <= 150; i++) {
        let utilisateur = new user();
        utilisateur.id = i;
        utilisateur.Nom = "Etudiant numéro " + i;
        utilisateur.Identifiant = "etudiant" + i;
        utilisateur.Password = "password" + i;

        utilisateur.save();
    }
}

module.exports = {
    loginUser,
    generateData
};