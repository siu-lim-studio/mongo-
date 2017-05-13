var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var <% this.name %>Schema   = new Schema({
    <% for(var index in this.fields){%>
     <% this.fields[index].name %> : 
       {
        type  : <% this.fields[index].type %>
       }
    <%}%>
});

module.exports = mongoose.model('<% this.name %>', <% this.name %>Schema);