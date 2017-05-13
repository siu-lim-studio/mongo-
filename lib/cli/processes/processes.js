var questions = require('../ihm/questions.js');
var tasks = require('./tasks.js');
var inquirer    = require('inquirer');

var chalk       = require('chalk');
var CLI         = require('clui');
var figlet      = require('figlet');
var _ = require('lodash');

var generator = require('../../index.js');

const log = console.log;


// Helpers
function AddTitle(title){
  console.log(
   chalk.yellow(
    figlet.textSync(title, { horizontalLayout: 'full' })
   )
  );
}

function clearScreen(){
  process.stdout.write('\033c');
  AddTitle('Mongo++');
}

function exitProcess(){
  process.exit();
}


/*
-----------------------------
 Redirections - GateWays
-----------------------------
*/

function mainMenu(){
  clearScreen();
  
  inquirer.prompt(questions.MainMenuPrompt)
          .then(function(answers){
             log("le choix est : " + answers["mainMenu"]);
             if(answers.mainMenu === 'm-1'){
                setProject_process();
             }
             else
              if(answers.mainMenu ==='m-2'){
                setTable_process();
              }
             else
              if(answers.mainMenu ==='m-3'){
                setField_process();
              }
             else
              if(answers.mainMenu ==='m-4'){
                generate_process();
              }
              else
              if(answers.mainMenu === 'm-exit'){
                exitProcess();
              }

          });
          
}

function setProject_process(){
 log("vous allez entrer les données de configuration de la base de données");
 inquirer.prompt(questions.getProjectPrompt)
         .then(function(answers){
            questions.preferences.name = answers.projectname;
            questions.preferences.bd.name = answers.bdname;
            questions.preferences.bd.host  = answers.bdhost || 'localhost';

            log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
         })
         .then(function(){
            mainMenu();
         });
}

function setTable_process(){
 clearScreen();
 log("vous devoir choisir : créer , mettre à jour , supprimer une table"); 
 
 inquirer.prompt(questions.TableMenuPrompt)
         .then(function(answers){
            if(answers.tablemenu === 't-1'){
                createTable_process();
             }
            else if(answers.tablemenu === 't-2'){
                updateTable_process();
             }
            else if(answers.tablemenu === 't-3'){
                deleteTable_process();
             }
            else if(answers.tablemenu === 't-exit'){
                mainMenu();
             }
         });

 
}

function createTable_process(){
 log("vous allez créer une table");
 inquirer.prompt(questions.getTablePrompt)
         .then(function(answers){
            var model = {};
            model.name = answers.tablename;
            model.fields = [];
            // creation
            questions.preferences.models.push(model);
            
            log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
            setTable_process();
         });  
}

function updateTable_process(){
 log("vous allez mettre à jour une table");
 var uTable = "";
 questions.getTableListPrompt[0].choices = _.map(questions.preferences.models,'name');
 inquirer.prompt(questions.getTableListPrompt)
         .then(function(answers){
            var model = {};

            uTable = answers.tablelist;
            inquirer.prompt(questions.getTablePrompt)
                   .then(function(answers){
            
            // mise à jour   
            var index =  _.findIndex(questions.preferences.models, function(o) { return o.name == uTable; });
            _.update(questions.preferences.models,'[' + index + '].name',function(){ return answers.tablename});
            
            log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
            setTable_process();
           });            
         });
}

function deleteTable_process(){
 log("vous allez supprimer une table");
 questions.getTableListPrompt[0].choices = _.map(questions.preferences.models,'name');
 inquirer.prompt(questions.getTableListPrompt)
         .then(function(answers){ 
            // suppression
            _.pullAllWith(questions.preferences.models, [{ name: answers.tablelist}], _.isEqual);
            log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
            setTable_process();
         });  
}

function setField_process(){
 log("vous devoir choisir : créer , mettre à jour , supprimer un champ d'une table");
 var uTable = "";
 questions.getTableListPrompt[0].choices = _.map(questions.preferences.models,'name');
 inquirer.prompt(questions.getTableListPrompt)
         .then(function(answers){
            uTable = answers.tablelist;
            log(uTable);
            setFieldActions(uTable);
         });
}

function setFieldActions(forTable){
  var uTable = forTable;
  clearScreen();
  inquirer.prompt(questions.FieldMenuPrompt)
          .then(function(answers){
             if(answers.fieldmenu === 'f-1'){
               createField_process(uTable);
             }
             else if(answers.fieldmenu === 'f-2'){
               updateField_process(uTable);
             }
             else if(answers.fieldmenu === 'f-3'){
               deleteField_process(uTable);
             }
             else if(answers.fieldmenu === 'f-exit'){
               mainMenu();
             }
          });
}

function createField_process(forTable){
 log("vous créer un champ de la table" + forTable);
 var uTable = forTable;
 inquirer.prompt(questions.getFieldPrompt)
         .then(function(answers){
             var index =  _.findIndex(questions.preferences.models, function(o) { return o.name == uTable; });
             var field = {};

             field.name = answers.fieldname;
             var relation = answers.fieldtype;
             var reference = '';
             if(answers.fieldtype === 'haveOne' || answers.fieldtype === 'haveMany'){
               
               inquirer.prompt(questions.getTableListPrompt)
                       .then(function(answers){
                          reference = answers.tablelist;
                          field.type = {'name' : relation  , value : reference};
                          questions.preferences.models[index].fields.push(field);
                          log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
                          setFieldActions(forTable);
                       });
              
             }else
             {
              field.type = {'name' : 'default' , value : answers.fieldtype};
              questions.preferences.models[index].fields.push(field);
              log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
              setFieldActions(forTable);
             }
         });
}

function updateField_process(forTable){
 log("vous mettre à jour un champ de la table " + forTable); 
 var index =  _.findIndex(questions.preferences.models, function(o) { return o.name == forTable; });
 questions.getFieldListPrompt[0].choices = _.map(questions.preferences.models[index].fields,'name');
 inquirer.prompt(questions.getFieldListPrompt)
         .then(function(answers){
            var uField = answers.fieldlist;
            log(uField);
            updateFieldAction(forTable ,uField , index);
         });
}

function updateFieldAction(forTable , forfield , tableIndex){
 var uField = forfield;
 var index =  _.findIndex(questions.preferences.models[tableIndex].fields, 
             function(o) { return o.name == forfield; });
 inquirer.prompt(questions.getFieldPrompt)
         .then(function(answers){
           questions.preferences.models[tableIndex]
                                .fields[index].name = answers.fieldname;
           var relation = answers.fieldtype;
             var reference = '';
             if(answers.fieldtype === 'haveOne' || answers.fieldtype === 'haveMany'){
               
               inquirer.prompt(questions.getTableListPrompt)
                       .then(function(answers){
                          reference = answers.tablelist;
                          questions.preferences.models[tableIndex]
                                .fields[index].type = {'name' : relation  , value : reference};
                          
                          log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
                          setFieldActions(forTable);
                       });
              
             }else
             {
              questions.preferences.models[tableIndex]
                                .fields[index].type = {'name' : 'default' , value : answers.fieldtype};
              
              log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
              setFieldActions(forTable);
             }                     
         });
}

function deleteField_process(forTable){
 log("vous supprimer un champ de la  table " + forTable); 
 var index =  _.findIndex(questions.preferences.models, function(o) { return o.name == forTable; });
 questions.getFieldListPrompt[0].choices = _.map(questions.preferences.models[index].fields,'name');
 log("les preferences : " + JSON.stringify(questions.preferences.models[index].fields, null , '  '));
 inquirer.prompt(questions.getFieldListPrompt)
         .then(function(answers){ 
            // suppression
            var findex =  _.findIndex(questions.preferences.models[index].fields, 
                         function(o) { return o.name == answers.fieldlist; });
            _.pullAt(questions.preferences.models[index].fields, findex);
            log("les preferences : " + JSON.stringify(questions.preferences, null , '  '));
            setFieldActions(forTable);
         });  

}

function generate_process(){
 log("vous allez générer votre projet"); 
 generator.say("projet généré !!!!!!!!",questions.preferences);
}

exports.mainMenu = mainMenu;