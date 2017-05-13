'use strict'

var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;

var host = '<% this.bdData.host %>' ;
var dbName = '<% this.bdData.dbName %>';

var connectionString = 'mongodb://' + localhost + '/' + dbName;

mongoose.connect(connectionString,function(err){
    if(err){
        throw err;
    }
}); // connect to our database

var db = {};
<% for(var index in this.bdData.models){%>
var <% this.bdData.models[index].name %> = require('<% this.bdData.models[index].path %>');
<%}%>
db.mongoose = mongoose;
db.models = {};
<% for(var index in this.bdData.models){%>
db.models.<% this.bdData.models[index].name %> = <% this.bdData.models[index].name %>;
<%}%>
module.exports = db;