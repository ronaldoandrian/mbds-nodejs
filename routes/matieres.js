let Matieres = require('../model/matieres');

function saveMatiere() {
    let matiereArray = [{
        "id": 1,
        "prof": "Amosse Edourd",
        "matiere": "Developpement Mobile",
        "iconMatiere": "mobile.png",
        "photoProf": "amosse.png"
        },
        {
        "id": 2,
        "prof": "Mopolo Moke",
        "matiere": "Big Data et NoSql",
        "iconMatiere": "bigdata.png",
        "photoProf": "mopolo.png"
        },
        {
        "id": 3,
        "prof": "Michel Buffa",
        "matiere": "AngulaJS/Node.Js",
        "iconMatiere": "angular.png",
        "photoProf": "buffa.png"
        },
        {
        "id": 4,
        "prof": "Gregory Galli",
        "matiere": "Serveur d'application",
        "iconMatiere": "grails.png",
        "photoProf": "gregory.png"
        },
        {
        "id": 5,
        "prof": "Vahatriniaina",
        "matiere": "Oracle Avancée",
        "iconMatiere": "oracle.png",
        "photoProf": "naina.png"
        },
        {
        "id": 6,
        "prof": "Tovoniaina",
        "matiere": "Gestion d'entreprise",
        "iconMatiere": "gestion.png",
        "photoProf": "tovo.png"
        }];
    for(let i = 0; i < matiereArray.length; i++) {
        let matiereObject = matiereArray[i];
        let matiere = new Matieres();
        matiere.id = matiereObject.id;
        matiere.prof = matiereObject.prof;
        matiere.matiere = matiereObject.matiere;
        matiere.iconMatiere = matiereObject.iconMatiere;
        matiere.photoProf = matiereObject.photoProf;
        matiere.save();
    }
}

module.exports = {
    saveMatiere
};