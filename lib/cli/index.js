var processes = require('./processes/processes.js');
const log = console.log;


var main = function(){
  log("Vous allez créer un projet de démonstration node js");
  processes.mainMenu();
}

exports.main = main;