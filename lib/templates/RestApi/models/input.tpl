/**
 * The module define <% this.name %> Schema and exports the model
 * @module       : <% this.name %>Model
 * @author       : Jean luc deshayes
 *  
 *
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var <% this.name %>Schema   = new Schema({
    <% for(var index in this.fields){%>
     <% this.fields[index].name %> : 
       {
        <% if(this.fields[index].type.name === 'haveOne'){%>
          type  : { type : Schema.ObjectId , ref : '<% this.fields[index].type.value %>'}
        <%}%>
        <% if(this.fields[index].type.name === 'haveMany'){%>
          type  : [{ type : Schema.ObjectId , ref : '<% this.fields[index].type.value %>'}]
        <%}%>
        <% if(this.fields[index].type.name === 'default'){%>
          type  : <% this.fields[index].type.value %>
        <%}%>
       },
    <%}%>
});

module.exports = mongoose.model('<% this.name %>', <% this.name %>Schema);