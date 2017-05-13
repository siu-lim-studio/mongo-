
var _ = require('lodash');

var preferences = {};
preferences.bd = {};
preferences.models = [];

var MainMenuPrompt = [{
  type: 'list',
  name: 'mainMenu',
  message: 'Que voulez vous faire ?',
  choices: [
            {value : 'm-1' , name : 'Créer un nouveau projet de base de données'},
            {value : 'm-2' , name : 'Créer , mettre à jour ou supprimer une table'},  
            {value : 'm-3' , name : 'Créer , mettre à jour ou supprimer un champ'},  
            {value : 'm-4' , name : 'Générer'}, 
            {value : 'm-exit' , name : 'Exit'} 
           ]
}];

var getProjectPrompt = [
  {
  	type : 'input',
  	name : 'projectname',
  	message: 'Saisissez le nom du projet ?'
  },
  {
    type : 'input',
    name : 'bdname',
    message: 'Saisissez le nom de la base de données ?'
  },
  {
    type : 'input',
    name : 'hostname',
    message: 'Saisissez le nom de l\'hôte ?',
    default : 'localhost'
  }
];

var TableMenuPrompt = [
  {
    type : 'list',
    name : 'tablemenu',
    message : 'Que voulez-vous faire ?',
    choices : [
        {value : 't-1' , name : 'Créer une nouvelle table'},
        {value : 't-2' , name : 'Mettre à jour une table'},
        {value : 't-3' , name : 'Supprimer une table'},
        {value : 't-exit' , name : 'retourner au menu principal'}
    ]
  }
];

var FieldMenuPrompt = [
  {
    type : 'list',
    name : 'fieldmenu',
    message : 'Que voulez-vous faire ?',
    choices : [
        {value : 'f-1' , name : 'Créer un champ'},
        {value : 'f-2' , name : 'Mettre à jour un champ'},
        {value : 'f-3' , name : 'Supprimer un champ'},
        {value : 'f-exit' , name : 'retourner au menu principal'}
    ]
  }
];

var getTableListPrompt = [
  {
    type : 'list',
    name : 'tablelist',
    message : 'Choisissez une table'
  }
];

var getFieldListPrompt = [
  {
    type : 'list',
    name : 'fieldlist',
    message : 'Choisissez un champ'
  }
];

var getTablePrompt = [
  {
  	type : 'input',
  	name : 'tablename',
  	message: 'Saisissez le nom de la table ?'
  }
];

var getFieldPrompt = [
  {
    type : 'input',
    name : 'fieldname',
    message: 'Saisissez le nom du champ ?'
  },
  {
    type : 'list',
    name : 'fieldtype',
    message: 'Choisissez le type du champ ?',
    choices : ['String' , 'Number' , 'Date' , 'haveOne' , 'haveMany']
  }
];

module.exports = {
  MainMenuPrompt : MainMenuPrompt,
  getProjectPrompt : getProjectPrompt,
  TableMenuPrompt : TableMenuPrompt,
  getTableListPrompt : getTableListPrompt,
  getTablePrompt : getTablePrompt,
  FieldMenuPrompt : FieldMenuPrompt,
  getFieldPrompt :getFieldPrompt,
  getFieldListPrompt : getFieldListPrompt,
  preferences : preferences
}