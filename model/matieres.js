let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    prof: String,
    matiere: String,
    iconMatiere: String,
    photoProf: String
});

MatiereSchema.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matieres', MatiereSchema);