// ./lib/index.js
var fs = require("fs");
var jetpack = require("fs-jetpack");
var user_home = require('user-home');
var Composer = require("./composer.js");


var global_path = user_home + "/AppData/Roaming/npm/node_modules/mongoplus"
/**
 * Displays a string in the console
 * 
 * @param {string_to_say} String string to show in the console
 */
var config = {
    bd :   {
	     root:".",
	     pathToTemplate: global_path + "/lib/templates/RestApi/bd",
	     inputTemplateFile:"",
	     outputTemplateFile:"",
	     outputFile: global_path + "/lib/templates/RestApi/bd/out",
	     templateExtension:""
	    },

    controllers :   {
       root:".",
       pathToTemplate: global_path + "/lib/templates/RestApi/controllers",
       inputTemplateFile:"",
       outputTemplateFile:"",
       outputFile: global_path + "/lib/templates/RestApi/controllers/out",
       templateExtension:""
      },

    models :   {
       root:".",
       pathToTemplate: global_path + "/lib/templates/RestApi/models",
       inputTemplateFile:"",
       outputTemplateFile:"",
       outputFile: global_path + "/lib/templates/RestApi/models/out",
       templateExtension:""
      },

    routerIndex :   {
       root:".",
       pathToTemplate: global_path + "/lib/templates/RestApi/router/index",
       inputTemplateFile:"",
       outputTemplateFile:"",
       outputFile: global_path + "/lib/templates/RestApi/router/index/out",
       templateExtension:""
      },

    routerRoutes :   {
       root:".",
       pathToTemplate: global_path + "/lib/templates/RestApi/router/routes",
       inputTemplateFile:"",
       outputTemplateFile:"",
       outputFile: global_path + "/lib/templates/RestApi/router/routes/out",
       templateExtension:""
      },

    tests : {
       root:".",
       pathToTemplate: global_path + "/lib/templates/RestApi/tests",
       inputTemplateFile:"",
       outputTemplateFile:"",
       outputFile: global_path + "/lib/templates/RestApi/tests/out",
       templateExtension:""
    }

    
};


var RestApiConfig = {
    project : "newRestApiProject",
    bd : {
       pathToTemplate : config.bd.pathToTemplate || ".",
       inputTemplate : config.bd.inputTemplateFile || "input.tpl",
       outputTemplate : config.bd.outputTemplateFile || "output.tpl",
       templateExtension : config.bd.templateExtension || ".tpl",
       output : config.bd.outputFile || "test.html",
       pathToGenerated : "/app/config/"
    },
    controllers : {
       pathToTemplate : config.controllers.pathToTemplate || ".",
       inputTemplate : config.controllers.inputTemplateFile || "input.tpl",
       outputTemplate : config.controllers.outputTemplateFile || "output.tpl",
       templateExtension : config.controllers.templateExtension || ".tpl",
       output : config.controllers.outputFile || "test.html",
       pathToGenerated : "/app/controllers/"
    },
    models : {
       pathToTemplate : config.models.pathToTemplate || ".",
       inputTemplate : config.models.inputTemplateFile || "input.tpl",
       outputTemplate : config.models.outputTemplateFile || "output.tpl",
       templateExtension : config.models.templateExtension || ".tpl",
       output : config.models.outputFile || "test.html",
       pathToGenerated : "/app/models/"
    },
    routerIndex : {
       pathToTemplate : config.routerIndex.pathToTemplate || ".",
       inputTemplate : config.routerIndex.inputTemplateFile || "input.tpl",
       outputTemplate : config.routerIndex.outputTemplateFile || "output.tpl",
       templateExtension : config.routerIndex.templateExtension || ".tpl",
       output : config.routerIndex.outputFile || "test.html",
       pathToGenerated : "/app/router/"
    },
    routerRoutes : {
       pathToTemplate : config.routerRoutes.pathToTemplate || ".",
       inputTemplate : config.routerRoutes.inputTemplateFile || "input.tpl",
       outputTemplate : config.routerRoutes.outputTemplateFile || "output.tpl",
       templateExtension : config.routerRoutes.templateExtension || ".tpl",
       output : config.routerRoutes.outputFile || "test.html",
       pathToGenerated : "/app/router/routes/"
    },
    tests : {
       pathToTemplate : config.tests.pathToTemplate || ".",
       inputTemplate : config.tests.inputTemplateFile || "input.tpl",
       outputTemplate : config.tests.outputTemplateFile || "output.tpl",
       templateExtension : config.tests.templateExtension || ".tpl",
       output : config.tests.outputFile || "test.html",
       pathToGenerated : "/tests/"
    }
};

// clone project structure to the current directory
function cloneProjectStructure(structure , dest){
  console.log(global_path);
  jetpack.copy(global_path + '/lib/project-structure/RestApi/',"./" + dest,{overwrite : true});
}

// copy files to a specific directory
function copyFileToProject(src,dest){
  console.log("*********** : " + dest);
  jetpack.copy(src, dest , {overwrite : true});	
}
/*
options = {
    bd : {
        host : "localhost",
        dbName : "MeanTest",
        models : [
         {
          name : "Bear",
          path : "../models/BearModel"
         }
        ]
    },
    models : [
        {
          name : 'Bear',
          path : '../models/BearModel',
          fields : [
            {
                name : 'name',
                type  : 'String'
            }
          ]
        }
    ]
};
*/
function build_bd(options){
  Composer.setConfig({
      pathToTemplate : RestApiConfig.bd.pathToTemplate,
      outputFile : RestApiConfig.bd.output
    });
  Composer.build(
    RestApiConfig.bd.pathToTemplate + "/" + RestApiConfig.bd.inputTemplate,
    RestApiConfig.bd.output + '/' + "db.js",options);
  
  var dest = "./" + options.name + RestApiConfig.bd.pathToGenerated ;
  copyFileToProject(RestApiConfig.bd.output,dest);
                   
} 

function build_models(options){
  Composer.setConfig({
      pathToTemplate : RestApiConfig.models.pathToTemplate,
      outputFile : RestApiConfig.models.output
    });
 for(index in options.models){
  Composer.build(
    RestApiConfig.models.pathToTemplate + "/" + RestApiConfig.models.inputTemplate,
    RestApiConfig.models.output + '/' + options.models[index].name + "Model.js",options.models[index]);
  
  var dest = "./" + options.name + RestApiConfig.models.pathToGenerated ;
          
  copyFileToProject(RestApiConfig.models.output,dest);
  
 }
}

function build_controllers(options){
 Composer.setConfig({
      pathToTemplate : RestApiConfig.controllers.pathToTemplate,
      outputFile : RestApiConfig.controllers.output
    });
 for(index in options.models){
  Composer.build(
    RestApiConfig.controllers.pathToTemplate + "/" + RestApiConfig.controllers.inputTemplate,
    RestApiConfig.controllers.output + '/' +  options.models[index].name  + "Controller.js",options.models[index]);
    
    var dest = "./" + options.name + RestApiConfig.controllers.pathToGenerated ;
              
    copyFileToProject(RestApiConfig.controllers.output,dest);
 }
}

function build_routerIndex(options){
 Composer.setConfig({
      pathToTemplate : RestApiConfig.routerIndex.pathToTemplate,
      outputFile : RestApiConfig.routerIndex.output
    });
for(index in options.models){
  Composer.build(
    RestApiConfig.routerIndex.pathToTemplate + "/" + RestApiConfig.routerIndex.inputTemplate,
    RestApiConfig.routerIndex.output + '/' +  "index.js",options.models);

  var dest = "./" + options.name + RestApiConfig.routerIndex.pathToGenerated ;              
  copyFileToProject(RestApiConfig.routerIndex.output,dest);
}
}

function build_tests(options){
 Composer.setConfig({
      pathToTemplate : RestApiConfig.tests.pathToTemplate,
      outputFile : RestApiConfig.tests.output
    });
for(index in options.models){
  Composer.build(
    RestApiConfig.tests.pathToTemplate + "/" + RestApiConfig.tests.inputTemplate,
    RestApiConfig.tests.output + '/' +  options.models[index].name + ".js",options.models[index]);

  var dest = "./" + options.name + RestApiConfig.tests.pathToGenerated ;              
  copyFileToProject(RestApiConfig.tests.output,dest);
}
}


function build_routerRoutes(options){
  Composer.setConfig({
      pathToTemplate : RestApiConfig.routerRoutes.pathToTemplate,
      outputFile : RestApiConfig.routerRoutes.output
    });
 for(index in options.models){
  Composer.build(
    RestApiConfig.routerRoutes.pathToTemplate + "/" + RestApiConfig.routerRoutes.inputTemplate,
    RestApiConfig.routerRoutes.output + '/'   + options.models[index].name + ".js",options.models[index]);

  var dest = "./" + options.name + RestApiConfig.routerRoutes.pathToGenerated ;              
  copyFileToProject(RestApiConfig.routerRoutes.output,dest);
  }
}


var say = function(string_to_say , options) {
	cloneProjectStructure('RestApi',options.name);
	build_bd(options);
  build_models(options);
  build_controllers(options);
  build_routerIndex(options);
  build_routerRoutes(options);
  build_tests(options);
  return console.log(string_to_say);
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.say = say;