'use strict'
/**
 * The module define and exports all basics CRUD needed
 * @module       : <% this.name %>Controller
 * @author       : Jean luc deshayes
 *  
 *
 */

/**
 * Find all <% this.name %> Items
 * @return   : Json object
 */
exports.<% this.name %>_List = function(db,req,res){
  db.models.<% this.name %>.find(function(err, _<% this.name %>s) {
    if (err)
     res.send(err);
    res.json(_<% this.name %>s);
  });
}

/**
 * Find  <% this.name %> Item by ID
 * @return   : Json object
 */
exports.<% this.name %>_Details = function(db,req,res){
  db.models.<% this.name %>.findById(req.params.<% this.name %>_id, function(err, _<% this.name %>) {
    if (err)
      res.send(err);
    res.json(_<% this.name %>);
  });
}

/**
 * create  <% this.name %> Item 
 * @return   : Json object
 */
exports.<% this.name %>_Create = function(db,req,res){
 var _<% this.name %> = new db.models.<% this.name %>();      // create a new instance of the <% this.name %> model
 <% for(var index in this.fields){%>
        <% if(this.fields[index].type.name === 'haveOne'){%>
          _<% this.name %>.<%this.fields[index].name%> = req.body.<% this.fields[index].type.value %>Id;
        <%}%>
        <% if(this.fields[index].type.name === 'haveMany'){%>
          _<% this.name %>.<%this.fields[index].name%> = [];
        <%}%>
        <% if(this.fields[index].type.name === 'default'){%>
          _<% this.name %>.<%this.fields[index].name%> = req.body.<%this.fields[index].name%>; // set the <% this.name %> <%this.fields[index].name%> (comes from the request)
        <%}%>
 <%}%>
  // save the <% this.name %> and check for errors
  _<% this.name %>.save(function(err, <% this.name %>) {
   if(err)
    res.send(err , <% this.name %>);
    res.json({ message: '<% this.name %> created!' , <% this.name %> });
   });	
}

/**
 * Update  <% this.name %> Item by ID
 * @return   : Json object
 */
exports.<% this.name %>_Update = function(db,req,res){
 // use our <% this.name %> model to find the <% this.name %> we want
  db.models.<% this.name %>.findById(req.params.<% this.name %>_id, function(err, _<% this.name %>) {
    if (err)
      res.send(err);
      <% for(var index in this.fields){%>
        <% if(this.fields[index].type.name === 'default'){%>
          _<% this.name %>.<%this.fields[index].name%> = req.body.<%this.fields[index].name%>; // set the <% this.name %> <%this.fields[index].name%> (comes from the request)
        <%}%>
      <%}%>
      // save the <% this.name %>
      _<% this.name %>.save(function(err , <% this.name %>) {
        if (err)
          res.send(err);
          res.json({ message: '<% this.name %> updated!' , <% this.name %> });
      });
  });
}
/**
 * Delete  <% this.name %> Item by ID
 * @return   : Json object
 */
exports.<% this.name %>_Delete = function(db,req,res){
  db.models.<% this.name %>.remove({
    _id: req.params.<% this.name %>_id
    }, function(err, result) {
        if (err)
          res.send(err);

          res.json({ message: 'Successfully deleted' , result });
    });
}