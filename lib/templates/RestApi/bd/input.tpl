'use strict'
/**
 * This module can allow you to configure the mongodb connection
 * it exports a global objects with models defined in models directory
 * @module       : bd
 * @author       : Jean luc deshayes
 *  
 *
 */
var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;

var host = '<% this.bd.host %>' ;
var dbName = '<% this.bd.name %>';

var connectionString = 'mongodb://' + host + '/' + dbName;

mongoose.connect(connectionString,function(err){
    if(err){
        throw err;
    }
}); // connect to our database

var db = {};
<% for(var index in this.models){%>
var <% this.models[index].name %> = require('../models/<% this.models[index].name %>Model');
<%}%>
db.mongoose = mongoose;
db.models = {};
<% for(var index in this.models){%>
db.models.<% this.models[index].name %> = <% this.models[index].name %>;
<%}%>
module.exports = db;