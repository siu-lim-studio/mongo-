'use strict'

module.exports = (router,db) => {

var <% this.name %>Controller = require('../../controllers/<% this.name %>Controller.js');

// more routes for our API will happen here

// on routes that end in /<% this.name %>s
// ----------------------------------------------------
router.route('/<% this.name %>s')

    // create a <% this.name %> (accessed at POST http://localhost:8080/api/<% this.name %>s)
    .post(
        function(req,res){
         <% this.name %>Controller.<% this.name %>_Create(db,req,res);	
        })

    // get all the <% this.name %>s (accessed at GET http://localhost:8080/api/<% this.name %>s)
    .get(function(req,res){
    	<% this.name %>Controller.<% this.name %>_List(db,req,res);
    });

// on routes that end in /<% this.name %>s/:<% this.name %>_id
// ----------------------------------------------------
router.route('/<% this.name %>s/:<% this.name %>_id')

    // get the <% this.name %> with that id (accessed at GET http://localhost:8080/api/<% this.name %>s/:<% this.name %>_id)
    .get(function(req,res){
    	<% this.name %>Controller.<% this.name %>_Details(db,req,res)
    })

    // update the <% this.name %> with this id (accessed at PUT http://localhost:8080/api/<% this.name %>s/:<% this.name %>_id)
    .put(function(req,res){
    	<% this.name %>Controller.<% this.name %>_Update(db,req,res);
     })

    // delete the <% this.name %> with this id (accessed at DELETE http://localhost:8080/api/<% this.name %>s/:<% this.name %>_id)
    .delete(function(req,res){
    	<% this.name %>Controller.<% this.name %>_Delete(db,req,res)
    });
}