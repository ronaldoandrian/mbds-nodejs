// Assignment est le "modèle mongoose", il est connecté à la base de données
let Assignment = require("../model/assignment");
let User = require("../model/user");
let Matiere = require("../model/matieres");

/* Version sans pagination */
// Récupérer tous les assignments (GET)
/*
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}
*/

// Récupérer tous les assignments (GET), AVEC PAGINATION
function getAssignments(req, res) {
  let aggregateOptions = [];
   try {
     if(req.query.rendu) {
       if(req.query.rendu === 'true') aggregateOptions.push({$rendu: true});
       else if(req.query.rendu === 'false') aggregateOptions.push({$rendu: false});
     }
     var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        else {
          let assigmentsArray = [];
          for(let i = 0; i < assignments.docs.length; i++) {
            let assignment = assignments.docs[i];
            User.findOne({id: assignment.etudiantId}, (err2, etudiant) => {
              if(err2) {
                console.log(err2);
              }
              else {
                assignment.etudiant = etudiant;
                Matiere.findOne({id: assignment.matiereId}, (err3, matiere) => {
                    if(err3) {
                      console.log(err3);
                    }
                    else {
                      assignment.matiere = matiere;
                      assigmentsArray.push(assignment);
                      if(i >= assignments.docs.length - 1) {
                        assignments.docs = assigmentsArray;
                        res.send(assignments);
                      }
                    }
                });
              }
            });
          }
        }
      }
    );
   }
   catch(err) {
      res.send(err);
   }
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;

  Assignment.findOne({ id: assignmentId }, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    else {
      User.findOne({id: assignment.etudiantId}, (err2, etudiant) => {
          if(err2) {
            res.json(assignment);
          }
          else {
            assignment.etudiant = etudiant;
            Matiere.findOne({id: assignment.matiereId}, (err3, matiere) => {
                if(err3) {
                  res.json(assignment);
                }
                else {
                  assignment.matiere = matiere;
                  res.json(assignment);
                }
            });
          }
      });
    }
  });
}

function generateData(req, res) {
  for(let i = 1; i <= 10000; i++) {
    let assignment = new Assignment();
    assignment.id = i;
    assignment.nom = "TP MBDS - " + i;
    assignment.dateDeRendu = randomDate();
    let rendu = randomBoolean();
    assignment.rendu = rendu;
    if(rendu === true) {
      assignment.note = randomNote();
    }
    assignment.etudiantId = randomId(3, 150);
    assignment.matiereId = randomId(1, 6);
    assignment.save();

    console.log("GENERE ===> " + assignment.nom);
  }
  res.send("FINI");
}

function randomId(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomBoolean() {
  let randNumber = Math.floor(Math.random() * 100);
  return randNumber % 2 === 0;
}

function randomNote() {
  return Math.floor(Math.random() * 19) + 1;
}

function randomDate() {
  let year = 2021;
  let month = Math.floor(Math.random() * 11) + 1;
  let day = Math.floor(Math.random() * 27) + 1;
  return formatDate(year, month, day);
}

function formatDate(year, month, day) {
    if((month + "").length === 1) {
      month = "0" + month;
    }
    if((day + "").length === 1) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;

  console.log("POST assignment reçu :");
  console.log(assignment);

  assignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${assignment.nom} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);
  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  generateData
};
