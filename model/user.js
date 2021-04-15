let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let Schema = mongoose.Schema;

let UserSchema = Schema({
    id: Number,
    Nom: String,
    Identifiant: String,
    Password: String
});

UserSchema.plugin(aggregatePaginate);


// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', UserSchema);