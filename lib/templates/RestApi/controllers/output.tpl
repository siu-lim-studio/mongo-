'use strict'


exports.<% this.name %>_List = function(db,req,res){
  db.models.<% this.name %>.find(function(err, _<% this.name %>s) {
    if (err)
     res.send(err);
    res.json(_<% this.name %>s);
  });
}

exports.<% this.name %>_Details = function(db,req,res){
  db.models.<% this.name %>.findById(req.params.<% this.name %>_id, function(err, _<% this.name %>) {
    if (err)
      res.send(err);
    res.json(_<% this.name %>);
  });
}

exports.<% this.name %>_Create = function(db,req,res){
 var _<% this.name %> = new db.models.<% this.name %>();      // create a new instance of the <% this.name %> model
  _<% this.name %>.name = req.body.name;  // set the <% this.name %> name (comes from the request)
  // save the <% this.name %> and check for errors
  _<% this.name %>.save(function(err) {
   if(err)
    res.send(err);
    res.json({ message: '<% this.name %> created!' });
   });	
}

exports.<% this.name %>_Update = function(db,req,res){
 // use our <% this.name %> model to find the <% this.name %> we want
  db.models.<% this.name %>.findById(req.params.<% this.name %>_id, function(err, _<% this.name %>) {
    if (err)
      res.send(err);
      _<% this.name %>.name = req.body.name;  // update the <% this.name %> info
      // save the <% this.name %>
      _<% this.name %>.save(function(err) {
        if (err)
          res.send(err);
          res.json({ message: '<% this.name %> updated!' });
      });
  });
}

exports.<% this.name %>_Delete = function(db,req,res){
  db.models.<% this.name %>.remove({
    _id: req.params.<% this.name %>_id
    }, function(err, _<% this.name %>) {
        if (err)
          res.send(err);

          res.json({ message: 'Successfully deleted' });
    });
}